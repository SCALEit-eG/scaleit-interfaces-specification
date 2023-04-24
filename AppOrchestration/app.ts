import { AssetInfo } from "../AssetManagement/AssetInfo";

/**
 * Represents an app instance
 * at runtime
 */
export interface AppInstance {
    /** App Metadata */
    App: AppConfig;
    /** Whether an operation is currently being executed on the app */
    Busy: boolean;
    /** Execution Status */
    Status?: AppStatus;
    /** Declared container images of the app */
    Images: Array<ContainerImage>;
    /** Available containers of the app */
    Containers: Array<Container>;
}

/**
 * App execution status
 */
export enum AppStatus {
    Running = "Running",
    Partially_Running = "Partially Running",
    Stopped = "Stopped",
    Unknown = "Unknown"
}

/**
 * Basic metadata of an app instance
 */
export interface AppConfig {
    Id: string;
    Name: string;
    Description?: string;
    Version: string;
    ManufacturerId:  string;
    ProductNumber: string;
    Imported?: Date;
    Frontends?: ConnectionPoint[];
    Middlelayers?: ConnectionPoint[];
    Categories?: string[];
}

/**
 * Used to specify a web connection point
 * on a server
 */
export interface ConnectionPoint {
    Port: number;
    Path?: string;
    Protocol: string;
}

/**
 * Makes the id for the app instance
 * @param app app instance config
 * @returns id as string
 */
export function makeAppId(app: AppConfig): string {
    return `${app.Name}:${app.Version}`;
}

/**
 * Information about a container
 */
export interface Container {
    Name: string;
    Id: string;
    ImageId?: string;
    ImageName: string;
    Status: string;
    Running: boolean;
    Created?: Date;
    Started: string;
    PortMappings: Array<string>;
}

/**
 * Information about a container image
 */
export interface ContainerImage {
    Name: string;
    Id?: string;
    Created?: Date;
    Platform?: string;
    Size?: number;
}

/**
 * Result of an executed process
 */
export interface ProcessResult {
    ExitCode: number;
    Command: string;
    SuccessEstimate?: boolean;
    DurationMs: number;
    RawOutput: string;
    Lines: Array<ProcessLine>;
}

/**
 * Output line of a process
 */
export interface ProcessLine {
    Line: string;
    RawLine: string;
    IsStdout: boolean;
    IsStderr: boolean;
}

/**
 * Specific result of a docker-compose up process
 */
export interface DockerComposeUpResult extends ProcessResult {
    RunningContainers: string[];
    PulledImages: string[];
}


/**
 * Simple structure to exchange a value
 * with a label via JSON
 */
export interface NameValue<T> {
    Name: string;
    Value: T;
}

/**
 * Holds all information about a single step
 * of progress.
 */
export interface TransferProgress {
    /**
     * Indicates the type of progress made.
     * 
     * Important step types:
     * - ANNOUNCEMENT
     * - DATA_TRANSFER
     * - PROCESS_PROGRESS
     * - INTERNAL
     * - UNKNOWN
     * - STATUS
     * - CANCEL
     */
    StepType: string;
    Success: boolean;
    Required: boolean;
    Subject?: string;
    ProcessResult?: ProcessResult;
    ProcessLine?: ProcessLine;
    Message: string;
    Details?: string;
}

export interface AppContainer {
    Image: string;
    /** exposed ports */
    Ports: number[];
    Status: string;
    ContainerId: string;
    Names: string[];
}

export interface DockerApp {
    Frontend: AppContainer;
    Middlelayer: AppContainer;
}

/**
 * Collection of instances of deployment capabilities
 */
export class OrchestrationPlatform extends AssetInfo {
    /** Ids of the deployment capabilities available on the platform */
    DeploymentCapabilities: string[];
}

/**
 * Basic deployment information for a software asset instance, more
 * information must be given for a particular deployment type in
 * a separate data model
 */
export class Deployment extends AssetInfo {
    /** Id of the orchestration platform instance */
    OrchestrationPlatformId: string;
    /** Id of the deployment capability chosen on the platform */
    DeploymentCapabilityId: string;
    /** Id of the App type */
    AppId: string;
    /** Identifying number / Id for the deployed instance */
    InstanceId: string;
}

/**
 * Single device or device cluster on which to
 * deploy software with a particular deployment
 * capability type
 */
export class DeploymentCapability extends AssetInfo {
    /** Id of the device or multiple if cluster */
    DeviceIds: string[];
    /** Id of the DC type */
    DeploymentCapabilityTypeId: string;
}

/**
 * Base class for specific deployment capability types
 */
export abstract class DeploymentCapabilityType extends AssetInfo {
    /** Designation of the type */
    Type: string;
}
