# App Management

## App ID

Each app needs to be uniquely identified. The combination of name and version is not unique across a network because the same app instance may be deployed several times on different machines. Thus the App Management service needs to generate an identification on app registration.

## REST Endpoints

### GET /api/{version}/apps
Retrieve the list of all available apps.

Response codes:
- 200 OK: apps list
- 204 No Content: if no apps are available

Response headers:
- Content-Type: application/json

Response body:
- AppListItem[]

Example:
```
GET /api/1.0.0/apps
```

### POST /api/{version}/apps
Register an app.

Request headers:
- Content-Type: application/json

Request body:
- AppRegistration

Response codes:
- 201 Created: new app registered
- 400 Bad Request: required attributes missing
- 409 Conflict: App with same MiddlelayerUrl already exists

Response headers:
- Location: URL of the new App
- Content-Type: text/plain

Response body:
- New App ID for registered app as plain text

Example:
```
POST /api/1.0.0/apps
{
    "Name": "Sample App",
    "Version": "2.4.3",
    "MiddlelayerUrl": "http://192.168.153.100:54200",
    "FrontendUrl": "http://192.168.153.100:54201"
}
```

### GET /api/{version}/apps/{id}
Retrieve information about an existing app.

Route parameters:
- id: App ID

Response codes:
- 200 OK: app information
- 404 Not Found: App ID not found

Response headers:
- Content-Type: application/json

Response body:
- App

Example:
```
GET /api/1.0.0/apps/abcdef123456
```

### PUT /api/{version}/apps/{id}
Add or update information about an app. All null values will reset the specific attributes. But only optional attributes may be reset.

Route parameters:
- id: App ID

Request headers:
- Content-Type: application/json

Request body:
- AppEdit

Response codes:
- 200 OK: information successfully changed
- 400 Bad Request: required files not present or null
- 404 Not Found: App ID not found

Response headers:
- Content-Type: application/json

Response body:
- App

Example:
```
PUT /api/1.0.0/apps/abcdef123456
{
    "Name": "Sample App",
    "Version": "2.4.3",
    "Description": "Added description",
    "Icon": "http://192.168.153.100:54200/api/1.0.0/files/icon.svg",
    "MiddlelayerUrl": "http://192.168.153.100:54200",
    "FrontendUrl": "http://192.168.153.100:54201"
}
```

### DELETE /api/{version}/apps/{id}
Deregister an existing app, deleting it from the services management.

Route parameters:
- id: App ID

Response codes:
- 200 OK: app deleted
- 404 Not Found: App ID not found

Example:
```
DELETE /api/1.0.0/apps/abcdef123456
```

### PUT /api/{version}/apps/{id}/icon
Set an icon for the app that will take priority over the supplied URL. Usually this is used if no icon is available otherwise.

Route parameters:
- id: App ID

Request headers:
- Content-Type: MIME type of icon
    - e.g.: image/svg+xml, image/png

Request body:
- image file content

Response codes:
- 200 OK: icon uploaded
- 400 Bad Request: unsupported image format
- 404 Not Found: App ID not found

### DELETE /api/{version}/apps/{id}/icon
Delete the uploaded icon.

Note: *Unnecessary* because the icon URL may be reset in the update operation.
