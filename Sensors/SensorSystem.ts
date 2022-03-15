import { DataManagement } from "../lib/DataManagement";
import { MeasuringValue } from "../lib/MeasuringValue";

/** single sensor */
export interface SensorValue{
    SensorType: string;
    Label: string;
    Exponent: string;
    Unit: string;
}

/** mapping for sensor systems */
export interface SensorSystemMapping extends SensorValue{
    /** ID of the sensor element */
    idSensorValue: string;
}

export interface SensorSystemMappingMessage extends DataManagement<SensorSystemMapping>{}

export interface SensorSystemValueMessage extends MeasuringValue<unknown>{}

export interface SensorValueMessage extends MeasuringValue<SensorValue>{}
