/** Instance of a deployment capability type */
export interface DeploymentCapability {
    /** Reference / Id to the app representing the deployment capability as a software */
    App: string;
    /** Reference / Id to the deployment capability type asset */
    Type: string;
    /** IDs of the device assets on which deployment is possible */
    Devices: string[];
    /** How to access this deployment capability */
    Access?: ServiceAccess;
}

/** Connectivity information for a service */
export interface ServiceAccess {
    /** IP v4 address if available */
    IPv4?: string;
    /** IP v6 address if available */
    IPv6?: string;
    /** Well known DNS name */
    Hostnames?: string;
    /** Network port */
    Port?: number;
    /** Protocol used if any */
    Protocol?: "http" | "https" | string;
    /** Path part of the URL, in particular for http */
    Path?: string;
}