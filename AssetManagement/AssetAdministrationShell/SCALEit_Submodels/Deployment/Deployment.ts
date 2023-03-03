/** Deployment of a software component */
export interface Deployment {
    /** Id of the app instance */
    App: string;
    /** Id of the deployment capability */
    Capability: string;
    /** Configuration of the components of the app */
    ComponentsConfiguration: ComponentConfiguration[];
}

/** Deployment configuration of a software component */
export interface ComponentConfiguration {
    /** Id of the software component */
    Component: string;
    /** Network configuration */
    Network: {
        /** Configured ports */
        Ports: {
            /** Optional external port access */
            ExposedPort?: number;
            /** App internal port */
            InternalPort: number;
            /** Optional external host access */
            ExternalHost?: string;
            /** App internal host */
            InternalHost: string;
            Protocol: "tdp" | "udp";
        }[]
    },
    /** Environment variables and values */
    EnvironmentVariables: {[envvar: string]: string};
}