import { Platform } from "../Artefact/Artefact";
import { Dependency } from "../SoftwareComponent/SoftwareComponent";

/** Core information about a deployment capability */
export interface DeploymentCapabilityType {
    /** On which computer platform it runs */
    Compatibility: Platform;
    /** Identifiers of artefact types which can be deployed */
    ArtefactTypes: string[];
    /** Deployment on a single device or cluster */
    MultiNode: boolean;
    /** Dependencies needed to install the deployment capability */
    Dependencies: Array<Dependency>;
}