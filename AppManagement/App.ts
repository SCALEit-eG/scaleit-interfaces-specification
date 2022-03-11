import { StatusLabel } from "../StatusAndNotifications/Status";

export interface App{
    /** instance ID for running app */
    ID: string;
    /** App name */
    Name: string;
    /** Version */
    Version: string;
    /** textual description */
    Description?: string;
    /** URL to icon */
    Icon?: string;
    /** categories / tags for groupings */
    Labels?: string[];
    /** status from AlarmAndEvent/Status */
    Status?: string | StatusLabel;
}

export interface AppRegistration{
    /** URL of the Middlelayer server */
    Url: string;
}
