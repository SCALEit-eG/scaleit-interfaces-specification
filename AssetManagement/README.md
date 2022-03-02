# Asset Management

Globally unique identification of devices: Gauid := global asset unique identifier

## Registration Process

### MQTT

**Publish AlarmAndEvent/Registration**\
asset gets registered

**Subscribe {gauid}/AlarmAndEvent/Status**\
confirmation of the registration

## REST

**GET /api/{version}/assets?{filterquery}**\
get all available assets or filtered

**GET /api/{version}/assets/{id}**\
get information about a specific asset
