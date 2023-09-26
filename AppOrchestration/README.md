# App Orchestration
Interfaces for services that can deploy and orchestrate apps.

# Table of Contents

1. [Transfer Technology](#transfer-technology)
2. [Transfer Technology - Files API](#transfer-technology---files-api)
3. [Transfer Technology - Templates](#transfer-technology---templates)
4. [Apps](#apps)
5. [App ID](#app-id)
6. [App Config](#app-config)
7. [Transfer Technology - Container System Module](#transfer-technology---container-system-module)
8. [Transfer App v2.2.2-inst-dev](#transfer-app-v222-inst-dev)
9. [App Pool](#app-pool)
10. [App Pool - Store Side](#app-pool---store-side)
11. [App Pool - Transfer Side](#app-pool---transfer-side)

# Transfer Technology

## Main Transfer API
These endpoints are specific to the transfer app that is build around Docker-Compose.

### POST /api/{api-version}/transfer/import
Import an app type as ZIP archive. The Websocket endpoint **/events/transfer/import** should be preferred as it provides incremental feedback for this import process that may take a while.

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

### GET /api/{api-version}/transfer/export/{id}?{query}
Export a specific app type as ZIP archive.

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

### GET /api/{api-version}/transfer/apps
Retrieve the list of currently available app types on the server.

Response codes:
- 200 OK: apps are available
- 204 No Content: there is currently no imported app

Response headers:
- Content-Type: application/json

Response body:
- AppType[]

Example:
```
GET /api/1/transfer/apps

[
    {
        "Id": "c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM",
        "ManufacturerId": "scale-it.org",
        "ProductNumber: "11300783512",
        "Version": "1.5.3",
        "Name": "SCALE it DTwin App",
        "Description": "Generic digital twin app",
        "Frontends": [
            {
                "Port": 54110,
                "Path": null,
                "Protocol": "http"
            }
        ],
        "Middlelayers": [
            {
                "Port": 54109,
                "Path": null,
                "Protocol": "http"
            }
        ],
        "Categories": [
            "IoT",
            "Sensors"
        ],
        "Installed": "2021-07-05T15:44:32.453Z"
    }
]
```

### GET /api/{api-version}/transfer/apps/{id}
Get the information details of a single app type.

Route parameters:
- id: app type id

Response codes:
- 200 OK: app type found
- 400 Bad Request: app id not given
- 404 Not Found: app type not found

Response headers:
- Content-Type: application/json

Response body:
- AppType

Example:
```
GET /api/1/transfer/apps/c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM
```

### GET /api/{api-version}/transfer/apps/{id}/instances
Retrieve the list of deployed instances of the given app type.

Response codes:
- 200 OK: instances are available
- 204 No Content: there is currently no deployed instance for the app type
- 404 Not Found: app type not found

Response headers:
- Content-Type: application/json

Response body:
- AppInstance[]

### GET /api/{api-version}/transfer/apps/{id}/icon
Download the app's icon if available.

Route parameters:
- id: app type id

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
GET /api/1/transfer/apps/c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM/icon
```

### GET /api/{api-version}/transfer/apps/{id}/readme
Download the app's readme if available.

Route parameters:
- id: app type id

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
GET /api/1/transfer/apps/c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM/readme
```

### DELETE /api/{api-version}/transfer/apps/{id}?{query}
Delete an app type and if forced and necessary stop all instances and delete them as well.

Route parameters:
- id: app type id

Query parameters:
- force: boolean, optional, default: false
    - If deployments exist then they are stopped and removed so the removal succeeds
- remove_images: boolean, optional, default: true
    - Remove referenced container images if not referenced by other apps
- remove_volumes: boolean, optional, default: false
    - Remove used docker volumes of instances

Response codes:
- 200 OK: app type successfully removed
- 400 Bad Request: app id invalid, app is busy
- 404 Not Found: app type not found
- 409 Conflict
    - instance of the app still exists and force=false
    - image still needed if remove_images=true

Response body:
- AppInstance[]
    - The deleted instances if any

Example:
```
DELETE /api/1/transfer/apps/c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM?force=true&remove_images=false
```

### POST /api/{api-version}/transfer/apps/{id}/deploy
Deploys a new instance for an available app type.

Route parameters:
- id: app type id

Request body:
- DeploymentConfiguration

Response codes:
- 200 OK: new instance deployed
- 400 Bad Request: invalid deployment configuration
- 404 Not Found: app type not found
- 409 Conflict
    - incompatible deployment configuration detected

Response body:
- ProblemDetails on error

Response headers:
- Location, if successfully deployed
    - URL to new instance

### GET /api/{api-version}/transfer/apps/{id}/templatevariables
Retrieves the list of template variables defined for the app type.

Route parameters:
- id: app type id

Response codes:
- 200 OK: template variables available
- 204 No Content: no variables defined in template
- 404 Not Found: app type not found

Response body:
- DeploymentVariable[]

### GET /api/{api-version}/transfer/instances
Retrieve the list of currently available app instances on the server.

Response codes:
- 200 OK: apps are available
- 204 No Content: there is currently no deployed instance

Response headers:
- Content-Type: application/json

Response body:
- AppInstance[]

### GET /api/{api-version}/transfer/instances/{id}
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

### PUT /api/{api-version}/transfer/instances/{id}/start
Start an app instance. As this process may take some time, it is recommended to use the Websocket **/events/transfer/instances/{id}/start** endpoint instead.

Route parameters:
- id: app instance id

Response codes:
- 200 OK: App instance found
- 400 Bad Request:
    - app id not given
    - instance is busy
    - no valid license
- 404 Not Found: app instance not found

Response headers:
- Content-Type: application/json

Response body:
- DockerComposeUpResult

Example:
```
PUT /api/1/transfer/instances/c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM/start
```

### PUT /api/{api-version}/transfer/instances/{id}/stop?{query}
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
    - instance is busy
- 404 Not Found: app instance not found
- 409 Conflict:
    - app image still needed if remove_images=true

Response headers:
- Content-Type: application/json

Response body:
- ProcessResult

Example:
```
PUT /api/1/transfer/instances/ScaleIT%20node-red%3A2.2.2/stop?remove_volumes=true
```

### GET /api/{api-version}/transfer/instances/{id}/logs?{query}
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
GET /api/1/transfer/instances/simple%20webserver%3A1.0.0-dbg/logs?lines=30
```

### PUT /api/{api-version}/transfer/instances/{id}/update?{query}
Update an app instance. As this process may take some time, it is recommended to use the Websocket **/events/transfer/instances/{id}/update** endpoint instead.

Route parameters:
- id: app instance id

Response codes:
- 200 OK: App instance found
- 400 Bad Request:
    - app id not given
    - instance is busy
    - no valid license
- 404 Not Found: app instance not found

Response headers:
- Content-Type: application/json

Response body:
- TransferProgress[]

### PUT /api/{api-version}/transfer/refresh/instances
Refreshes the status information of all instances, whereby the status updates are sent asynchronously via SSE and the operation is only done if there is no refresh scheduled already.

Response codes:
- 202 Accepted: refresh will be performed
- 409 Conflict: transfer app is already busy refreshing

Example:
```
PUT /api/1/transfer/refresh/instances
```

### GET /api/{api-version}/transfer/refresh/instances
Returns if the transfer app is currently busy refreshing the status of all instances or not.

Response codes:
- 200 OK: always

Response headers:
- Content-Type: application/json

Response body:
- boolean

Example:
```
GET /api/1/transfer/refresh/instances
```

### PUT /api/{api-version}/transfer/instances/{id}/refresh
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
PUT /api/1/transfer/instances/simple%20webserver%3A1.0.0-dbg/refresh
```

### GET /api/{api-version}/transfer/recognize/projects
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

### Websockets /events/transfer/instances/{id}/start
Starts an available app and provides incremental feedback.

Route parameters:
- id: app instance id

Message protocol:
1. (Optional) Receive cancel token as NameValue&lt;string&gt;
    - Name: "CancelID"
    - Value: "{some_id}"
2. Receive step wise progress information
    - Each message has type TransferProgress

### Websockets /api/{api-version}/events/transfer/instances/{id}/update?{query}
Updates the specified instance to the requested version and provides incremental feedback.

Route parameters:
- id: app instance id

Query parameters:
- version: string
    - Version to which to update to
    - Specified version must be available

Message protocol:
- Same as **/api/{api-version}/events/transfer/instances/{id}/start**


### SSE /api/{api-version}/events
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

### PUT /api/{api-version}/cancel/{id}
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

### GET /api/{api-version}/files?{}

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

### GET /api/{api-version}/files/{id}?{}

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

## Apps
There is a distinction between app types and app instances. Instances derive from app types. Software applications are imported as an app type from which multiple instances can be created.

An app is represented as a ZIP archive with the following structure:
- config.yml
- compose-tpl.yaml
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

Apps come with a **compose-tpl.yaml** that serves as a template possibly containing variables in order create a **compose.yaml** when deploying the app. Through the **compose.yaml** it is possible to orchestrate the app. Docker images need to be available when the app starts and may be retrievable on the server the Docker runs and thus they are optional. It must not contain a **build context**.

Uniqueness of an app is given by the following information:
- Manufacturer Id
- Product number
- Version

## App ID

For the Transfer App the uniqueness of an App Type is guaranteed by the combination of **ManufacturerId**, **ProductNumber** and **Version**. Each instance of an app type gets an **InstanceNumber** to uniquely identify the instance. By definition, each instance is associated with exactly one app type.

App Types and App Instances both express these aforementioned fields combined in an ID string. This string must be placed in specific URL segments at the API. Thus the ID string must be an encoded value, preferably Base64URL encoding. For clients and frontends of the Transfer App the ID will just be a string and how the Transfer App handles the identifying components is an implementation detail clients don't need to know.

Example for illustration:
```
ManufacturerId: scale-it.org
ProductNumber: 11300783512
Version: 1.5.3
InstanceNumber: 1

Base64URL encoded and combined with '.':
App Type ID: c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM
App Instance ID: c2NhbGUtaXQub3Jn.MTEzMDA3ODM1MTI.MS41LjM.MQ
```

Instead of Base64-URL also other encodings could be used and the parts could be combined with a different separation symbol. The client only needs to use the ID string as is and should not make assumptions about its precise implementation.

*Note* that **URL-encoding** is discouraged for the ID since many software libraries and frameworks automatically decode it when encountering it at a REST endpoint thus easily leading to confusion and bugs. It is also problematic because it is more difficult to choose a suitable separation symbol for the ID parts. Internally in the Transfer App the URL-encoding may serve for file storage. Externally the URL encoded version may be used for export file names.

In order to also allow URL encoding for specific purposes the ID parts **must not contain a space character** so that the space character can be used as separator without the need to keep this space character as is in a file system path.

## App Config

Consists of identifying information and metadata. Frontend and Middlelayer entries may be added to access the frontend or server components of the app.

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
https://<server_url>:54179/api
```

## Transfer Technology - Container System Module
The subsequent endpoints define the system module of the transfer app that serves administrative purposes around Docker and Docker Compose. Data models returned will mostly reflect those from the Docker API.

### GET /api/{api-version}/system/images
Retrieve the list of available container images.

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: at least one image found
- 204 No Content: no images available

### GET /api/{api-version}/system/images/{id}
Get detailed information about a container image.

Route parameters:
- id: string, required
    - Image ID

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: image found
- 404 Not Found: image not found

### POST /api/{api-version}/system/images
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

### GET /api/{api-version}/system/images/{id}/export
Download the serialized container image.

Route parameters:
- id: string, required
    - Image ID

Response headers:
- Content-Type: application/x-tar

Response codes:
- 200 OK: image found
- 404 Not Found: image not found

### DELETE /api/{api-version}/system/images/{id}?{query}
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

### DELETE /api/{api-version}/system/prune/images?{query}
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

### GET /api/{api-version}/system/containers
Retrieve the list of all containers in the system.

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: some containers available
- 204 No Content: no container available

### GET /api/{api-version}/system/containers/{id}
Get detailed information about a specific container.

Route parameters:
- id: string, required
    - Container ID

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: container found
- 404 Not Found: container not found

### PUT /api/{api-version}/system/containers/{id}/start
Start a particular container.

Route parameters:
- id: string, required
    - Container ID

Response codes:
- 200 OK: container found
- 304 Not Modified: no effect
- 404 Not Found: container not found

### PUT /api/{api-version}/system/containers/{id}/stop
Stop a particular container.

Route parameters:
- id: string, required
    - Container ID

Response codes:
- 200 OK: container found
- 304 Not Modified: no effect
- 404 Not Found: container not found

### PUT /api/{api-version}/system/containers/{id}/restart
Restart a particular container.

Route parameters:
- id: string, required
    - Container ID

Response codes:
- 200 OK: container found
- 304 Not Modified: no effect
- 404 Not Found: container not found

### DELETE /api/{api-version}/system/containers/{id}?{query}
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

### DELETE /api/{api-version}/system/prune/containers?{query}
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

### GET /api/{api-version}/system/volumes
List all container volumes in the system.

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: some volumes available
- 204 No Content: no volumes available

### GET /api/{api-version}/system/volumes/{name}
Get detailed information about a particular volume.

Route parameters:
- name: string, required
    - ID / name of the volume

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: volume found
- 404 Not Found: volume not found

### DELETE /api/{api-version}/system/volumes/{name}?{query}
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

### DELETE /api/{api-version}/system/prune/volumes
Remove all unused volumes and return their IDs.

Response headers:
- Content-Type: application/json

Response body:
- string[]

Response codes:
- 200 OK: some volumes removed
- 304 Not Modified: no volume removed

### Websockets /api/{api-version}/events/system/loadimage
Allows to incrementally upload individual Docker images that are then uploaded to the configured Docker daemon. Works just like **Websockets /api/{api-version}/events/transfer/import** but with much fewer reported steps at the end. The docker image should be in the TAR format that **docker save** put out.

## Transfer App v3.1
Some version specific interfaces that are removed for 4.x.

### GET /api/{api-version}/devicename
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

### PUT /api/{api-version}/devicename?{query}
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

### GET /api/{api-version}/transfer/recognize/apps
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

### POST /api/{api-version}/transfer/import
Uploads / imports an app instance as ZIP archive without incremental feedback. Prefer the websocket endpoint **/api/{api-version}/events/import** instead.

Request headers:
- Content-Type: multipart/form-data

Request body:
- form entry with name "app" and content type "application/zip" as binary data

Response codes:
- 200 OK: app successfully imported
- 400 Bad Request: import failed

Example:
```
POST /api/1.0.0/transfer/import
Content-Type: multipart/form-data; boundary=--------------------------854348040641744448699751
Content-Length: 25828282
 
----------------------------854348040641744448699751
Content-Disposition: form-data; name="app"; filename="BashMessagePrinter.zip"
<BashMessagePrinter.zip>
----------------------------854348040641744448699751--
```

### GET /api/{api-version}/transfer/apps
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
GET /api/1.0.0/transfer/apps

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

### PUT /api/{api-version}/compose/start?{query}
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
PUT /api/1.0.0/compose/start?name=Simple%20Webserver&version=1.0.0

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

### PUT /api/{api-version}/compose/stop?{query}
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
PUT /api/1.0.0/compose/stop?name=Simple%20Webserver&version=1.0.0

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

### Websockets /api/{api-version}/events/import
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
ws://<server_address>/api/1.0.0/events/import

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

### Websockets /api/{api-version}/events/start?{query}
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
ws://<server_address>/api/1.0.0/events/start?name=Simple+Webserver&version=1.0.0

Receive: {"Name":"CancelID","Value":"ce80f2af-dbae-47f0-920b-7bca9725809b"}
Receive: {"StepType":"ANNOUNCEMENT","Success":true,"Required":true,"Message":"Starting App instance Simple Webserver:1.0.0"}
Receive: {"StepType":"PROCESS_PROGRESS","Success":true,"Required":false,"ProcessLine":{"Line":"Creating network \"simplewebserver3a100-inst_default\" with the default driver","RawLine":"Creating network \"simplewebserver3a100-inst_default\" with the default driver","IsStdout":false,"IsStderr":true}}
Receive: ...
Receive: {"StepType":"ANNOUNCEMENT","Success":true,"Required":false,"Message":"Successfully started App Simple Webserver:1.0.0"}
Receive: {"StepType":"PROCESS_PROGRESS","Success":true,"Required":false,"ProcessResult":<DockerComposeUpResult>,"Message":"Process result of docker-compose up"}
```

### Websockets /api/{api-version}/events/system/loadimage
Allows to incrementally upload individual Docker images that are then uploaded to the configured Docker daemon. Works just like **Websockets /api/{api-version}/events/import** but with much fewer reported steps at the end. The docker image should be in the TAR format that **docker save** put out.

# App Pool

## App Pool - Store Side

### GET /api/{api-version}/pool/apps
List all apps along with their versions that are installed in the app pool and also
those that are globally available and not installed.

Response body:
- PoolApp[]

Response codes:
- 200 OK: some apps available
- 204 No Content: no apps available

### PUT /api/{api-version}/pool/apps/{id}
Install A specific app version on the pool.

### DELETE /api/{api-version}/pool/apps/{id}
Uninstall, i.e. remove, an app version from the pool.

### PUT /api/{api-version}/pool/refresh
Refresh metadata of all globally available apps.

### PUT /api/{api-version}/pool/clear
Completely clear all data available in the app pool.

## App Pool - Transfer Side

### GET /api/{api-version}/servers
Get all registered servers of the pool.

Response body:
- PoolServer[]

Response codes:
- 200 OK: servers available
- 204 No Content: no server available

### POST /api/{api-version}/servers
Register a new server on the pool.

### DELETE /api/{api-version}/servers/{id}
Delete a server from the pool.

### GET /api/{api-version}/deployments
Query all available deployments.

Response body:
- 200 OK: deployments available
- 204 No Content: no deployments available

### POST /api/{api-version}/deployments
Deploy a specific app version to a server.

### DELETE /api/{api-version}/deployments/{id}
Uninstall an app deployment from a server and if necessary stop it before.

### PUT /api/{api-version}/deployments/{id}/start
Start a deployed app.

### PUT /api/{api-version}/deployments/{id}/stop
Stop a deployed app.

## App Pool Configuration
Reuses the /configure endpoints from [General Interfaces](../GeneralInterfaces).