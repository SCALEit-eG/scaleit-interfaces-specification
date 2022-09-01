# Security

# Topics

- Authentication
    - Protocol: OpenID Connect (OIDC)
- Authorization
    - Protocol: OAuth 2.0, delegated authorization
    - RBAC / ABAC
- PKI
    - x509 Certificates
    - TLS
    - Client Authentication
    - Secure Device Onboarding
- Licensing
    - Digital Signatures, JWS / JWT
    - Hardware binding
        - Network Adapter (NIC), MAC Address
        - Secure Element

## Licensing

License files shall be guarded against manipulation and forgery using digital signatures with x509 certificates coming from a trusted CA within a PKI.

### JWS

- JSON Web Signature (JWS) as algorithm for digital signatures
    - As key algorithm RS256 shall be used by default
- JSON Web Token (JWT) as format for the license file with the ending ".lic"
- For every license a certificate request is signed by a trusted CA
    - The certificate with the public key is published to the owner in the following formats
        - PEM: Base64 encoded with ASCII character encoding with extension ".crt"
            - distributed unencrypted
        - PKCS#12: binary encoded container format with extension ".pfx"
            - distributed unencrypted
    - The private key is kept secret
- The signature is encrypted with the private key and can be decrypted with the public key
- Licenses are distributed as ZIP archive with three files:
    - JWT with signature: {name}.lic
    - Text certificate: {name}.crt
    - Binary certificate: {name}.pfx
- Because an x509 certificate is assigned to a license it may be used to identify a license
    - The fingerprint of the x509 certificate shall be used for that purpose
    - SHA1 and SHA256 are possible, SHA1 is used for identification because it is shorter
    - During validation SHA256 shall be used

## Licensing - Transfer App Interfaces

- When an app is deployed it is assigned a unique key that is associated with its app id
- The key must be posted from the Transfer App to the middlelayer of the app and can be requested to be sent again
- When a start of an app is requested the Transfer App has to verify its license
- If a license expires and there is no further valid license then the Transfer App automatically stops the app

### GET /transfer/apps/{aid}/licenses
Retrieve license information of the active license or all licenses of an app.

Route parameters:
- aid: string, required
    - ID of the app

Query parameters:
- all: boolean, optional, default: false
    - If true then an array of all licenses of the app will be returned
- also_invalid: boolean, optional, default: false
    - Also returns licenses that are invalid

Request headers:
- Authorization: Key {key}
    - Used for authorized access to the license

Response codes:
- 200 OK: valid license(s) available
- 204 No Content: no valid license available
- 401 Unauthorized: no key provided
- 403 Forbidden: key is not authorized for the app

Response headers:
- Content-Type: application/json

Response body:
- License[]

### GET /transfer/apps/{aid}/licenses/{lid}
Retrieve the license files of a specific license.

Route parameters:
- aid: string, required
    - ID of the app
- lid: string, required
    - ID of the license

Request headers:
- Authorization: Key {key}
    - Used for authorized access to the license

Response codes:
- 200 OK: valid license available
- 204 No Content: no valid license available
- 401 Unauthorized: no key provided
- 403 Forbidden: key is not authorized for the app
- 404 Not found: no license for license ID

Response headers:
- Content-Type: application/zip

Response body:
- ZIP archive with license file and certificate

### POST /transfer/apps/{aid}/licenses
Add a license to an app.

Route parameters:
- aid: string, required
    - ID of the app

Request headers:
- Content-Type: application/zip

Request body:
- ZIP archive with license file and certificate

Response codes:
- 200 OK: license uploaded
- 400 Bad Request: ZIP archive not valid or incomplete

### DELETE /transfer/apps/{aid}/licenses/{lid}
Remove a license of an app.

Route parameters:
- aid: string, required
    - ID of the app
- lid: string, required
    - ID of the license

Request headers:
- Authorization: Key {key}
    - Used for authorized access to the license

Response codes:
- 200 OK: license found and deleted
- 401 Unauthorized: no key provided
- 403 Forbidden: key is not authorized for the app
- 404 Not found: no license for license ID

## Licensing - System Information

- NIC information is needed and retrieved through [System Information](../ResourceManagement/README.md/#get-systeminfo)

## Licensing - App Interfaces

### POST /license/key
The Transfer App will post the authorization key together with the app identifier to the app in question.

Request headers:
- Content-Type: application/json

Request body:
- LicenseKey

Response codes:
- 200 OK: responses are ignored
