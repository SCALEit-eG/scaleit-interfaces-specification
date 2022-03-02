import { MessageBase, MessageStructure } from "./BaseStructure";

export interface MeasuringValue<T> extends MessageBase{
    MeasuringValue: MessageStructure<T>;
}
