# App Orchestration
Interfaces for services that can deploy and orchestrate apps.

# Table of Contents

1. [Transfer Technology](#transfer-technology)
2. [Transfer Technology - Files API](#transfer-technology---files-api)
3. [Transfer Technology - Templates](#transfer-technology---templates)
4. [App Instance](#app-instance)
5. [App Template](#app-template)
6. [App ID](#app-id)
7. [App Config](#app-config)
8. [Transfer Technology - Container System Module](#transfer-technology---container-system-module)
9. [Transfer App v2.2.2-inst-dev](#transfer-app-v222-inst-dev)
10. [App Pool](#app-pool)
11. [App Pool - Store Side](#app-pool---store-side)
12. [App Pool - Transfer Side](#app-pool---transfer-side)

# Transfer Technology

## Main Transfer API
These endpoints are specific to the transfer app that is build around Docker-Compose.

### POST /transfer/import
Import an app instance or template as ZIP archive. The Websocket endpoint **/events/transfer/import** should be preferred as it provides incremental feedback for this import process that may take a while.

Request headers:
- Content-Type: multipart/form-data

Request body:
- form entry with name "app" and content type "application/zip" as binary data

Response codes:
- 200 OK: app successfully imported
- 400 Bad Request: import failed

Example:
```
POST /api/1/transfer/import
Content-Type: multipart/form-data; boundary=--------------------------854348040641744448699751
Content-Length: 25828282
 
----------------------------854348040641744448699751
Content-Disposition: form-data; name="app"; filename="BashMessagePrinter.zip"
<BashMessagePrinter.zip>
----------------------------854348040641744448699751--
```

### GET /transfer/export/{id}?{query}
Export a specific app instance or template as ZIP archive.

Route parameters:
- id: app id

Query parameters:
- with_images: boolean, optional, default: false
    - Whether docker images should be included

Response codes:
- 200 OK: app found
- 400 Bad Request: app id not given
- 404 Not found: app not found

Response headers:
- Content-Type: application/zip

Response body:
- ZIP archive

Example:
```
GET /api/1/transfer/export/ScaleIT%20node-red%3A2.2.2?with_images=true
```

### GET /transfer/apps
Retrieve the list of currently available app instances on the server.

Response codes:
- 200 OK: apps are available
- 204 No Content: there is currently no imported app

Response headers:
- Content-Type: application/json

Response body:
- AppInstance[]

Example:
```
GET /api/1/transfer/apps
```

### GET /transfer/apps/{id}
Get the information details of a single app instance.

Route parameters:
- id: app instance id

Response codes:
- 200 OK: app instance found
- 400 Bad Request: app id not given
- 404 Not Found: app instance not found

Response headers:
- Content-Type: application/json

Response body:
- AppInstance

Example:
```
GET /api/1/transfer/apps/simple%20webserver%3A1.0.0-dbg
```

### GET /transfer/apps/{id}/icon
Download the app's icon if available.

Route parameters:
- id: app instance id

Response codes:
- 200 OK: app and icon found
- 204 No Content: no icon available
- 400 Bad Request: id invalid
- 404 Not Found: app not found

Response headers:
- Content-Type: application/svg+xml
    - image/png
    - image/jpeg

Response body:
- icon file

Example:
```
GET /api/1/transfer/apps/simple%20webserver%3A1.0.0-dbg/icon
```

### GET /transfer/apps/{id}/readme
Download the app's readme if available.

Route parameters:
- id: app instance id

Response codes:
- 200 OK: app and readme found
- 204 No Content: no readme available
- 400 Bad Request: id invalid
- 404 Not Found: app not found

Request headers:
- Accept: application/json
    - text/plain

Response headers:
- Content-Type: application/json
    - text/plain

Response body:
- readme file

Example:
```
GET /api/1/transfer/apps/simple%20webserver%3A1.0.0-dbg/readme
```

### DELETE /transfer/apps/{id}?{query}
Delete an app instance and if forced and necessary stop it before.

Route parameters:
- id: app instance id

Query parameters:
- force: boolean, optional, default: false
    - If app runs then it is stopped so the removal succeeds
- remove_images: boolean, optional, default: true
    - Remove referenced docker images if not referenced by other apps
- remove_volumes: boolean, optional, default: false
    - Remove used docker volumes

Response codes:
- 200 OK: app instance successfully removed
- 400 Bad Request: app id invalid, app is busy
- 404 Not Found: app instance not found
- 409 Conflict
    - app instance still runs and force=false
    - image still needed if remove_images=true

Example:
```
DELETE /api/1/transfer/apps/simple%20webserver%3A1.0.0-dbg?force=true&remove_images=false
```

### PUT /transfer/apps/{id}/start
Start an app instance. As this process may take some time, it is recommended to use the Websocket **/events/transfer/apps/{id}/start** endpoint instead.

Route parameters:
- id: app instance id

Response codes:
- 200 OK: App instance found
- 400 Bad Request:
    - app id not given
    - app is busy
    - no valid license
- 404 Not Found: app instance not found

Response headers:
- Content-Type: application/json

Response body:
- DockerComposeUpResult

Example:
```
PUT /api/1/transfer/apps/simple%20webserver%3A1.0.0-dbg/start
```

### PUT /transfer/apps/{id}/stop?{query}
Stop an app instance and if requested remove volumes.

Route parameters:
- id: app instance id

Query parameters:
- remove_images: boolean, optional, default: false
    - Remove referenced container images
- remove_volumes: boolean, optional, default: false
    - Remove used docker volumes

Response codes:
- 200 OK: app instance found
- 400 Bad Request
    - app id not given
    - app is busy
- 404 Not Found: app instance not found
- 409 Conflict:
    - app image still needed if remove_images=true

Response headers:
- Content-Type: application/json

Response body:
- ProcessResult

Example:
```
PUT /api/1/transfer/apps/ScaleIT%20node-red%3A2.2.2/stop?remove_volumes=true
```

### GET /transfer/apps/{id}/logs?{query}
Retrieve the logs of a running app.

Route parameters:
- id: app instance id

Query parameters:
- lines: number, optional, default: -1
    - returns at most the given number of recent lines
    - if lines=-1 then all available log lines are returned

Response codes:
- 200 OK: app instance found
- 400 Bad Request: if lines==0 or lines&lt;-1 or app id not given
- 404 Not Found: app instance not found

Response headers:
- Content-Type: application/json

Response body:
- ProcessResult

Example:
```
GET /api/1/transfer/apps/simple%20webserver%3A1.0.0-dbg/logs?lines=30
```

### PUT /transfer/refresh/apps
Refreshes the status information of all apps, whereby the status updates are sent asynchronously via SSE and the operation is only done if there is no refresh scheduled already.

Response codes:
- 202 Accepted: refresh will be performed
- 409 Conflict: transfer app is already busy refreshing

Example:
```
PUT /api/1/transfer/refresh/apps
```

### GET /transfer/refresh/apps
Returns if the transfer app is currently busy refreshing the status of all apps or not.

Response codes:
- 200 OK: always

Response headers:
- Content-Type: application/json

Response body:
- boolean

Example:
```
GET /api/1/transfer/refresh/apps
```

### PUT /transfer/apps/{id}/refresh
Refreshes an existing app, if it is not already scheduled.

Route parameters:
- id: app instance id

Response codes:
- 200 OK: app instance is scheduled to be refreshed
- 400 Bad Request: app instance is already being refreshed or app id invalid
- 404 Not Found: app instance not found

Response headers:
- Content-Type: application/json

Response body:
- AppInstance

Example:
```
PUT /api/1/transfer/apps/simple%20webserver%3A1.0.0-dbg/refresh
```

### GET /transfer/recognize/apps
Recognize all containerized projects that run on the system.

Response codes:
- 200 OK: at least one project recognized
- 204 No Content: no project recognized

Response headers:
- Content-Type: application/json

Response body:
- data from docker containers API

### Websockets /events/transfer/import
Imports an app as ZIP archive and provides incremental feedback.

Message protocol:
1. (Optional) Receive cancel token as NameValue&lt;string&gt;
    - Name: "CancelID"
    - Value: "{some_id}"
2. Send ZIP file length as NameValue&lt;number&gt;
    - Name: "Length"
    - Value: size of ZIP to send in bytes
3. Send ZIP archive as binary message
4. Receive step wise progress information
    - Each message has type TransferProgress
    - At the beginning there are many StepType: "DATA_TRANSFER" messages
    - After that the import pipeline specific steps are reported
    - If StepType: "STORE_INSTANCE" has "Success: true" then the import was successfull
    - Steps can be grouped with the "ANNOUNCEMENT" step type
        - Potentially announces a series of steps that follow immediately
        - The group is active until another "ANNOUNCEMENT" step occurs

### Websockets /events/transfer/apps/{id}/start
Starts an available app and provides incremental feedback.

Route parameters:
- id: app instance id

Message protocol:
1. (Optional) Receive cancel token as NameValue&lt;string&gt;
    - Name: "CancelID"
    - Value: "{some_id}"
2. Receive step wise progress information
    - Each message has type TransferProgress


### SSE /api/events
Uses this general interface and extends it with the following event channels:
- App
    - data: AppInstance
    - status of an app instance changed
- Import
    - data: AppInstance
    - an app was successfully imported
- Remove
    - data: AppInstance
    - an app was removed
- Refresh
    - data: boolean
    - app is currently busy refreshing all apps or has finished

Note: Older versions may use **/events**.

### PUT /api/cancel/{id}
Cancel the task identified by the given ID. Applies to all operations that return a cancel id.

Route parameters:
- id: string
    - Task / Operation Id

Response codes:
- 200 OK: operation found and canceled
- 400 Bad Request: no Id given
- 404 Not Found: operation for Id not found

## Transfer Technology - Files API
Some specifics about the implementation of the files api is described below. For more information see the Resource-Management category.

### GET /files?{}

Query parameters:
- category
    - "instances": serves file system for instances
    - "templates": serves file system for templates

Example:
```
GET /api/1/files?category=instances

[
    {
        "Name": "example app:1.0",
        "Id": "example%20app%3A1.0",
        "Deletable": false,
        "Extendable": false,
        "Accept": null
    },
    {
        "Name": "web server:1.0-php",
        "Id": "web%20server%3A1.0-php",
        "Deletable": false,
        "Extendable": false,
        "Accept": null
    }
]
```

### GET /files/{id}?{}

If ID refers to an instance or template id then the file system of the ZIP file will be served.

Example app instance ZIP:
- docker-compose.yml
- config.yml
- icon.svg
- README.md
- LICENSE.txt
- Manual.pdf
- Resources/
    - tutorial.mp4

The app has the id: "example%20app%3A1.0"
```
GET /api/1/files/example%20app%3A1.0

[
    {
        "Name": "docker-compose.yml",
        "Id": "example%20app%3A1.0%2F%2Fdocker-compose.yml",
        "Deletable": false,
        "Editable": false,
        "MIMEType": "text/plain"
    },
    ...
    {
        "Name": "Manual.pdf",
        "Id": "example%20app%3A1.0%2F%2Fmanual.pdf",
        "Deletable": false,
        "Editable": false,
        "MIMEType": "application/pdf"
    },
    {
        "Name": "Resources",
        "Id": "example%20app%3A1.0%2F%2FResources",
        "Deletable": false,
        "Extendable": false,
        "Accept": null,
        "Entries": [
            {
                "Name": "tutorial.mp4",
                "Id": "example%20app%3A1.0%2F%2FResources%2Ftutorial.mp4",
                "Deletable": false,
                "Editable": false,
                "MIMEType": "video/mp4"
            }
        ]
    }
]

GET /api/1/files/example%20app%3A1.0%2F%2FResources%2Ftutorial.mp4

Content-Type: video/mp4
<tutorial.mp4>
```

## Transfer Technology - Templates
These endpoints are specific to the templates version of the transfer app.

### GET /transfer/templates
TODO

### GET /transfer/templates/{id}
TODO

### DELETE /transfer/templates/{id}
TODO

### POST /transfer/templates/{id}/instantiate
Start the app instantiation process.

TODO

### SSE /transfer/templates/{id}/build
Execute the build process and finish it on success. Provides incremental feedback.

SSE channels:
- status
- progress
- failure

TODO

## App Instance

An app instance is represented as a ZIP archive with the following structure:
- config.yml
- compose.yaml
- icon.{svg|png|jpg}?
- README.md?
- docker/?
    - {image}.{tar|tgz|tar.gz}
- manual.pdf?
- LICENSE.txt?
- screenshots/?
    - {name}.{png|jpg}?
- licenses/?
    - {name}.lic + {name}.crt + {name}.pfx
- aas/?
    - *.json

Through the docker-compose.yml it is possible to orchestrate the app. Docker images need to be available when the app starts and may be retrievable on the server the Docker runs and thus they are optional. It must not contain a **build context**.

Uniqueness of an app is given by the following information:
- Manufacturer Id
- Product number
- Version

## App Template

The structure from *App Instance* is inherited with the following additions:
- docker-compose-build.yml

It should contain a build context so that **docker-compose build** can be run on the template in order to create an App Instance. The files required in the build context must be provided as well.

## App ID

For an instance of the Transfer App the uniqueness of an App Instance is guaranteed by the combination of **Name** and **Version**.

ID := {Name}:{Version}

For storage purposes the "{Name}:{Version}" string should be URL-encoded.

To also provide uniqueness for App Templates, the version identifier should be differ accordingly. This is up to the creators of the apps, e.g.:
```
simple webserver:1.0.0
simple webserver:1.0.0-tpl
```

## App Config

Consists of Name, Version and Description. Frontend and Middlelayer entries may be added to access the frontend or server components of the app.

Example for app components:
```
in config.yml:
Frontend:
 - Port: 54180
   Path: null
   Protocol: http
 - Port: 54280
   Path: "/cgi/ui"
Middlelayer:
 - Port: 54179
   Path: null
   Protocol: https

Access:
http://<server_url>:54180
http://<server_url>:54280/cgi/ui
https://<server_url>:54179
```

## Transfer Technology - Container System Module
The subsequent endpoints define the system module of the transfer app that serves administrative purposes around Docker and Docker Compose. Data models returned will mostly reflect those from the Docker API.

### GET /system/images
Retrieve the list of available container images.

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: at least one image found
- 204 No Content: no images available

### GET /system/images/{id}
Get detailed information about a container image.

Route parameters:
- id: string, required
    - Image ID

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: image found
- 404 Not Found: image not found

### POST /system/images
Upload a container image to the server to load it into the system.

Request headers:
- application/x-tar

Request body:
- container image as binary data

Response headers:
- Location: url to the image

Response codes:
- 201 Created: image successfully uploaded
- 400 Bad Request: given data invalid

### GET /system/images/{id}/export
Download the serialized container image.

Route parameters:
- id: string, required
    - Image ID

Response headers:
- Content-Type: application/x-tar

Response codes:
- 200 OK: image found
- 404 Not Found: image not found

### DELETE /system/images/{id}?{query}
Delete a container image from the system.

Route parameters:
- id: string, required
    - Image ID

Query parameters:
- force: boolean, optional, default=false
    - true to force removal

Response codes:
- 200 OK: image found
- 400 Bad Request: image could not be deleted probably because it is still in use
- 404 Not Found: image not found

### DELETE /system/prune/images?{query}
Delete all unused images and return their IDs.

Query parameters:
- all: boolean, optional, default=false
    - true to remove all unused images and not just dangling ones

Response headers:
- Content-Type: application/json

Response body:
- string[]

Response codes:
- 200 OK: at least one image removed
- 304 Not Modified: no image removed

### GET /system/containers
Retrieve the list of all containers in the system.

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: some containers available
- 204 No Content: no container available

### GET /system/containers/{id}
Get detailed information about a specific container.

Route parameters:
- id: string, required
    - Container ID

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: container found
- 404 Not Found: container not found

### PUT /system/containers/{id}/start
Start a particular container.

Route parameters:
- id: string, required
    - Container ID

Response codes:
- 200 OK: container found
- 304 Not Modified: no effect
- 404 Not Found: container not found

### PUT /system/containers/{id}/stop
Stop a particular container.

Route parameters:
- id: string, required
    - Container ID

Response codes:
- 200 OK: container found
- 304 Not Modified: no effect
- 404 Not Found: container not found

### PUT /system/containers/{id}/restart
Restart a particular container.

Route parameters:
- id: string, required
    - Container ID

Response codes:
- 200 OK: container found
- 304 Not Modified: no effect
- 404 Not Found: container not found

### DELETE /system/containers/{id}?{query}
Remove a container from the system.

Route parameters:
- id: string, required
    - Container ID

Query parameters:
- force: boolean, optional, default=false
    - true to force removal
- volumes: boolean, optional, default=false
    - remove anonymous volumes of the container

Response codes:
- 200 OK: container found and removed
- 404 Not Found: container not found

### DELETE /system/prune/containers?{query}
Remove all stopped containers and return their IDs.

Query parameters:
- force: boolean, optional, default=false
    - true to force removal

Response headers:
- Content-Type: application/json

Response body:
- string[]

Response codes:
- 200 OK: some containers removed
- 304 Not Modified: no container removed

### GET /system/volumes
List all container volumes in the system.

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: some volumes available
- 204 No Content: no volumes available

### GET /system/volumes/{name}
Get detailed information about a particular volume.

Route parameters:
- name: string, required
    - ID / name of the volume

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: volume found
- 404 Not Found: volume not found

### DELETE /system/volumes/{name}?{query}
Delete a particular volume from the system.

Route parameters:
- name: string, required
    - ID / name of the volume

Query parameters:
- force: boolean, optional, default=false
    - true to remove even when the volume is in use

Response codes:
- 200 OK: Volume found and removed
- 400 Bad Request: Volume could not be removed
- 404 Not Found: Volume not found

### DELETE /system/prune/volumes
Remove all unused volumes and return their IDs.

Response headers:
- Content-Type: application/json

Response body:
- string[]

Response codes:
- 200 OK: some volumes removed
- 304 Not Modified: no volume removed

### Websockets /events/system/loadimage
Allows to incrementally upload individual Docker images that are then uploaded to the configured Docker daemon. Works just like **Websockets /events/transfer/import** but with much fewer reported steps at the end. The docker image should be in the TAR format that **docker save** put out.

## Transfer App v3.1
Some version specific interfaces that are removed for 4.x.

### GET /devicename
Returns the current device name if set.

Response codes:
- 200 OK: device name was set
- 204 No Content: no device name has been set

Response headers:
- Content-Type: application/json

Response body:
- string

Example:
```
GET /api/1/devicename

"IoT Gateway Server 10:5-dev"
```

### PUT /devicename?{query}
Sets the device name of the server.

Query parameters:
- name: string, required
    - device name

Response codes:
- 200 OK: device name successfully set
- 400 Bad Request: no device name given

Example:
```
PUT /api/1/devicename?name=IoT%20Gateway%20Server%2010%3A5-dev
```

### GET /transfer/recognize/apps
Investigates the Docker containers of the server and recognizes apps according to naming conventions.

Response codes:
- 200 OK: at least one app was recognized
- 204 No Content: no app has been recognized

Response headers:
- Content-Type: application/json

Response body:
- DockerApp

Example:
```
GET /api/1/transfer/recognize
```

## Transfer App v2.2.2-inst-dev
Important interfaces of this version documented to interact with the older API that was in use. For information about further interfaces the app itself must be investigated or the Swagger documentation opened.

### POST /api/transfer/import
Uploads / imports an app instance as ZIP archive without incremental feedback. Prefer the websocket endpoint **/events/import** instead.

Request headers:
- Content-Type: multipart/form-data

Request body:
- form entry with name "app" and content type "application/zip" as binary data

Response codes:
- 200 OK: app successfully imported
- 400 Bad Request: import failed

Example:
```
POST /api/transfer/import
Content-Type: multipart/form-data; boundary=--------------------------854348040641744448699751
Content-Length: 25828282
 
----------------------------854348040641744448699751
Content-Disposition: form-data; name="app"; filename="BashMessagePrinter.zip"
<BashMessagePrinter.zip>
----------------------------854348040641744448699751--
```

### GET /api/transfer/apps
Retrieves the list of all currently available apps.

Response codes:
- 200 OK: at least one app is available
- 204 No Content: currently no apps available

Response headers:
- Content-Type: application/json

Response body:
- AppInstance[]

Example:
```
GET /api/transfer/apps

[
    {
        "App": {
            "Name": "Bash Message Printer",
            "Version": "1.0.0",
            "Description": "Prints messages from a JSON file to the console",
            "Imported": "0001-01-01T00:00:00"
        },
        "Status": "Stopped",
        "Images": [
            {
                "Name": "bash-message-printer:1.0.0",
                "Id": "sha256:789d3b4e3b96c272320db1a7ad6d171790d62aa8cb6df8f6fe824ba35e846b85",
                "Created": "2022-03-23T13:41:15.1730781Z",
                "Platform": "linux-amd64",
                "Size": 63154148
            }
        ],
        "Containers": []
    },
    ...
]
```

### PUT /api/compose/start?{query}
Starts an app that is available. May take a while that is why the corresponding websocket endpoint should be prefered **/events/start**.

Query parameters:
- name: string, required
    - name of the app
- version: string, required
    - version of the app

Response codes:
- 200 OK: App instance found
- 400 Bad Request: Name or version not given
- 404 Not Found: ap instance not found

Response headers:
- Content-Type: application/json

Response body:
- DockerComposeUpResult

Example:
```
PUT /api/compose/start?name=Simple%20Webserver&version=1.0.0

{
    "RunningContainers": [
        "simplewebserver3a100-inst_frontend_1"
    ],
    "PulledImages": [],
    "ExitCode": 0,
    "Command": "docker-compose -f Storage/Instances/Simple+Webserver%3A1.0.0-inst/docker-compose.yml -H unix:///var/run/docker.sock up -d",
    "Lines": [
        {
            "Line": "Creating network \"simplewebserver3a100-inst_default\" with the default driver",
            "RawLine": "Creating network \"simplewebserver3a100-inst_default\" with the default driver",
            "IsStdout": false,
            "IsStderr": true
        },
        {
            "Line": "Creating simplewebserver3a100-inst_frontend_1 ...",
            "RawLine": "Creating simplewebserver3a100-inst_frontend_1 ... ",
            "IsStdout": false,
            "IsStderr": true
        },
        {
            "Line": "Creating simplewebserver3a100-inst_frontend_1 ... done",
            "RawLine": "Creating simplewebserver3a100-inst_frontend_1 ... done",
            "IsStdout": false,
            "IsStderr": true
        }
    ],
    "SuccessEstimate": true,
    "DurationMs": 1461,
    "RawOutput": "Creating network \"simplewebserver3a100-inst_default\" with the default driver\nCreating simplewebserver3a100-inst_frontend_1 ... \nCreating simplewebserver3a100-inst_frontend_1 ... done\n"
}
```

### PUT /api/compose/stop?{query}
Stops an available app.

Query parameters:
- name: string, required
    - name of the app
- version: string, required
    - version of the app

Response codes:
- 200 OK: App instance found
- 400 Bad Request: Name or version not given
- 404 Not Found: ap instance not found

Response headers:
- Content-Type: application/json

Response body:
- ProcessResult

Example:
```
PUT /api/compose/stop?name=Simple%20Webserver&version=1.0.0

{
    "ExitCode": 0,
    "Command": "docker-compose -f Storage/Instances/Simple+Webserver%3A1.0.0-inst/docker-compose.yml -H unix:///var/run/docker.sock down -t 1",
    "Lines": [
        {
            "Line": "Stopping simplewebserver3a100-inst_frontend_1 ...",
            "RawLine": "Stopping simplewebserver3a100-inst_frontend_1 ... ",
            "IsStdout": false,
            "IsStderr": true
        },
        {
            "Line": "Stopping simplewebserver3a100-inst_frontend_1 ... done",
            "RawLine": "Stopping simplewebserver3a100-inst_frontend_1 ... done",
            "IsStdout": false,
            "IsStderr": true
        },
        {
            "Line": "Removing simplewebserver3a100-inst_frontend_1 ...",
            "RawLine": "Removing simplewebserver3a100-inst_frontend_1 ... ",
            "IsStdout": false,
            "IsStderr": true
        },
        {
            "Line": "Removing simplewebserver3a100-inst_frontend_1 ... done",
            "RawLine": "Removing simplewebserver3a100-inst_frontend_1 ... done",
            "IsStdout": false,
            "IsStderr": true
        },
        {
            "Line": "Removing network simplewebserver3a100-inst_default",
            "RawLine": "Removing network simplewebserver3a100-inst_default",
            "IsStdout": false,
            "IsStderr": true
        }
    ],
    "SuccessEstimate": true,
    "DurationMs": 1175,
    "RawOutput": "Stopping simplewebserver3a100-inst_frontend_1 ... \nStopping simplewebserver3a100-inst_frontend_1 ... done\nRemoving simplewebserver3a100-inst_frontend_1 ... \nRemoving simplewebserver3a100-inst_frontend_1 ... done\nRemoving network simplewebserver3a100-inst_default\n"
}
```

### Websockets /events/import
Imports an app as ZIP archive and provides incremental feedback.

Message protocol:
1. (Optional) Receive cancel token as NameValue&lt;string&gt;
    - Name: "CancelID"
    - Value: "{some_id}"
2. Send ZIP file length as NameValue&lt;number&gt;
    - Name: "Length"
    - Value: size of ZIP to send in bytes
3. Send ZIP archive as binary message
4. Receive step wise progress information
    - Each message has type TransferProgress
    - At the beginning there are many StepType: "DATA_TRANSFER" messages
    - After that the import pipeline specific steps are reported
    - If StepType: "STORE_INSTANCE" has "Success: true" then the import was successfull

Example:
```
ws://<server_address>/events/import

Receive: {"Name":"CancelID","Value":"c3818cd7-888c-4923-8bfc-61efe7e6eca1"}
Send: {"Name":"Length","Value":51893840}
Send: <app zip archive as binary message>
Receive: {
  "StepType": "DATA_TRANSFER",
  "Success": true,
  "Required": true,
  "Message": "0.25",
  "Details": "130966"
}
Receive: ...
Receive: {
  "StepType": "DATA_TRANSFER",
  "Success": true,
  "Required": true,
  "Message": "100",
  "Details": "51893840"
}
Receive: {"StepType":"ANNOUNCEMENT","Success":true,"Required":true,"Subject":"Import","Message":"Checking ZIP Format"}
Receive: {"StepType":"CHECK_ZIP","Success":true,"Required":true,"Subject":"ZIP Archive","Message":"ZIP format valid"}
Receive: ...
Receive: {"StepType":"STORE_INSTANCE","Success":true,"Required":true,"Subject":"App","Message":"Successfully stored App"}
Receive: {"StepType":"ANNOUNCEMENT","Success":true,"Required":false,"Subject":"Import","Message":"Successfully imported App Instance Simple Webserver:1.0.0","Details":"Simple Webserver:1.0.0"}
```

### Websockets /events/start?{query}
Starts an available app and provides incremental feedback.

Query parameters:
- name: string, required
    - name of the app
- version: string, required
    - version of the app

Message protocol:
1. (Optional) Receive cancel token as NameValue&lt;string&gt;
    - Name: "CancelID"
    - Value: "{some_id}"
2. Receive step wise progress information
    - Each message has type TransferProgress

Example:
```
ws://<server_address>/events/start?name=Simple+Webserver&version=1.0.0

Receive: {"Name":"CancelID","Value":"ce80f2af-dbae-47f0-920b-7bca9725809b"}
Receive: {"StepType":"ANNOUNCEMENT","Success":true,"Required":true,"Message":"Starting App instance Simple Webserver:1.0.0"}
Receive: {"StepType":"PROCESS_PROGRESS","Success":true,"Required":false,"ProcessLine":{"Line":"Creating network \"simplewebserver3a100-inst_default\" with the default driver","RawLine":"Creating network \"simplewebserver3a100-inst_default\" with the default driver","IsStdout":false,"IsStderr":true}}
Receive: ...
Receive: {"StepType":"ANNOUNCEMENT","Success":true,"Required":false,"Message":"Successfully started App Simple Webserver:1.0.0"}
Receive: {"StepType":"PROCESS_PROGRESS","Success":true,"Required":false,"ProcessResult":<DockerComposeUpResult>,"Message":"Process result of docker-compose up"}
```

### Websockets /events/system/loadimage
Allows to incrementally upload individual Docker images that are then uploaded to the configured Docker daemon. Works just like **Websockets /events/import** but with much fewer reported steps at the end. The docker image should be in the TAR format that **docker save** put out.

# App Pool

## App Pool - Store Side

### GET /pool/apps
List all apps along with their versions that are installed in the app pool and also
those that are globally available and not installed.

Response body:
- PoolApp[]

Response codes:
- 200 OK: some apps available
- 204 No Content: no apps available

### PUT /pool/apps/{id}
Install A specific app version on the pool.

### DELETE /pool/apps/{id}
Uninstall, i.e. remove, an app version from the pool.

### PUT /pool/refresh
Refresh metadata of all globally available apps.

### PUT /pool/clear
Completely clear all data available in the app pool.

## App Pool - Transfer Side

### GET /servers
Get all registered servers of the pool.

Response body:
- PoolServer[]

Response codes:
- 200 OK: servers available
- 204 No Content: no server available

### POST /servers
Register a new server on the pool.

### DELETE /servers/{id}
Delete a server from the pool.

### GET /deployments
Query all available deployments.

Response body:
- 200 OK: deployments available
- 204 No Content: no deployments available

### POST /deployments
Deploy a specific app version to a server.

### DELETE /deployments/{id}
Uninstall an app deployment from a server and if necessary stop it before.

### PUT /deployments/{id}/start
Start a deployed app.

### PUT /deployments/{id}/stop
Stop a deployed app.

## App Pool Configuration
Reuses the /configure endpoints from [General Interfaces](../GeneralInterfaces).