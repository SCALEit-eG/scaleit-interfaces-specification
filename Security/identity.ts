import { AssetInfo } from "../AssetManagement/AssetInfo";

/**
 * Data for identity assets
 */
export abstract class Identity extends AssetInfo {
    /** Type of identity */
    abstract get IdentityType(): string;
    Name?: string;
    /** role identifiers */
    Roles?: string[];
    /** Only one allowed */
    Email?: string;
    Address?: Address;
    /** IDs of groups the identity is assigned to */
    Groups?: string[];
}

export interface Address {
    PostalCode?: string;
    City?: string;
    State?: string;
    Country?: string;
    Location?: string;
    Building?: string;
    Room?: string;
}

/** Person entity */
export class PersonIdentity extends Identity {
    get IdentityType(): string {
        return "Person";
    }
}

/**
 * Organisation, usually one person
 * or multiple who takes responsibility
 */
export class OrganisationIdentity extends Identity {
    get IdentityType(): string {
        return "Organisation";
    }
}

/** Groups identites but can be treated as an identity itself */
export class GroupIdentity extends Identity {
    get IdentityType(): string {
        return "Group";
    }
}

/** Non-person entity possibly autonomous */
export class RobotIdentity extends Identity {
    get IdentityType(): string {
        return "Robot";
    }
}

/** Similar to robot but possibly not autonomous */
export class ServiceIdentity extends Identity {
    get IdentityType(): string {
        return "Service";
    }
}