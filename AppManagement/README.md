# App Management

## App ID

Each app needs to be uniquely identified. The combination of name and version is not unique across a network because the same app instance may be deployed several times on different machines. Thus the App Management service needs to generate an identification on app registration.

## REST Endpoints

**POST /api/{version}/register**
