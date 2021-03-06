/**
 * Represents an app instance
 * at runtime
 */
export interface AppInstance{
    App: AppConfig;
    Status?: string;
    Images: Array<DockerImage>;
    Containers: Array<DockerContainer>;
}

/**
 * Basic metadata of an app instance
 */
export interface AppConfig{
    Name: string;
    Description?: string;
    Version: string;
    Imported?: Date;
    Frontends?: ConnectionPoint[];
    Middlelayers?: ConnectionPoint[];
    Categories?: string[];
}

/**
 * Used to specify a web connection point
 * on a server
 */
export interface ConnectionPoint{
    Port: number;
    Path?: string;
    Protocol: string;
}

/**
 * Makes the id for the app instance
 * @param app app instance config
 * @returns id as string
 */
 export function makeAppId(app: AppConfig): string{
    return `${app.Name}:${app.Version}`;
}

/**
 * Information about a docker container
 */
export interface DockerContainer{
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
 * Information about a docker image
 */
export interface DockerImage
{
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
export interface ProcessLine{
    Line: string;
    RawLine: string;
    IsStdout: boolean;
    IsStderr: boolean;
}

/**
 * Specific result of a docker-compose up process
 */
export interface DockerComposeUpResult extends ProcessResult{
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

export interface AppContainer{
    Image: string;
    /** exposed ports */
    Ports: number[];
    Status: string;
    ContainerId: string;
    Names: string[];
}

export interface DockerApp{
    Frontend: AppContainer;
    Middlelayer: AppContainer;
}
