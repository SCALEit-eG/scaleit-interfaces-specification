import { AlarmAndEvent } from "../lib/AlarmAndEvent";

export enum StatusLabel{
    "isOK",
    "isWarn",
    "isError",
    "isUndefined"
}

export interface Status{
    /** caution: breaking change */
    Status: string | StatusLabel;
    Name: string;
    Text: string;
}

export interface StatusMessage extends AlarmAndEvent<Status>{}
