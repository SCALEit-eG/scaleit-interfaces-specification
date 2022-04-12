# Sensors

## Considerations

- Sensor elements instead of sensor systems
- Storage for time series

## Sensor system

A sensor system needs a sensor system mapping defining the sensor elements and sensor system values defining the measuring values. The latter uses the IDs defined by the former. Additional structures like display attributes make also use of the defined sensor IDs.

## MQTT

base topic {base} := Enterprise/WorkCenter/Station/ControlDevice/FieldDevice

gauid := global asset unique ID

### Publish {base}/{gauid}/AlarmAndEvent
AlarmAndEvent messages

### Publish {base}/{gauid}/AlarmAndEvent/Status
status of an asset

Data: StatusMessage

### Publish {base}/{gauid}/MeasuringValue
measuring values of the sensor system

Data: SensorSystemValueMessage

### Publish {base}/{gauid}/Information

### Publish {base}/{gauid}/Information/{type}
metadata of an asset

### Publish {base}/{gauid}/DataManagement/SensorSystemMapping
mapping data structure for a sensor system

Data: SensorSystemMappingMessage

## REST

### GET /api/{version}/metadata
list of available metadata types

Response codes:
- 200 OK: list of metadata
- 204 No Content: no metadata available

Response headers:
- Content-Type: application/json

Response body:
- string[]

### GET /api/{version}/metadata/{type}
retrieve the metadata message for the given type

Route parameters:
- type: metadata type
    - SCALE it semantic 0.2.0: DataClassSubType

Response codes:
- 200 OK: metadata data
- 404 Not Found: metadata for type not found

Response headers:
- Content-Type: application/json

Response body:
- Information/{type} data structure
- DataManagement/{type} data structure

Examples:
```
GET /api/0.2.0/metadata/SensorSystemMapping
GET /api/0.2.0/metadata/DisplayAttributes
GET /api/0.2.0/metadata/MasterData
```

### GET /api/{version}/MeasuringValues
the current (last) measuring values

Response codes:
- 200 OK: measuring values
- 204 No Content: no current values available

Response headers:
- Content-Type: application/json

Response body:
- SensorSystemValueMessage

Example:
```
GET /api/0.2.0/MeasuringValues
```

## Sensor System Mapping
The sensor system mapping needs the mapping metadata with sensor IDs for the sensor elements and measuring values or other metadata that use these sensor IDs.

### Example

Consider the following SensorSystemMapping:
```json
{
    "SemanticVersion": "0.2.0",
    "DataManagement": {
        "DataClassSubType": "SensorSystemMapping",
        "Asset": {
            "Gauid": "XDK:v2:412823",
            "AssetType": "SensorSystem"
        },
        "Content": [
            {
                "idSensorValue": "Content01",
                "SensorType": "AccelerometerX",
                "Label": "AccelerometerX",
                "Exponent": "-3",
                "Unit": "m/s^2"
            },
            {
                "idSensorValue": "Content02",
                "SensorType": "Temperature",
                "Label": "Temperature Element",
                "Exponent": "1",
                "Unit": "°C"
            }
        ],
        "TimeStamp": "1970-01-01T00:00:00.00000+00:00",
        "Hash": "0123456789abcdef48.825280123456789abcdef"
    }
}
```

The sensor IDs are Content01 and Content02 and must appear in the SensorSystemValue.
```json
{
    "SemanticVersion": "0.2.0",
    "MeasuringValue": {
        "DataClassSubType": "SensorSystemValue",
        "Asset": {
            "AssetType": "SensorSystem",
            "Gauid": "XDK:v2:412823"
        },
        "Content": {
            "Content01": 9.565528280375322,
            "Content02": 23.5,
        },
        "TimeStamp": null,
        "Hash": "not yet defined"
    }
}
```

Other metadata like DisplayAttributes should also reference these sensor IDs if needed.
```json
{
    "SemanticVersion": "0.2.0",
    "Information": {
        "DataClassSubType": "DisplayAttributes",
        "Asset": {
            "AssetType": "SensorSystem",
            "Gauid": "XDK:v2:412823",
            "LifeCycleStatus": "Application"
        },
        "Content": {
            "Content01": {
                "Label": "AccelerometerX",
                "Description": "AccelerometerX",
                "Unit": "mg",
                "Format": "000000",
                "DisplayLimitMin": "0",
                "DisplayLimitMax": "0",
                "WarnLimitLo": "-7",
                "WarnLimitHi": "7",
                "ErrorLimitLo": "-9",
                "ErrorLimitHi": "9",
                "Threshold": "0",
                "ThresholdMin": "0",
                "ThersholdMax": "0",
                "InputStep": "0"
            },
            "Content02": {
                "...": "..."
            }
        },
        "TimeStamp": "1970-01-01T00:00:00.00000+00:00",
        "Hash": "0123456789abcdef0123456789abcdef"
    }
}
```

## Notes

Use Cases
- Connection of a specific sensor system
- Which sensors are available?
    - Subscribe to the topics of interest
    - Link to asset management
    - MQTT Broker security
