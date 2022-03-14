# Sensors

## Sensor system

A sensor system needs a sensor system mapping defining the sensor elements and sensor system values defining the measuring values. The latter uses the IDs defined by the former. Additional structures like display attributes make also use of the defined sensor IDs.

## MQTT

base topic {base} := Enterprise/WorkCenter/Station/ControlDevice/FieldDevice

### Publish {base}/{gauid}/AlarmAndEvent
AlarmAndEvent messages

### Publish {base}/{gauid}/AlarmAndEvent/Status
status of an asset

### Publish {base}/{gauid}/MeasuringValue
measuring values of the sensor system

### Publish {base}/{gauid}/Information

### Publish {base}/{gauid}/Information/{type}
metadata of an asset

### Publish {base}/{gauid}/DataManagement/SensorSystemMapping
mapping data structure for a sensor system

## REST

### GET /api/{version}/metadata
list of available metadata types

### GET /api/{version}/metadata/{type}
retrieve the metadata message for the given type

### GET /api/{version}/MeasuringValues
the current (last) measuring values
