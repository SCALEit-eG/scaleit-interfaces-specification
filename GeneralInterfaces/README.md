# General Interfaces

Interfaces defined here apply in general and typically serve several categories or can't be categorized at all.

## Version

Interfaces and datastructures adhere to semantic versioning. Please refer to [semver.org](https://semver.org/).

### GET /api/versions
List of available version identifiers that the app supports.

Response codes:
- 200 OK: versioning is supported
- 204 No Content: no versioning is supported and hence the **{version}** path segment is left out

Response headers:
- Content-Type: application/json

Response body:
- string[]

Example:
```
GET /api/versions

[
    "0.2.0",
    "0.5.0-dev"
]
```

### GET /api/versions/{version}
List of available endpoints for the given version.

Route parameters:
- version: string, required
    - version identifier that is contained in **GET /api/versions**

Response codes:
- 200 OK: version is supported
- 404 Not Found: version is not supported

Response headers:
- Content-Type: application/json

Response body:
- JSON adhering to OpenAPI specification

Example:
```
GET /api/versions/0.5.0-dev

<swagger.json>
```

## Events

### SSE /api/events
Server-sent events endpoint; allows asynchronous communication from the server to the client

Supported channels:
- status
    - data: StatusMessage
- state
- ping (technical)
- AlarmAndEvent
- Information
- MeasuringValue
- DataManagement
- ControlValue

All sent data should be serialised in JSON.

Request headers:
- Accept: text/event-stream

Response codes:
- 200 OK: always

Response headers:
- Content-Type: text/event-stream
- Connection: keep-alive
- Cache-Control: no-cache

## Process Management

A process hereby refers to an identifiable procedure or task that takes place in an app.

### PUT /api/cancel/{id}
Cancel the task identified by the given ID.

Route parameters:
- id: string, required
    - Identifies the ongoing cancellable process

Response codes:
- 200 OK: process cancelled
- 404 Not Found: process for ID not found, process may not exist or has already finished

Example:
```
PUT /api/cancel/c80c63d8-764d-4e37-94bc-7f3baffeed8d
```
