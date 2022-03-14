# Status and Notifications

## Status

Overall status of the application or asset.

### GET /api/status
backwards compatibility without version

### GET /api/{version}/status
get the current status message

## States

Possible states of an application or asset.

### GET /api/{version}/states
list of available states

### GET /api/{version}/states/{id}
information about a specific state
