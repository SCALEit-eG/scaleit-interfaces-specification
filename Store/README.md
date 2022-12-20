# App Store and Market Place

- The SCALE it Marktplatz serves as commercial component to purchase products including software with configured terms
- The App Store serves as technical component that stores the required software artefacts, manages the devices, generates the licenses and keeps track of them

## App Store

### GET /licenses
Get the list of all available licenses.

Response codes:
- 200 OK: licenses available
- 204 No Content: no license yet available

Response headers:
- Content-Type: application/json

Response body:
- LicenseSimpleInfo

### GET /licenses/{id}
Get information about a specific license.

Route parameters:
- id: string
    - License ID

Response codes:
- 200 OK: license found
- 404 Not Found: license not found

Response headers:
- Content-Type: application/json

Response body:
- LicenseDetails

### GET /licenses/{id}/export
Download a specific license as a ZIP archive.

Route parameters:
- id: string
    - License ID

Response codes:
- 200 OK: license found
- 404 Not Found: license not found

Response body:
- ZIP archive with the following content:
    - {id}.crt
        - License certificate in PEM format
    - {id}.pfx
        - License certificate in PKCS#12 / PFX format
    - {id}.lic
        - License token with signature in JWT format

Response headers:
- Content-Type: application/zip

### POST /licenses
Create a new license issued by the current CA.

Request body:
- LicenseRequest

Request headers:
- Content-Type: application/json

Response codes:
- 201 Created: license successfully created
- 400 Bad Request: required information missing or CA not available
- 409 Conflict: no more licenses can be created for the given order number and product

Response headers:
- Location: path to the newly created license

### PUT /licenses
Validate a license against the current CA.

Request body:
- License ZIP

Request headers:
- Content-Type: application/zip

Response codes:
- 200 OK: license validated and validation result returned
- 404 Bad Request: data format invalid or no active CA

Response body:
- ValidationResult

Response headers:
- Content-Type: application/json

### DELETE /licenses/{id}
Delete a specific license.

Response codes:
- 200 OK: license found and deleted
- 404 Not Found: license not found

### GET /ca
Get information about the CA.

Response codes:
- 200 OK: CA available
- 404 Not Found: no CA available

Response body:
- CertificateData

Response headers:
- Content-Type: application/json

### GET /ca/export?{query}
Download the CA certificate in a particular format or export it entirely.

Query parameters:
- format: "crt", "pfx" or "all"
    - all includes the private key and special permissions are needed

Response codes:
- 200 OK: CA available
- 400 Bad Request: wrong format requested
- 403 Forbidden: no permission for "all"
- 404 Not Found: no CA available

Response body:
- file download

Response headers:
- Content-Type:
    - application/octet-stream: if "crt" or "pfx"
    - application/zip: if "all"

### POST /ca?{query}
Create the CA of the store, i.e. the certificate authority to sign the licenses with.

Query parameters:
- days: number
    - Mandatory field that specifies how long the CA should be valid

Request body:
- CertConfig

Response codes:
- 201 Created: CA successfully created
- 400 Bad Request: invalid data given or "days" parameter missing
- 409 Conflict: there is an active CA already

### DELETE /ca
Delete the currently active CA.

Response codes:
- 200 OK: CA deleted
- 404 Not Found: no CA currently available

### POST /login
Allows programmatic login with a client certificate and returns an access token on success. This access token can be used to gain access to restricted resources.

Request headers:
- Content-Type: application/x-pem-file

Request body:
- x509 Certificate file in PEM format i.e. base64 encoded certificate

Response codes:
- 200 OK: login successful, access token returned
- 400 Bad Request: no certificate supplied or wrong format
- 403 Forbidden: certificate is not valid

Response body:
- Access token in JWT format

Response headers:
- text/plain

### POST /orders
Send a new order to the app store providing order information for one or more apps with chosen licence terms.

Request headers:
- Content-Type: application/json
- Authorization: Bearer {access token}
    - Serves as credentials

Request body:
- Order

Response codes:
- 201 Created: order successfully submitted
- 400 Bad Request: order data is wrong
- 401 Unauthorized: no credentials provided
- 403 Forbidden: access token invalid or identity is unauthorized
- 409 Conflict: order for the same order number is already present

Response headers:
- Location: URL for created order

### GET /orders/{orderno}

### PUT /orders/{orderno}
Update the status of an order. Typical use case is to update the payment status.

Request headers:
- Content-Type: application/json
- Authorization: Bearer {access token}

Request body:
- OrderUpdate

Response codes:
- 200 OK: order successfully updated
- 400 Bad Request: order update data is wrong
- 401 Unauthorized: no credentials provided
- 403 Forbidden: access token invalid or identity is unauthorized
- 404 Not Found: order for given order number not found