/**
 * Container image as artefact, see also https://docs.docker.com/engine/api/v1.41/#tag/Image/operation/ImageInspect
 */
 export interface ContainerImageArtefact {
    /** Content-addressable digest */
    ImageId: string;
    /** List of names/tags referencing the image */
    RepoTags?: Array<string>;
    /** Content-addressable digests of image manifests the image is referenced from */
    RepoDigests?: Array<string>;
    /** ID of the parent image if existing */
    ParentImage?: string;
    /** ID of the container the image was created from if applicable */
    FromContainer?: string;
    /** Hardware CPU architecture the image runs on e.g. "arm" */
    Architecture?: string;
    /** CPU architecture variant e.g. "v7" in combination with Architecture="arm" */
    Variant?: string;
    /** Operating System the image runs on e.g. "linux" */
    Os?: string;
    /** OS variant, in particular for Windows */
    OsVersion?: string;
    /** Active user inside the container */
    User?: string;
    /** Exposed ports of the image */
    ExposedPorts?: Array<ContainerImagePort>;
    /** Environment variables set in the image as key-value pairs */
    Env?: {[envvar: string]: string};
    /** Command to run */
    Cmd?: string[];
    /** Working directory of the container where to run commands in */
    WorkingDir?: string;
    /** Entry point for the container */
    Entrypoint?: string[];
    /** Custom defined key-value metadata */
    Labels?: {[label: string]: string};
    /** Signal to stop the container */
    StopSignal?: string;
    /** Directories inside the container that act as volumes */
    Volumes?: string[];
    /** Test to check if the container is still working */
    Healthcheck?: ContainerHealthcheck;
}

/** Configured port of a container image */
export interface ContainerImagePort {
    Port: number;
    Protocol: "tcp" | "udp";
}

/** Healthcheck information about a container */
export interface ContainerHealthcheck {
    Test: Array<string>;
    Interval: number;
    Timeout: number;
    Retries: number;
    StartPeriod: number;
}