import { Asset } from "./Asset";

export interface MessageBase{
    SemanticVersion: string;
}

export interface MessageStructure<T> {
    DataClassSubType: string;
    Asset: Asset;
    Content: T;
    TimeStamp: string;
    Hash: string;
}