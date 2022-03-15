# REST Template

Markdown template for specifying REST endpoints.

- Use a sub heading for the endpoint
- Use curly braces {} for placeholders / parameters
- Specify the method, path, route and query parameters, the HTTP body for the request and response, HTTP headers
    - Reference defined data structures
- Also list available fragments
- Show examples in code blocks

## Template

### POST|PUT /api/{version}/path?{query}
This is a general description of the REST endpoint. Use POST to add a new item and PUT to change an existing one.

Route parameters:
- {version}: API version

Query parameters:
- param1: number, required
    - description for param1
- param2: string, optional
    - description for param2

Fragments:
- None

Request headers:
- Content-Type: application/json

Request body:
- DefinedDataStructureX

Response codes:
- 200 OK: existing item changed
- 201 Created: new item created
- 400 Bad Request: violation of data definition
- 409 Conflict: item already existing

Response headers:
- Content-Type: text/plain

Response body:
- status message as plain text string

Example:
```
POST /api/1.0.0/path?param1=123456

{
    "Data": "Example",
    "Value": 20
}
```

