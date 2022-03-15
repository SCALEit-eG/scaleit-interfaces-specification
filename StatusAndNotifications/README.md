# Status and Notifications

## Status

Overall status of the application or asset.

### GET /api/status
Endpoint for backwards compatibility without version that serves the app status. See **/api/{version}/status**

### GET /api/{version}/status
Gives the current status message of the application.

Response codes:
- 200 OK: always

Response headers:
- Content-Type: application/json

Response body:
- StatusMessage

## States

Possible states of an application or asset.

### GET /api/{version}/states
list of available states

### GET /api/{version}/states/{id}
information about a specific state
