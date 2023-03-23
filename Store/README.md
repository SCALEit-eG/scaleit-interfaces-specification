# App Store and Market Place

- The SCALE it Marktplatz serves as commercial component to purchase products including software with configured terms
- The App Store serves as technical component that stores the required software artefacts, manages the devices, generates the licenses and keeps track of them

## App Store - Security

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

## App Store - Licensing

### GET /licenses
Get the list of all available licenses.

Response codes:
- 200 OK: licenses available
- 204 No Content: no license yet available

Response headers:
- Content-Type: application/json

Response body:
- LicenseSimpleInfo[]

### GET /licenses/{id}
Get information about a specific license.

Route parameters:
- id: string
    - License ID

Response codes:
- 200 OK: license found
- 400 Bad Request: invalid id given
- 404 Not Found: license not found

Response headers:
- Content-Type: application/json

Response body:
- LicenseDto

### GET /licenses/{id}/export
Download a specific license as a ZIP archive.

Route parameters:
- id: string
    - License ID

Response codes:
- 200 OK: license found
- 400 Bad Request: invalid id given
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
Create a new license issued by the current CA. The provided data must uniquely identify the order item through order number, shop Id and product number.

Request body:
- LicenseRequest

Request headers:
- Content-Type: application/json

Response codes:
- 201 Created: license successfully created
- 400 Bad Request: required information missing or CA not available
- 404 Not Found: order not found
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
- 400 Bad Request: data format invalid
    - Not related to "invalid"
- 404 Not Found: no active CA

Response body:
- ValidationResult

Response headers:
- Content-Type: application/json

### DELETE /licenses/{id}
Delete a specific license.

Response codes:
- 200 OK: license found and deleted
- 400 Bad Request: invalid id
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

## App Store - Orders

### GET /orders?{query}
Retrieve the list of all stored orders.

Query Parameters:
- shop: string, optional
    - Shop Id
- until: ISO date string, optional
    - Orders up to the given timestamp
- from: ISO date string, optional
    - Orders at and after the given timestamp
- status: "paid", "open", optional
    - Orders with given payment status
- customer: string, optional
    - Orders from a given customer

Response codes:
- 200 OK: orders available
- 204 No Content: no orders currently available
- 400 Bad Request: invalid parameter

Response body:
- OrderDto[]

Response headers:
- Content-Type: application/json

### POST /orders
Send a new order to the app store providing order information for one or more apps with chosen license terms.

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

### GET /orders/{id}
Get information about a specific order.

Route parameters:
- id: string
    - Combined id

Query Parameters:
- <del>shop: string, required</del>
    - Shop Id
    - deprecated because a combined unique id is needed in the route

Response codes:
- 200 OK: order and shop found
- 400 Bad Request: if order number or shop id not given
- 404 Not Found: if order or shop not found

Response body:
- OrderDto

Response headers:
- Content-Type: application/json

### PUT /orders/{orderno}
Update the status of an order. Typical use case is to update the payment status. The shop's identity is inferred from the provided credentials or authorization token respectively, in order to find the correct order entity.

Route parameters:
- orderno: string
    - Order number

Request headers:
- Content-Type: application/json
- Authorization: Bearer {access token}

Request body:
- OrderUpdate

Response codes:
- 200 OK: order successfully updated
- 400 Bad Request: order update data is wrong or order number not given
- 401 Unauthorized: no credentials provided
- 403 Forbidden: access token invalid or identity is unauthorized
- 404 Not Found: order for given order number not found, or shop not found

Response body:
- Order

Response headers:
- Content-Type: application/json

### DELETE /orders/{id}
Remove an order from the app store.

Route parameters:
- id: string
    - Combined id including order number and shop id

Response codes:
- 200 OK: order found and deleted
- 400 Bad Request: id invalid
- 404 Not Found: order for id not found

## App Store - Devices

### GET /devices
Get all devices that are recorded in the store.

Response codes:
- 200 OK: devices available
- 204 No Content: no device available

Response body:
- DeviceBinding[]

Response headers:
- Content-Type: application/json

### POST /devices
Record a new device in the store.

Request headers:
- Content-Type: application/json

Request body:
- DeviceBinding[]

Response codes:
- 201 Created: device successfully created
- 400 Bad Request: invalid data given
    - Note: exactly one binding must be given, several are not allowed at once,
    for that separate devices must be recorded
- 409 Conflict: device with same binding already exists

Response headers:
- Location: url to the newly recorded device
    - Only on success

### GET /devices/{id}?{query}
Get the information about a specific device. The Id of a device is the identifying part of the type of binding used.

Route parameters:
- id: string
    - Identifier for the binding, depending on the type

Query Parameters:
- type: string, required
    - Identifies the type of binding
    - Currently supported: nic, tpm

Response codes:
- 200 OK: device found
- 400 Bad Request: invalid type given
- 404 Not Found: device not found

Response body:
- DeviceBinding

### DELETE /devices/{id}?{query}
Remove a recorded device from the store.

For route and query parameters see [GET /devices](#get-devicesidquery).

Response codes:
- 200 OK: device found and removed
- 400 Bad Request: invalid type given
- 404 Not Found: device not found

## App Store - Shops

### GET /shops?{query}
Get the list of currently registered shops.

Query parameters:
- isdefault: boolean, optional
    - filter by IsDefault attribute

Response codes:
- 200 OK: shops available
- 204 No Content: no shop available

Response body:
- Shop[]

Response headers:
- Content-Type: application/json

### POST /shops
Register a new shop.

Request body:
- Shop

Response codes:
- 201 Created: shop successfully registered
- 400 Bad Request: invalid data
- 409 Conflict: shop identifier already taken

Response headers:
- Location: url of newly registered shop

### GET /shops/{id}
Get information about a specific shop.

Route parameters:
- id: string
    - Asset Id of the shop

Response codes:
- 200 OK: shop found and returned
- 400 Bad Request: if id not given
- 404 Not Found: shop for id not found

Response body:
- Shop

### PUT /shops
Change information about a registered shop. There is no id as route parameter necessary as the id is already contained in the entity and an id change is not possible here.
The id change is not possible here because id changes should be done in a centralized manner updating all references of the entity accordingly.

Route parameters:
- <del>id: string</del>
    - Asset Id of the shop

Request body:
- Shop

Response codes:
- 200 OK: shop successfully changed
- 400 Bad Request: data invalid
- 404 Not Found: shop for id not found
- 409 Conflict: Id change not possible because id already taken

Response body:
- Shop

### DELETE /shops/{id}
Deregister a particular shop from the store.

Route parameters:
- id: string
    - Asset Id of the shop

Response codes:
- 200 OK: shop found and deleted
- 400 Bad Request: id not given
- 404 Not Found: shop for id not found

## App Store - Apps

### GET /apps?{query}
Get the list of available apps.

Query Parameters:
- shop: string, optional
    - Shop Id
- manufacturer: string, optional
    - Manufacturer Id

Response codes:
- 200 OK: apps available
- 204 No Content: no apps available for the request
- 404 Not Found: Id of a query parameter not found if it was given

Response body:
- AppAsset[]

Response headers:
- Content-Type: application/json

### POST /apps
Add a new app to the store. Both initial metadata and app files need to be uploaded.

Request headers:
- Content-Type: multipart/form-data

Request body:
- form data with the following parts:
    - Metadata
        - key: metadata
        - Content-Type: application/json
    - Files
        - key: files
        - Content-Type: application/zip

Response codes:
- 201 Created: New app asset successfully created
- 400 Bad Request
    - Metadata or given files are incomplete
    - Metadata given in JSON or the metadata files are conflicting
    - Metadata or contents of files contain errors
- 409 Conflict: App with same identification already exists

Response headers:
- Content-Type: application/json

Response body:
- Success: AppAsset
- Error: ProblemDetails

### GET /apps/{id}
Get information about a particular app given its unique Id.

Route parameters:
- id: string
    - Id of the App

Response codes:
- 200 OK: app found
- 404 Not Found: app or shop not found

Response body:
- AppAsset

Response headers:
- Content-Type: application/json

### GET /apps/{id}/export
Download an app archive.

Route parameters:
- id: string
    - Id of the App

Response codes:
- 200 OK: app found
- 404 Not Found: app or shop not found

Response body:
- ZIP archive

Response headers:
- Content-Type: application/zip

### PUT /apps/{id}
Change the configuration or the files of an app. The given information will be integrated into the existing data.

Route parameters:
- id: string
    - Id of the App

Request headers:
- Content-Type: multipart/form-data

Request body:
- form data with the following parts:
    - Metadata
        - key: metadata
        - Content-Type: application/json
    - Files
        - key: files
        - Content-Type: application/zip

Response codes:
- 200 OK: Data successfully changed
- 400 Bad Request
    - Metadata or given files are incomplete
    - Metadata given in JSON or the metadata files are conflicting
    - Metadata or contents of files contain errors
- 404 Not Found: App for given Id not found

Response headers:
- Content-Type: application/json

Response body:
- Success: AppAsset
- Error: ProblemDetails

### DELETE /apps/{id}?{query}
Delete an app from the store.

Route parameters:
- id: string
    - Id of the App

Query parameters:
- remove_artefacts: boolean, optional, default=false
    - Remove the referenced artefacts of the app

Response codes:
- 200 OK: App successfully deleted
- 400 Bad Request
    - Unable to remove artefacts when it was requested because artefacts are referenced by other apps
- 404 Not Found: App for given Id not found

Response headers:
- Content-Type: application/json, text/plain

Response body:
- Success: status text
- Error: ProblemDetails