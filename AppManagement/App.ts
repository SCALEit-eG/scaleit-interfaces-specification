import { StatusLabel } from "../StatusAndNotifications/Status";

/** App view used externally */
export interface App {
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
    /** Middlelayer server URL */
    MiddlelayerUrl: string;
    /** frontend URL if available */
    FrontendUrl?: string;
}

/** Information to send from an app to register itself */
export interface AppRegistration {
    /** App name */
    Name: string;
    /** Version */
    Version: string;
    /** URL of the Middlelayer server
     * must be unique
     */
    MiddlelayerUrl: string;
    /** frontend URL if available */
    FrontendUrl?: string;
}

/** entry for an entire app list */
export interface AppListItem {
    /** instance ID for running app */
    ID: string;
    /** App name */
    Name: string;
    /** Version */
    Version: string;
}

/** for editing an app */
export interface AppEdit {
    /** App name */
    Name: string;
    /** Version */
    Version: string;
    /** textual description */
    Description?: string;
    /** URL to icon */
    Icon?: string;
    /** Middlelayer server URL */
    MiddlelayerUrl: string;
    /** frontend URL if available */
    FrontendUrl?: string;
}
