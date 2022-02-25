import { MessageBase, MessageStructure } from "./BaseStructure";

export interface AlarmAndEvent<T> extends MessageBase{
  AlarmAndEvent: MessageStructure<T>;
}
