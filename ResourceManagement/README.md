# Resource Management

## Files

An app can implement a filesystem. The typical abstractions of files and folders should be used. Entries are identified by an ID.

The ID should be the URL encoded path to the entry. For the root entry the leading slash "/" may be omitted.

- File IDs mit wildcard URL anstatt URL Kodierung

### GET /api/{version}/files?{}
retrieves the filesystem of the app with filter possibilities

Query parameters:
- filetypes: optional, string array, optional, list of files e.g. pdf, png, docx
- q: optional, string, search query
- category: optional, string, defined categories for a specific purpose e.g. graphics, certificates, licenses

Request headers:
- Content-Type: application/json

Response codes:
- 200 OK: default case
- 204 No Content: if no file system entries are available
- 400 Bad Request: query parameters were used falsely

Response body:
- AppFilesystem array
- list of strings if "categories" query parameter is present
- error text on status code 400

Examples:
```
GET /api/1.0.0/files
returns the app's filesystem

GET /api/1.0.0/files?filetypes=svg&filetypes=png&q=icon
returns a list of files according to the filter parameters

GET /api/1.0.0/files?category=licenses
returns a list with all license files
```

### GET /api/{version}/filecategories
returns a list of available categories

Examples:
```
GET /api/1.0.0/filecategories
returns a list of available categories
```

### GET /api/{version}/files/{id}?{}
Download a specific file or folder structure

Route parameters:
- {id}: entry id

Query parameters:
- compress: string, optional, values: zip, tar
    - Compresses the retrieved file or the folder structure
    - If folder referenced and compress not set, then the file system for the folder is returned

Response codes:
- 200 OK: entry for ID was found
- 204 No Content: entry is directory and it is empty
- 404 Not Found: entry not found

Response headers:
- Content-Type:
    - application/json if AppFilesystem returned
    - content type of file or archive otherwise

Response body:
- File content if entry is a file
- AppFilesystem structure if entry is directory
- Folder as archive if directory and compression requested

Examples:
```
GET /api/1.0.0/files/icon.svg

GET /api/1.0.0/files/path%2Fto%2Ffolder?compress=zip
returns a ZIP archive for "/path/to/folder" directory
```

### GET /api/{version}/files/{id}/info
Get the metadata for the filesystem entry including the root directory represented by "/" which resolves to "%2F".

Route parameters:
- id: ID of the entry, if root then it must be explicitly "/" (%2F)

Response codes:
- 200 OK: metadata datastructure for file or directory
- 404 Not Found: entry for ID not found

Response headers:
- Content-Type: application/json

Response body:
- AppFilesystemEntryMetadata

```
GET /api/1.0.0/files/%2F/info
gives metadata about the root directory
```

### POST /api/{version}/files/{id}?{}
Upload a file to a specific folder or create a folder

Route parameters:
- id: entry id for folder folder in which to upload
    - optional, if left open then root directory assumed

Query parameters:
- name: optional, string, name of file if not multipart/form-data content type
- mkdir: optional, string, create directory with given name

Request headers:
- Content-Type: MIME type of file
    - if application/octet-stream it will be resolved automatically according to the file extension or be left as application/octet-stream
    - with multipart/form-data several files may be uploaded at once and the filename must be given for each

Request body:
- file to upload

Response codes:
- 201 Created: file uploaded or directory created
- 400 Bad Request: if referenced ID is not a directory
- 404 Not Found: parent folder doesn't exist
- 409 Conflict: file or directory name already existing

Response headers:
- Content-Type: text/plain

Response body:
- ID of new file entry as text on success
- Nothing on failure

Examples:
```
POST /api/1.0.0/files?name=manual.pdf
Content-Type: application/pdf
<PDF content>

Uploads manual.pdf to root directory

POST /api/1.0.0/files/%2Fcerts
Content-Type: multipart/form-data
<multipart/form-data content>

Uploads all files in the form data to the /certs folder

POST /api/1.0.0/files/graphics?mkdir=icons

Creates the folder icons/ in the folder graphics/
```

### PUT /api/{version}/files/{id}?{}
Replace a file, rename a file or directory or move an entry.

Route parameters:
- {id}: entry id for folder folder in which to upload

Query parameters:
- rename: optional, string, new name for file or folder
- move: optional, string, ID of folder entry for move location

Request headers:
- Content-Type: MIME type of file
    - not needed if "rename" or "move" query parameters used

Request body:
- content of the file if replace operation

Response codes:
- 200 OK: successfully replaced, renamed or moved
- 400 Bad Request: move location is not a directory entry
- 404 Not Found: entry for ID not found, ID for move location not found
- 409 Conflict: new name already existing

Response headers:
- Content-Type: text/plain

Response body:
- New ID if renamed or moved

Examples:
```
PUT /api/1.0.0/files/icon.png?move=icons
move the icon.png file to folder icons/

PUT /api/1.0.0/files/resources%2Flicense.txt?rename=LICENSE.txt
renames license.txt into LICENSE.txt

PUT /api/1.0.0/files/data%2Fbackend.json
Content-Type: text/plain
<content>

replaces (changes) backend.json with new content
```

### DELETE /api/{version}/files/{id}
Delete a file system entry.

Route parameters:
- id: file entry ID

Response codes:
- 202 Accepted: file or folder successfully deleted
- 404 Not Found: entry not found

Example:
```
DELETE /api/1.0.0/files/tmp%2F
deletes the folder tmp/ and all children
```

## App Filesystem

For an example implementation see https://github.com/SCALEit-eG/scaleit-fileshare-app/blob/master/DomainSoftware/middlelayer/Model/AppFilesystem.cs