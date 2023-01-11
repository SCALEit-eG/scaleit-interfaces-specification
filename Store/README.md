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
- 400 Bad Request: invalid id given
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

### GET /orders?{query}
Retrieve the list of all stored orders.

Query Parameters:
- shop: string, optional
    - Shop Id

Response codes:
- 200 OK: orders available
- 204 No Content: no orders currently available
- 404 Not Found: if shop Id was given and shop doesn't exist

Response body:
- Order[]

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

### GET /orders/{orderno}?{query}
Get information about a specific order.

Route parameters:
- orderno: string
    - Only the order number

Query Parameters:
- shop: string, required
    - Shop Id
    - not deprecated as 

Response codes:
- 200 OK: order and shop found
- 400 Bad Request: if order number or shop id not given
- 404 Not Found: if order or shop not found

Response body:
- Order

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
- 400 Bad Request: order update data is wrong
- 401 Unauthorized: no credentials provided
- 403 Forbidden: access token invalid or identity is unauthorized
- 404 Not Found: order for given order number not found

### DELETE /orders/{id}
Remove an order from the app store.

Route parameters:
- id: string
    - Combined id including order number and shop id

Response codes:
- 200 OK: order found and deleted
- 400 Bad Request: id invalid
- 404 Not Found: order for id not found

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

### GET /apps?{query}
Get the list of available apps.

Query Parameters:
- shop: string, optional
    - Shop Id

Response codes:
- 200 OK: apps available
- 204 No Content: no apps available for the request
- 404 Not Found: shop Id not found if it was given

Response body:
- AppBinding[]

Response headers:
- Content-Type: application/json

### POST /apps
Add a new app to the store.

### GET /apps/{id}?{query}
Get information about a particular app given its product number and also the shop Id. The shop Id is required because the product number is only guaranteed to be unique per shop.

Route parameters:
- id: string
    - Product number of the app

Query Parameters:
- shop: string, required
    - Shop Id

Response codes:
- 200 OK: app found
- 404 Not Found: app or shop not found

Response body:
- AppBinding

Response headers:
- Content-Type: application/json

### PUT /apps/{id}?{query}
Change the configuration or the artefacts of an app.

### DELETE /apps/{id}?{query}
Delete an app from the store.
