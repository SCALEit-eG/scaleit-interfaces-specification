import { Asset } from "./Asset";

export interface AlarmAndEvent<T> {
    SemanticVersion: string;
    AlarmAndEvent: AlarmAndEventStructure<T>;
}

export interface AlarmAndEventStructure<T>{
  DataClassSubType: string;
  Asset: Asset;
  Content: T;
  TimeStamp: string;
  Hash: string;
}
