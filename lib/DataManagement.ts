import { MessageBase, MessageStructure } from "./BaseStructure";

export interface DataManagement<T> extends MessageBase{
    DataManagement: MessageStructure<T>;
}
