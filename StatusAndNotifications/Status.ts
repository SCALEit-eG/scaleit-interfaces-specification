import { AlarmAndEvent } from "../lib/AlarmAndEvent";

export interface Status{
    /** caution: breaking change */
    Status: string | "isOK" | "isWarn" | "isError" | "isUndefined";
    Name: string;
    Text: string;
}

export interface StatusMessage extends AlarmAndEvent<Status>{}
