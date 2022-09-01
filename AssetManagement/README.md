# Asset Management

Asset := a thing of value to an organization, physical or virtual

## Identification

Globally unique identification of devices: Gauid := global asset unique identifier

Identification through URLs, see [Details of AAS 4.4](https://industrialdigitaltwin.org/wp-content/uploads/2021/09/07_details_of_the_asset_administration_shell_part1_v3_en_2020.pdf)

## Registration Process

- Usage of MQTT topics

### Publish AlarmAndEvent/Registration
asset gets registered

### Subscribe {gauid}/AlarmAndEvent/Status
confirmation of the registration

## Asset Management

### GET /assets?{filterquery}
get all available assets or a filtered subset

### GET /assets/{id}
get information about a specific asset

### PUT /assets/{id}
change information about an asset like geoposition

### POST /assets/{id?}
add an asset to the root of the asset tree or to an existing asset

### DELETE /assets/{id}
delete an asset
