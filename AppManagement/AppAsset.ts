import { AssetInfo } from "../AssetManagement/AssetInfo";

/** Designates data as being versioned */
export interface Versionable {
    /** Descriptive name of the Asset */
    Name: string;
    /** Version identifier */
    Version: string;
    /** If given restricts the {@link Version} field */
    VersionPattern?: RegExp;
}

/** Managed App Asset */
export class AppAsset extends AssetInfo implements Versionable {
    /** Descriptive name of the App */
    Name: string;
    /** App Version identifier */
    Version: string;
    /** Global Id of the entity that makes the software product */
    ManufacturerId: string;
    /** Unique product number as given by the manufacturer */
    ProductNumber: string;
    /** Optional global Id of the shop that defines the product number */
    ShopId?: string;
    /** Optional product number as given by the Shop */
    ShopProductNumber?: string;
    /** Parts of the app */
    Components: ComponentReference[];
}

/** Component reference in an app */
export interface ComponentReference {
    /** Global Id of the app component */
    ComponentId: string;
    /**
     * Id of the component in the scope of the app,
     * needed if the global component Id occurs more than once in the same app
     */
    LocalId?: string;
}

/** Part of an app */
export class AppComponent extends AssetInfo implements Versionable {
    /** Name of the component */
    Name: string;
    /** Version of the component */
    Version: string;
    /** Component type e.g. "Container" */
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

export const OS_LINUX = "linux";
export const OS_WINDOWS = "windows";
export const OS_MACOS = "macos";

/** 64-bit amd64 aka x86_64 */
export const IS_AMD64 = "amd64";
/** 32-bit x86 */
export const IS_X86 = "x86";
export const IS_ARMV7 = "armv7";
export const IS_ARMV8 = "armv8";

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
    /** Presents a interface for user interaction */
    View = "View",
    /** Represents a programmatic interface */
    API = "API"
}

/** Dependency reference */
export interface Dependency {
    /** Type of dependency e.g. "Artefact" */
    DependencyType: string;
    /** Global Id of the dependency */
    DependencyId: string;
}