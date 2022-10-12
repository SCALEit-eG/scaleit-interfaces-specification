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

Examples:
```
GET /assets?limit=100
GET /assets?type=App&network=true&from=urn%3Ascaleit%3Adev%3Aassets%3A1%3A1%3Asensor-app-template1
```

### POST /assets
add / register an asset

### GET /assets/{id}
get information about a specific asset

### PUT /assets/{id}
change metainformation of an asset

### DELETE /assets/{id}
delete an asset and optionally its hierarchy

## Asset Data

### GET /assets/{id}/data

### GET /assets/{id}/data/{datatype}

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

### GET /assets/{id}/rel/{reltype}

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
