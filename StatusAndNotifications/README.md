# Status and Notifications

## Status

Overall status of the application or asset.

### GET /api/{api-version}/status
Gives the current status message of the application.

Response codes:
- 200 OK: always

Response headers:
- Content-Type: application/json

Response body:
- StatusMessage

Example:
```
GET /api/1.2/status
```

## States

Possible states of an application or asset.

### GET /api/{api-version}/states
list of available states

### GET /api/{api-version}/states/{id}
information about a specific state
