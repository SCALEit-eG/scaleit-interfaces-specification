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

Binary data can be put in the system and be given an asset relative file URL.

### GET /assets/{id}/data?{filter}
Query an asset for data.

### POST /assets/{id}/data
Post a new data element to an asset.

### GET /assets/{id}/data/{element}
Get a specific data element.

### PUT /assets/{id}/data/{element}
Change a data element.

### DELETE /assets/{id}/data/{element}
Delete a data element.

## Data Types
Data types have a version and a schema to restrict the kind of data that can be posted to specific assets.

### GET /datatypes?{query}
List or search all available data types.

### POST /datatypes
Register a new datatype with specific version and optionally make it default.

### GET /datatypes/{dtype}
Retrieve metainformation about a datatype.

### PUT /datatypes/{dtype}
Change a datatype.

### DELETE /datatypes/{dtype}
Delete a datatype and 

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

### POST /assets/{id}/ops/{opid}

### PUT /assets/{id}/ops/{opid}

### PUT /assets/{id}/ops/{opid}/call
Call a specific operation of an asset.
