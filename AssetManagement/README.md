# Asset Management

Asset := a thing of value to an organization, mostly physical

## Identification

Globally unique identification of devices: Gauid := global asset unique identifier

Identification through URLs, see [Details of AAS 4.4](https://industrialdigitaltwin.org/wp-content/uploads/2021/09/07_details_of_the_asset_administration_shell_part1_v3_en_2020.pdf)

## Registration Process

### MQTT

### Publish AlarmAndEvent/Registration
asset gets registered

### Subscribe {gauid}/AlarmAndEvent/Status
confirmation of the registration

## REST

### GET /api/{version}/assets?{filterquery}
get all available assets or a filtered subset

### GET /api/{version}/assets/{id}
get information about a specific asset

### PUT /api/{version}/assets/{id}
change information about an asset like geoposition

### POST /api/{version}/assets/{id?}
add an asset to the root of the asset tree or to an existing asset

### DELETE /api/{version}/assets/{id}
delete an asset
