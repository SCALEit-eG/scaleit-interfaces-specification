import { AssetInfo } from "../AssetManagement/AssetInfo";
import { AlgValue, Signature } from "../Security/certificate";

/** Generic executable software artefact */
export abstract class Artefact extends AssetInfo {
    /** Type of artefact e.g. ContainerImage, JAR, PythonScript, EXE */
    abstract get ArtefactType(): string;
    /** Computed checksums of the the artefacts */
    Fingerprints: Array<AlgValue>;
    /** Platform the artefact runs on */
    Platform: Platform;
    /** Timestamp when the artefact was originally created */
    Created?: Date;
    /** Timestamp when the artefact was last changed */
    LastModified?: Date;
    /** Size of the artefact in bytes */
    Size: number;
    /** Digital signatures that guard the artefact */
    Signatures: Array<Signature>;
    /** Optional resources needed for the artefact to properly run */
    Resources?: Array<ArtefactResource>;
}

/** Platform specification where the artefact can be executed */
export interface Platform {
    /** Optional restrictions of operating systems e.g. linux */
    OS?: string[];
    /** Optional restrictions of CPU instruction sets e.g. amd64 */
    Arch?: string[];
    /** Optional runtime restrictions e.g. containerd, dockerd, java17 */
    Runtime?: string[];
}

/** Artefact resource */
export interface ArtefactResource {
    /** Type of resource */
    Type: ArtefactResourceType;
    /** Unique Id needed for fetching the resource */
    Id: string;
}

/** Specifies the type of resource of an artefact */
export enum ArtefactResourceType {
    /** another artefact */
    Artefact = "Artefact",
    /** single resource file */
    File = "File",
    /** several files and directories */
    Files = "Files"
}

/**
 * Container image as artefact, see also https://docs.docker.com/engine/api/v1.41/#tag/Image/operation/ImageInspect
 */
export class ContainerImageArtefact extends Artefact {
    get ArtefactType(): string {
        return "ContainerImage";
    }
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