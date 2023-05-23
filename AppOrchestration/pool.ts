import { Status } from "../StatusAndNotifications/Status";
import { AppType } from "./app";

export interface PoolApp {
    App: AppType;
    Installed: boolean;
}

export interface Deployment {
    Id: string;
    Server: string;
    App: AppType;
}

export interface PoolServer {
    Id: string;
    Server: string;
    Status: Status;
}