# Zeiss IQS Semantics

There are official and inofficial Zeiss IQS releases for the semantically annotated data structures.

## Differences 0.2.0 vs 1.0.0

Semantics 1.0.0 considered from 22.08.2022

### Base Structure

Base structure for 0.2.0 looked like this:
```json
{
    "SemanticVersion": "0.2.0",
    "{DataType}": {
        "DataClassSubType" :"{Subtype}",
        "Asset": {
            "Gauid": "",
            "AssetType": ""
        },
        "Content": {
            "?": "?",
            "...": "..."
        },
        "TimeStamp": "2023-02-08T15:54:44.325Z",
        "Hash": "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
}
```

- {DataType}: AlarmAndEvent, MeasuringValue, DataManagement, ControlValue, Information
- {Subtype}: specific to {DataType}
- Content: specific to {Subtype}

For 1.0.0:
```json
{
    "semantic": {
        "type": "<string>",
        "version": "<string>",
        "specification": "<string>"
    },
    "security": {
        "publisher": {
            "id": "<string>",
            "name": "<string>",
            "location": "<string>"
        },
        "receiver": // optional
        {
            "id": "<string>",
            "name": "<string>"
        },
        "timestamp": "<string>",
        "signature": "<string>"
    },
    "data": {
        "id": "<string>",
        "timestamp": "<string>",
        "category": "<string>",
        "content": {
            "?": "?",
            "...": "..."
        }
    }
}
```

- semantic.type: e.g. "sensors" or "manufacturingExecutionSystem"
    - Unrelated to {DataType} of 0.2.0
- Analoguous to {DataType} of 0.2.0 there is data.category
    - data.category: "{dataCategory} / {dataSubCategory}"
    - {dataCategory} is similar to {DataType}
    - {dataSubCategory} is similar to DataClassSubType
    - Content is specific to {dataSubCategory}
    - Available categories for {dataCategory}:
        - alarmAndEventData, equipmentData, qualityData, productData, processData
        - "alarmAndEventData" looks similar to "AlarmAndEvent" from 0.2.0

### Measuring Values

In semantics 0.2.0 there was a sensor system value and a mapping stucture. See [Sensors](../Sensors/README.md) and related for details.

In semantics 1.0.0 there is no sensor system. Instead individual sensor elements are described. The content for a sensor value is shown below.
```json
{
    "sensorType": "<string>",
    "value": 1,
    "exponent": 1,
    "unit": "<string>"
}
```

- In 0.2.0 "MeasuringValue" was a data type with several defined data subtypes namely "SensorSystemValue" and "SensorValue"
- In 1.0.0 "measuringValue" was demoted to a {dataSubCategory} of the {dataCategory} "processData"

### Status, states and notifications

In 0.2.0 there was a status AlarmAndEvent message, see [StatusAndNotifications](../StatusAndNotifications/README.md) and related for details. Importantly the content was:
```json
{
    "Status": "{statusType}",
    "Name": "<string>",
    "Text": "<string>"
}
```

- It could be used for machine interpretable and also user friendly messages
    - Status: used to interpret the status of the app, a process or an action
        - {statusType}: isOK, isWarn, isError, isUndefined
    - Name: Short name, useful for the title of messages or event identification
    - Text: human-friendly message or description of the status event

- In 1.0.0 there are different categories of states and there is a distinction between "status" and "state" whereby "status" is no longer used
    - Categories: generalState, lifeCycleState, connectivityState, functionalState
    - Every state category has its own set of possible values
    - E.g. "generalState": isOk, isWarning, isError, undefined
        - Similar to "status" of 0.2.0 but different spelling

Content of "states" in 1.0.0 is e.g.:
```json
{
    "generalState":"isError",
    "lifeCycleState":"running",
    "connectivityState":"connectionPending",
    "functionalState":"notReachable"
}
```

- There is no "Name" and "Text" thus no possibility to differentiate event types nor human-friendly title and description

### MQTT Topics

- For sensors the structure of the topics are similar but with two differences:
    1. The spelling differs
    2. Sensor elements are referenced with the "\<ElementId\>" and not sensor systems before with the {Gauid}

Topic in 0.2.0:
```
Enterprise/WorkCenter/Station/ControlDevice/FieldDevice/{gauid}/MeasuringValue
```

Topic in 1.0.0:
```
enterprise/workCenter/station/controlDevice/fieldDevice/<ElementId>/processData/measuringValue
```

It follows the following structure: \
MQTT Topic ::= \<PreTopic\>/\<ElementId\>/\<PostTopic\> \
\<PreTopic\> ::= enterprise/workCenter/station/controlDevice/fieldDevice \
<PostTopic\> ::= \<dataCategory\>/\<dataSubCategory\>

**Note**: The parts in "enterprise/workCenter/station/controlDevice/fieldDevice" should be replaced with the concrete entities.

### Further

- Completely different aspects are considered in 1.0.0 e.g. topology between assets for asset hierarchies or bill of material, nameplate etc.

## ATR MES V0.9

Taken from an ATR Software presentation from 20.05.2021 serving as draft.

### Base Structure

In the ATR definition the payload is divided in four parts.
```json
{
    "semantic": {
        "type": "MES",
        "version": "0.9.0",
        "specification": "ATR Software"
    },
    "publisher": {
        "name": "",
        "id": "",
        "version": "",
        "location": ""
    },
    "metadata": {
        "timestamp": "",
        "GUID": "",
        "user": {
            "username": "",
            "id": "",
            "type": ""
        },
        "asset": {
            "name": "",
            "id": "",
            "Location": ""
        },
        "datacategory": ""
    },
    "data": {
        "?": "?",
        "...": "..."
    }
}
```

- Zeiss Semantic 1.0.0 has only three parts, "metadata" is missing and partially contained in "data"
- In ATR 0.9 the "data" field contains the actual data payload and could have an arbitrary structure
    - Semantic 1.0 includes metadata beneath "data" and the actual payload goes into the subfield "content"
- Zeiss 1.0 has "security" instead of just "publisher" of ATR 0.9
    - "security" includes "publisher", optionally the "receiver", a signature and timestamp
    - ATR 0.9 includes the timestamp in "metadata"

### Metadata

- Who? (Asset or User)
- GUID: for identification of the process, e.g. in logs
    - Not the asset id
    - In Zeiss Semantics 1.0 there is only the "id" field in "data"

### MQTT Topics

- ATR 0.9 has several definitions of MQTT topic structures:
    - Enterprise/WorkCenter/Station/ControlDevice/FieldDevice/_/{further subdivision}
    - Enterprise/\_/\_/Order/{OrderGUID}/\_/Processing/{StepName}/{EventName}
    - Enterprise/\_/\_/Order/{OrderGUID}/\_/Processing/Step/{StepName}/Event/{EventName}

One of the main differences is that Zeiss 1.0 keeps the part "enterprise/workCenter/station/controlDevice/fieldDevice" static, while in ATR 0.9 the parts are replaced with actual data:
- Zeiss/DEAALCZ27/Styliproduction/Console1/CZ:CZ-3DA:MR01:1/\_/MeasuringValue
- ATR/Kalibrieren/\_/Order/{IdOrder}/\_/Kalibrieren/MoveOut
- Zeiss3DA/Messraum01/\_/{IdMesssystem}/{IdTempSensor}/\_/MasterData