# App Orchestration

## Transfer Technology
Planned endpoints, not yet defined

### POST /api/{version}/transfer/import
import an app instance or template as ZIP archive

### GET /api/{version}/transfer/export/{id}
export a specific app instance or template as ZIP archive

### GET /api/{version}/transfer/apps
### GET /api/{version}/transfer/apps/{id}
### DELETE /api/{version}/transfer/apps/{id}
retrieve apps and information and delete an app

### PUT /api/{version}/transfer/apps/{id}/start
Start an app

### PUT /api/{version}/transfer/apps/{id}/stop
Stop an app

### GET /api/{version}/transfer/apps/{id}/logs
orchestrate apps

### GET /api/{version}/transfer/templates
### GET /api/{version}/transfer/templates/{id}
### DELETE /api/{version}/transfer/templates/{id}
manage app templates

### POST /api/{version}/transfer/templates/{id}/instantiate
start the app instantiation process

### SSE /api/{version}/transfer/templates/{id}/build
execute the build process and finish it on success; gives incremental feedback

SSE channels:
- status
- progress
- failure

### App Instance

An app instance is represented as a ZIP archive with the following structure:
- config.yml
- docker-compose.yml
- icon.{svg|png|jpg}?
- README.md?
- docker/?
    - {image}.{tar|tgz|tar.gz}

Through the docker-compose.yml it is possible to orchestrate the app. Docker images need to be available when the app starts and may be retrievable on the server the Docker runs and thus they are optional. It must not contain a **build context**.

### App Template Image

The structure from *App Instance* is inherited with the following additions:
- docker-compose-build.yml

It should contain a build context so that **docker-compose build** can be run on the template in order to create an App Instance. The files required in the build context must be provided as well.

## App ID

For an instance of the Transfer App the uniqueness of an App Instance is guaranteed by the combination of **Name** and **Version**.

ID := {Name}:{Version}

For storage purposes the "{Name}:{Version}" string should be URL-encoded.

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
