# Data Platform
Storage of data for assets like sensors and machines and measuring values

Implements or uses the interface of [AssetManagement](../AssetManagement/README.md)

## Requirements
- Stores asset data
    - Stem data / master data
    - Measuring values
        - Query of data in specific time intervals and density
    - Operation values
        - [Was sind Betriebsdaten?](https://www.3s-erp.de/module/zeiterfassung/betriebsdatenerfassung-bde/)
- Enforces configurable policies
    - How many data is stored and for how long

## Security

- Access with security token
    - Generation of API keys
- Session management
- User and access rights management through a different service via OAuth 2.0

## REST

### GET /api/{version}/assets/{id}/values?{}
Measuring values

Query parameters:
- from: ISO date string UTC
- to: ISO date string UTC
- step: string
    - time step

### POST /api/{version}/assets/{id}/values

### PUT /api/{version}/assets/{id}/values

### DELETE /api/{version}/assets/{id}/values

### GET /api/{version}/policy
Gets the policy rules for storage etc.

### PUT /api/{version}/policy

## MQTT