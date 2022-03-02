# Resource Management

## Files

**GET /api/{version}/files?{filterquery}**\
retrieves the filesystem of the app with filter possibilities

available filter parameters:
- filetypes: list of files e.g. pdf, png, docx
- categories: defined categories for a specific purpose e.g. graphics, certificates, licenses
- q: search query
- ...

**GET /api/{version}/files/{id}**\
**POST /api/{version}/files/{id}**\
**PUT /api/{version}/files/{id}**\
**DELETE /api/{version}/files/{id}**\
file or folder operations

### App Filesystem

For an example implementation see https://github.com/SCALEit-eG/scaleit-fileshare-app/blob/master/DomainSoftware/middlelayer/Model/AppFilesystem.cs