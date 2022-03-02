import { DataManagement } from "../lib/DataManagement";
import { MeasuringValue } from "../lib/MeasuringValue";

export interface SensorSystemMapping{
    idSensorValue: string;
    SensorType: string;
    Label: string;
    Exponent: string;
    Unit: string;
}

export interface SensorSystemMappingMessage extends DataManagement<SensorSystemMapping>{}

export interface SensorSystemValueMessage extends MeasuringValue<unknown>{}
