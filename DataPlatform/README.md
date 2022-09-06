# Data Platform
Storage of data for assets like sensors and machines and measuring values

- Implements or uses the interface of [AssetManagement](../AssetManagement/README.md)
- Implements authorization

## Requirements
- Stores asset data
    - Stem data / master data
    - Measuring values
        - Query of data in specific time intervals and density
    - Operation values
        - [Was sind Betriebsdaten?](https://www.3s-erp.de/module/zeiterfassung/betriebsdatenerfassung-bde/)
- Enforces configurable policies
    - How much data is stored and for how long

## Security

- Access with security token
    - Generation of API keys
- Session management
- User and access rights management through a different service via OAuth 2.0

## Asset Management Implementation

### Authorization

- Ownership of assets
- Inherited by assets in the hierarchy 
    - Calculated using the "belongs_to" relationship between assets
    - Assets with no "belongs_to" are top level assets
- Read and write permissions on assets for non-owners
    - Only owners can delete an asset
    - For ease of use groups can be assigned in addition to assignees
        - All members of a group have the assigned rights of the group to the asset to which the group was assigned
        - Groups are also assets that have owners and can not have a group
- Every asset must have at least one owner
    - If not explicit the admin is the implicit owner
- Top level assets are created by an admin and then assigned an explicit owner
    - Usually organisation assets
    - As long as explicit owner is active the admin role has no permissions to that asset
    - Must be regulated with care
        - Usually policies that restrict number of assets, data elements, operations etc. are set 
- Generation / Registration of Gauids must be secured
    - Namespaces / domains / paths in URIs like URLs and URNs must also be regulated so that
    - Ownerships of namespaces must be assigned to identities
    - URI specific Domains should be registered for all top level assets so that they are blocked for assets in other hierarchies
    - Below a top level assets subdomains may be restricted to certain assets and their descendents
- Identities
    - Ownerships must be expressed by referencing an authorized identity
    - For person entities E-Mail addresses shall be used
        - Management and authentication happens outside of the data platform
    - For non-person entities URIs shall be used
        - URIs are managed in the asset hierarchies