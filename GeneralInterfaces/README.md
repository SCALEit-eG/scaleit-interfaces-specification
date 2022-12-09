# General Interfaces

Interfaces defined here apply in general and typically serve several categories or can't be categorized at all.

## Base URL
The base url should come implicitly before all documented HTTP endpoints although there may be exceptions that need to be stated explicitly.

```
Base URL := {protocol}://{host}[:{port}]:[{prefix}]/api[/{version}]
{protocol} := http[s] | ws[s]
```

- Protocol considers HTTP which is also used for SSE and websockets
- If explicitly referred to the placeholder should be: **{base}**

Examples:
```
https://scale-it.org:54130/api/2/status
https://example-company.platform-x.de/external/api/status
```

In the above examples the base URLs are the following:
1. https://scale-it.org:54130/api/2
2. https://example-company.platform-x.de/external/api

## Prefix
Prefixes are used to enable increased interoperability between different systems that provide SCALE it API endpoints in addition to their own endpoints. It is an optional feature that is configurable, but it must be taken into account by implementations.

Examples:
```
/api/status
/scaleit/api/status
/api/external/scaleit/api/status
```

In the above examples the prefixes are the following:
1. No prefix
2. Prefix := /scaleit
3. Prefix := /api/external/scaleit

## Version

Interfaces and datastructures adhere to semantic versioning. Please refer to [semver.org](https://semver.org/).

- From SemVer it follows that only the major and minor version should be specified when using the version string, as the patch version is implicitly the highest available
- If the version is omitted then the highest available version is inferred
- If only the minor version is omitted then the highest available minor version for the stated major version is inferred

- Assumptions for the examples:
    - Highest available version: 2.9.17
    - Highest minor version for major version 1: 1.5.3
    - Highest patch version for 1.3: 1.3.9
```
/api/status -> /api/2.9/status (patch: 2.9.17)
/api/1/status -> /api/1.5/status (patch: 1.5.3)
/api/1.3/status -> /api/1.3/status (patch: 1.3.9)
```

### GET /versions
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

### GET /versions/{version}
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

### SSE /events
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

### Websockets /events
Websocket endpoint that does the same as the corresponding SSE endpoint, namely sending messages for different types of events.

Protocol:
- Client should send nothing
    - Middlelayer ignores or discards all client data
- Middlelayer sends messages for events that occurred
    - Data: MiddlelayerMessage&lt;?&gt;
    - For status specifically: MiddlelayerMessage&lt;StatusData&gt;

## Process Management

A process hereby refers to an identifiable procedure or task that takes place in an app.

### PUT /cancel/{id}
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

## Configuration

Interfaces for settings and configuration

- Settings are a simple key value mechanism for configuration

### GET /settings
Retrieves the currently active settings.

Response headers:
- Content-Type: application/json

Response codes:
- 200 OK: settings are available
- 204 No Content: no settings available

Response body:
- object with strings as keys and any possible types as values

### PUT /settings
Changes the settings or configuration respectively.

Request headers:
- Content-Type: application/json

Request body:
- object with strings as keys and any possible types as values
    - null values are ignored

Response codes:
- 200 OK: settings successfully changed
- 400 Bad Request: wrong data format or types
- 404 Not Found: no settings available

## Error Responses

- Error responses should be standardized
- Should provide user friendly parts for human readability
- Should provide machine interpretable parts with detailed and concise semantics

### REST

1. HTTP error codes should be used correctly
2. Problem details following RFC7807 should be used see [problem.ts](./problem.ts)
