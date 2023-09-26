# Editor

The editor allows editing of files exposed by apps.

## Transfer Technology

Special functionality exists to support the app instantiation process of the transfer technology.

### POST /api/{api-version}/editor/templates/{id}
*maybe redundant*, endpoint called from the transfer app to initiate the instantiation process

### GET /api/{api-version}/ui/editor/instantiate/{id}
frontend endpoint of the editor for the instantiation process
- no {base} in the url
