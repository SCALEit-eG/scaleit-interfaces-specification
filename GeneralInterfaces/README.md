# General Interfaces

Interfaces defined here apply in general.

## Version

Interfaces and datastructures adhere to semantic versioning.

### GET /api/versions
list of available version identifiers

### GET /api/versions/{version}
list of available endpoints for the version

## Events

### SSE /api/events
Server-sent events endpoint; allows asynchronous communication from the server to the client

Supported channels:
- status
- state
- ping (technical)
- AlarmAndEvent
- Information
- MeasuringValue
- DataManagement
- ControlValue

## Process Management

A process hereby refers to an identifiable procedure or task that takes place in an app.

### PUT /api/cancel/{id}
Cancel the task identified by the given ID
