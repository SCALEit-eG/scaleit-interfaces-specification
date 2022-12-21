# Administration

## Server Maintenance
- Administration of a service

### PUT /adm/operations/{operation}

Router parameters:
- operation: string, required

Operations:
- init: Initialize the service by e.g. creating database indexes or establishing connection to a device
- repair: Command the service to repair itself.
- reset: Reset the configuration of the service to its defaults. No permanently stored data is allowed to be deleted during that operation.
- clean: Delete all temporary and permantly stored data.

Response codes:
- 200 OK: operation was successfully executed
- 202 Accepted: operation is scheduled or is taking place but may not be finished
- 304 Not Modified: operation has no effect
- 400 Bad Request: operation is known but not supported
- 401 Unauthorized: authorization required but not given
- 403 Forbidden: operation not permitted for the requesting identity
- 404 Not Found: operation is unknown

## Logging
- Server logs

### GET /adm/logs?{query}
Retrieve logs from the server.

Query parameters:
- from: iso date string, optional
    - logs not older than the given date
- to: iso date string, optional
    - logs not newer than the given date
- level: string, optional
    - log level
- category: string, optional
    - Category or context respectively refering to the module, namespace, class or some scope of a software component

Response codes:
- 200 OK: logs available for the query
- 204 No Content: no logs available
- 400 Bad Request: from or to date string invalid
- 404 Not Found: unknown log level given

### DELETE /adm/logs?{query}
Clear logs from the server.

Query parameters:
- same as [GET /adm/logs](#get-admlogsquery)

Response codes:
- 200 OK: logs deleted
- 304 Not Modified: no logs affected
- 400 Bad Request: query parameter violations
- 404 Not Found: unknown log level given

## Data Maintenance
Services hold data and this data potentially has a schema or data definition. The following aspects should be covered by the interfaces:
- Data import / export
    - Useful for backups, deployment changes, data exporting
- Data migrations

### GET /adm/data/export
Export the data of the system. This data is also referred to as data dump.

### PUT /adm/data/import
Import a data dump into the system.

Query parameters:
- clean: boolean, default=false
    - if true delete all data in the current system otherwise merge the data
- replace: boolean, default=false
    - if true then replace conflicting existing data with the import data otherwise fail