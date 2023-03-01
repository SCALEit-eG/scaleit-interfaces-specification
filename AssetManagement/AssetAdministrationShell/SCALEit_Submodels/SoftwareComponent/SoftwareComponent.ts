/** Part of an app */
export interface SoftwareComponent {
    /** Name of the component */
    Name: string;
    /** Version of the component */
    Version: string;
    /** Component type e.g. "ContainerImage" */
    Type: string;
    /** Identifier of supported OS */
    OS: string[];
    /** Identifier of supported CPU instruction set */
    InstructionSet: string[];
    /** Connection points for interaction with the component */
    Connectivity: AppConnectivity[];
    /** Global Id of the executable artefact */
    ArtefactId: string;
    /** Possible dependencies */
    Dependencies?: Array<Dependency>;
}

/** Dependency reference */
export interface Dependency {
    /** Type of dependency e.g. "Artefact" */
    DependencyType: string;
    /** Global Id of the dependency */
    DependencyId: string;
}

/** Connection point of an app component */
export interface AppConnectivity {
    /** Interface type */
    Type: AppInterfaceType;
    /** Protocol, in particular for API interfaces */
    Protocol?: string;
    /** Port number */
    Port: number;
    /** Optional path, usage depending on protocol */
    Path?: string;
    /** Whether the interface is given by the app or externally required */
    External: boolean;
}

/** Type of access to an app */
export enum AppInterfaceType {
    /** Presents an interface for user interaction */
    View = "View",
    /** Represents a programmatic interface */
    API = "API"
}