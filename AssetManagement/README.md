# Asset Management

Asset := a thing of value to an organization, physical or virtual

## Considerations

- Assets need to be uniquely identifiable
- Assets can be of any kind and must support generic data structures
- Assets can be related to each other and form a network / graph
- Assets may have static and dynamic data
- Assets can trigger events
- Assets may have operations that can be executed

## Identification

Globally unique identification of devices: Gauid := global asset unique identifier

Identification through URIs, see [Details of AAS 4.4](https://industrialdigitaltwin.org/wp-content/uploads/2021/09/07_details_of_the_asset_administration_shell_part1_v3_en_2020.pdf)

- URIs create hierarchies
- URI namespaces / prefixes can be reserved for an asset hierarchy

## Identities
Assets are assigned ownership and authorization to identities. These identities can be person entities or non-person entities. Both identities are identified by mere strings.

The identity strings could be:
- E-Mail for a person entity
- Device Id or domain name registered in a digital certificate for a non-person entity

Authentication, i.e. establishing an identity, is assumed to be done by an authentication component before this API.

## Asset Management

Types of Assets:
- Device (also virtual devices)
    - Sensor
        - Temperature Sensor
        - Sensor System
    - Actor
    - Computer
        - Physical Computer
        - Virtual Computer (VM)
    - PC Component
        - CPU
        - NIC
    - Machine
    - Machine Component
- Software
    - App
        - App Part
    - Service
    - OS
- Contract
    - Order
    - License
    - Policy
        - Data Policy
- Person
- Organisation
- Production System
- Building
    - Plant / Factory
    - Facility
        - Hospital

### GET /assets?{filterquery}
Get all available assets or a filtered subset in a hierarchy or graph.

Query parameters:
- limit: number, optional, default: -1
    - Limits the results that are returned to the specified count
    - -1 means infinite
- from: string, optional
    - ID of asset acting as starting point for a tree or network
    - Only used when either tree or network is true
- tree: boolean, optional, default: false
    - Returns the hierarchy of a specified asset
    - Takes precedence over network
- depth: number, optional, default: -1
    - Restricts the hierarchy depth when tree is true
    - Restricts the path distance if network is true
    - -1 means infinite
- network: boolean, optional, default: false
    - Returns a network of connected asset
    - Cannot bet used together with tree
- type: string, optional
    - Returns only assets of the given type
- q: string, optional
    - Search term for label and description
- tags: array of strings, optional
    - Restrict to the given tags

Request headers:
- Authorization

Response codes:
- 200 OK: assets found and returned
- 204 No Content: no assets found for query
- 400 Bad Request: tree or network requested but no asset in the "from" parameter given
- 401 Unauthorized: No access information given
- 403 Forbidden: No read rights: not global or for the given asset
- 404 Not Found: asset in the "from" parameter not found

Response type:
- Array&lt;Asset\\&gt; or Graph&lt;Asset\\&gt;

Examples:
```
GET /assets?limit=100
GET /assets?type=App&network=true&from=urn%3Ascaleit%3Adev%3Aassets%3A1%3A1%3Asensor-app-template1
```

### POST /assets?{query}
Add a new asset on the root level or beneath a specific existing asset.

Query parameters:
- parentId: string, optional
    - if given the ID of the parent asset

Request body:
- Asset

Response codes:
- 201 Created: new item created
- 400 Bad Request: violation of data definition
- 401 Unauthorized: not yet authenticated
- 403 Forbidden: not authorized
- 409 Conflict: asset for Id already exists

Response headers:
- Content-Type: text/plain
- Location: url for new asset

Response body:
- status message as plain text string

### GET /assets/{id}
Get information about a specific asset.

Route parameters:
- id: Asset ID

Response codes:
- 200 OK: asset found
- 401 / 403
- 404 Not Found: asset not found

Response body:
- Asset

### PUT /assets/{id}
Change metainformation of an asset. Not all metainformation is allowed to change. Fields that are left empty or null are assumed to not change. Typical use cases include:
- Change ownership or assign authorized identities
- Change the ID, alternative IDs or namespaces

Route parameters:
- id: Asset ID

Request body:
- Asset

Response codes:
- 200 OK: asset found and successfully changed
- 404 Bad Request: asset not changed because invalid data or change of unchangeable fields was requested
- 401 / 403: unauthenticated or unauthorized to make changes to asset
- 404 Not Found: asset not found

### DELETE /assets/{id}?{query}
Delete an asset and optionally its hierarchy.

Route parameters:
- id: Asset ID

Query parameters:
- recursive: boolean, optional, default=false
    - if true then all assets below the given asset will be deleted as well

Response codes:
- 200 OK: asset found and deleted
- 401 / 403: unauthenticated or unauthorized to make changes to asset
- 404 Not Found: asset not found

## Asset Types

### GET /assettypes?{query}
Retrieves a list of all or a filtered subset of registered asset types.

Query parameters:
- qid: string, optional
    - search in the ID fields
- qlabel: string, optional
    - search in the label fields
- qop: "and", "or", default: "or"
    - logical operator for search parameters if both were given

Response codes:
- 200 OK: asset types found
- 204 No Content: no asset types available or found
- 400 Bad Request: query parameter violation
- 401 / 403: unauthenticated or unauthorized

Response body:
- AssetType[]

### POST /assettypes
Registers a new asset type.

Request body:
- AssetType

Response codes:
- 201 Created: new asset type registered
- 400 Bad Request: data violation
- 401 / 403: unauthenticated or unauthorized
- 409 Conflict: Id for new asset type already in use

Response headers:
- Location: URI of new asset type if created

### GET /assettypes/{type}
Get the metainformation about a specific asset type.

Route parameters:
- type: Id of the asset type

Response codes:
- 200 OK: asset type found
- 401 / 403: unauthenticated or unauthorized
- 404 Not Found: asset type not found

Response body:
- AssetType

### PUT /assettypes/{type}?{query}
Change the metainformation of an asset type. Typically the allowed data types are configured or the display label is changed.

Route parameters:
- type: Id of the asset type

Query parameters:
- checkdata: boolean, optional, default=false
    - delete all data for unallowed data types

Request body:
- AssetType
    - Missing or null entries are ignored

Response codes:
- 200 OK: found and changed
- 401 / 403: unauthenticated or unauthorized
- 404 Not Found: asset type not found

### DELETE /assettypes/{type}?{query}
Delete an asset type and all derived assets.

Route parameters:
- type: Id of the asset type

Query parameters:
- recursive: boolean, optional, default=false
    - Also delete all assets that are beneath the deleted assets

Response codes:
- 200 OK: found and deleted
- 401 / 403: unauthenticated or unauthorized
- 404 Not Found: asset type not found

## Asset Data

Binary data can be put in the system and be given an asset relative file URL. Default data is however JSON.

### GET /assets/{id}/data?{filter}
Query an asset for data.

Route parameters:
- id: Asset Id

Query parameters:
- binary: boolean, optional, default: false
    - true to look for binary data only
    - false to look for JSON data only
- mime: string, optional
    - MIME type if binary=true
- dtype: string, optional
    - Id of the datatype to restrict query to
- fromCreated: ISO date string, optional
    - data created at or after the given date
- toCreated: ISO date string, optional
    - data created at or before the given date
- fromModified: ISO date string, optional
    - data modfied at or after the given date
- toModified: ISO date string, optional
    - date modified at or before the given date
- propertyX: string, optional
    - property path in the data with dot notation
    - X is a number corresponding to the value parameters
    - X can be omitted
    - must refrence a primitive data type namely string, number, boolean or date
- valueX: any, optional
    - string value interpreted as string, number, boolean or date
    - depends on Xproperty
    - filter for direct value
    - takes precedence over other value parameters
- valuesX: array of any, optional
    - similar to Xvalue
    - represents a value "in" values query
- valueFromX: any, optional
    - similar to Xvalue
    - represents the from part in a "between" query or equal or greater than
- valueToX: any, optional
    - similar to Xvalue
    - represents the to part in a "between" query or equal or less than

Response codes:
- 200 OK: data retrieved
- 204 No Content: no data available
- 400 Bad Request: route or query parameter violation
    - In particular if a number X for a value parameter is given and no corresponding propertyX was given
- 401 / 403: unauthenticated or unauthorized
- 404 Not Found: asset not found

Response body:
- AssetData[]

### POST /assets/{id}/data
Post a new data element to an asset. It can be JSON or binary data.

Route parameters:
- id: Asset Id

Request headers:
- Content-Type:
    - application/json: for JSON data
    - multipart/form-data: for binary data
        - key: metadata, Content-Type: application/json
        - data: binary blob, Content-Type: application/octet-stream

Request body:
- AssetDataPost
- AssetDataPost + binary data

Response codes:
- 201 Created: data successfully submitted
- 400 Bad Request: violation of request data that was sent
- 401 / 403
- 404 Not Found: asset not found

### GET /assets/{id}/data/{element}
Get a specific data element.

Route parameters:
- id: Asset Id
- element: data element Id

Response codes:
- 200 OK: data found
- 400 Bad Request: route parameters wrong
- 401 / 403
- 404 Not Found: asset or data not found

Response body:
- AssetData

### PUT /assets/{id}/data/{element}
Change a data element.

Route parameters:
- id: Asset Id
- element: data element Id

For request headers and request body see [POST /assets/{id}/data](#post-assetsiddata)

Response codes:
- 200 OK: data successfully changed
- 400 Bad Request: violation of request data that was sent
- 401 / 403
- 404 Not Found: asset not found or element not found

### DELETE /assets/{id}/data/{element}
Delete a data element.

Route parameters:
- id: Asset Id
- element: data element Id

Response codes:
- 200 OK: data element successfully deleted
- 400 Bad Request: required parameter not given
- 404 Not Found: asset or element not found

## Data Types
Data types have a version and a schema to restrict the kind of data that can be posted to specific assets. As schema JSON schema is used.

### GET /datatypes?{query}
List or search all available data types.

Query parameters:
- q: string, optional
    - Search term to look for in label and description
- tags: array of strings, optional
    - Restrict to the given tags
- vfrom: iso date string
    - Restrict to data types with versions released not before the given date
- vto: iso date string
    - Restrict to data types with versions released not after the given date

Response body:
- AssetDataType[]

Response codes:
- 200 OK: some data types found
- 204 No Content: no data types found

### POST /datatypes
Register a new datatype with specific version and optionally make it default.

Request body:
- AssetDataTypeAdd

Response codes:
- 201 Created: data type successfully created
- 400 Bad Request: data given invalid
- 409 Conflict: data type with the same ID already exists

### GET /datatypes/{dtype}
Retrieve metainformation about a datatype.

Route parameters:
- dtype: data type ID

Response body:
- AssetDataType

Response codes:
- 200 OK: data type found
- 404 Not Found: data type not found

### PUT /datatypes/{dtype}
Change a datatype whereby all null values for existing fields are ignored.

Route parameters:
- dtype: data type ID

Request body:
- AssetDataTypeChange

Response body:
- AssetDataType

Response codes:
- 200 OK: data type successfully changed
- 400 Bad Request: given data invalid
- 404 Not Found: data type not found

### DELETE /datatypes/{dtype}?{query}
Delete a datatype and all of its versions.

Route parameters:
- dtype: data type ID

Query parameters:
- force: boolean, optional, default=false
    - Force the delete operation and remove all data of the given type

Response codes:
- 200 OK: found and deleted
- 400 Bad Request: not allowed because there is data of the data type and removal was not forced
- 404 Not Found: data type not found

### POST /datatypes/{dtype}/versions
Add a version to a datatype.

Route parameters:
- dtype: data type ID

Request body:
- AssetDataTypeVersion

Response codes:
- 201 Created: new version added for the data type
- 400 Bad Request: invalid data given
- 404 Not Found: data type not found
- 409 Conflict: version with the same ID already exists

### GET /datatypes/{dtype}/versions/{version}
Get a specific data type version.

Route parameters:
- dtype: data type ID
- version: version ID

Response body:
- AssetDataTypeVersion

Response codes:
- 200 OK: version found for given data type
- 404 Not Found: version or data type not found

### PUT /datatypes/{dtype}/versions/{version}
Change a specific version.

Route parameters:
- dtype: data type ID
- version: version ID

Request body:
- AssetDataTypeVersion

Response body:
- AssetDataTypeVersion

Response codes:
- 200 OK: found and changed
- 400 Bad Request: invalid data
- 404 Not Found: data type or version not found
- 409 Conflict: if version identifier changed and it is already in use

### DELETE /datatypes/{dtype}/versions/{version}
Delete a specific version.

Route parameters:
- dtype: data type ID
- version: version ID

Query parameters:
- force: boolean, optional, default=false
    - Force the delete operation and remove all data for the given version

Response codes:
- 200 OK: version removed
- 400 Bad Request: not forced and data still available
- 404 Not Found: data type or version not found

## Asset Relationships

Types of asset relationships:
- belongs_to: Asset X belongs to / is grouped by Asset Y
    - Assets form a tree / hierarchy
    - Used to derive asset rights
        - Example: owner of an organisation owns implicitly all the facilities that belong to that organisation
    - Example: sensor elements are grouped by a sensor system
    - Example: a specific product item belongs to an order
- part_of: Asset X is part of Asset Y
    - Assets form a tree / hierarchy
    - Example: a vehicle engine is part of a car
    - Example: a machine asset consists of multipe machine components
- connected_to: Asset X is connected to Asset Y
    - Assets form a graph / network
    - Example: a computer is connected to the network
    - Example: an app is connected to a MQTT broker
- deployed_on: Asset X is deployed / installed on Asset Y
    - Assets form a tree
    - Example: an app is running on a server
    - Example: a service runs on a cluster that is installed in a data center
- depends_on: Asset X depends on Asset Y
    - Assets should form a tree, but could also form a cyclic graph in some cases
    - Example: time series service depends on a specific database system
    - Example: a data service depends on a user service for access management but the user service also depends on the data service to store users in it
- type_of: hierarchy of asset types and data types
    - Example: Server and DesktopPC asset types inherit from the Computer asset type
    - Example: DesktopInfo data type inherits ComputerInfo data type
- instance_of: states that an asset is an instance of an asset type
    - Example: WorkStation1 is a Computer asset
- extends: assets may extend each other to directly derive an extended asset from an existing instance
    - Example: ?

### GET /assets/{id}/rel

### POST /assets/{id}/rel

### GET /assets/{id}/rel/{reltype}

### POST /assets/{id}/rel/{reltype}

### GET /assets/{id}/rel/{reltype}/{relid}

### PUT /assets/{id}/rel/{reltype}/{relid}

### DELETE /assets/{id}/rel/{reltype}/{relid}

## Asset Events

### GET /assets/{id}/events
List the event types that an asset supports.

### GET /assets/{id}/events/{eventtype}
Retrieve information that defines the asset kind, accessibility, data format and structure.

### POST /assets/{id}/events
Register an event for an asset. It may be just static information how to access the event or it may instruct the system to actively listen for external data.

## Asset Operations

Operations are directly executed on the assets. It shall be implemented through simple webhooks without parameter as the necessary data may be retrieved by the asset itself from the configured data.

### GET /assets/{id}/ops
Get a list of all operations of the requested asset.

### POST /assets/{id}/ops
Register a new operation on the asset.

### PUT /assets/{id}/ops/{opid}
Change an operation on an asset.

### DELETE /assets/{id}/ops/{opid}
Delete an operation.

### PUT /assets/{id}/ops/{opid}/call
Call a specific operation of an asset.
