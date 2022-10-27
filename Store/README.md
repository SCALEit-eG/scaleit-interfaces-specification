# App Store and Market Place

- The SCALE it Marktplatz serves as commercial component to purchase products including software with configured terms
- The App Store serves as technical component that stores the required software artefacts, manages the devices, generates the licenses and keeps track of them

## App Store

### GET /licenses/{id}
Download a specific license.

### POST /licenses
Create a new license.

### PUT /licenses
Validate a license against the ca.

### GET /ca
Download the ca.

### PUT /ca
Create the ca, i.e. certificate authority.

### POST /login
Allows programmatic login with a client certificate and returns an access token on success. This access token can be used to gain access to restricted resources.

Request headers:
- Content-Type: application/x-pem-file

Request body:
- Certificate file in PEM format i.e. base64 encoded certificate

Response codes:
- 200 OK: login successful, access token returned
- 400 Bad Request: no certificate supplied or wrong format
- 403 Forbidden: certificate is not valid

Response body:
- Access token in JWT format

### POST /orders
Send a new order to the app store providing order information for one single app with chosen licence terms.

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