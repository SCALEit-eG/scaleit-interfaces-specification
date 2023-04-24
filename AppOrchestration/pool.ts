import { Status } from "../StatusAndNotifications/Status";
import { AppConfig } from "./app";

export interface PoolApp {
    App: AppConfig;
    Installed: boolean;
}

export interface Deployment {
    Id: string;
    Server: string;
    App: AppConfig;
}

export interface PoolServer {
    Id: string;
    Server: string;
    Status: Status;
}