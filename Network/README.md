# Network

## Requirements
- Dynamic port assignment for apps
- DNS and reverse proxies
    - Load balances
- TLS for outside access
    - No TLS for internal communication

## Connectivity

Connectivity types:
- MQTT
- REST HTTP, SSE
- Websockets

### GET /api/{api-version}/connectivity
read the current connectivity details

### PUT /api/{api-version}/connectivity
change the connectivity details