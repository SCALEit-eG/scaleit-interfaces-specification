/**
 * Data for identity assets
 */
export interface Identity {
    /** Type of identity */
    IdentityType: IdentityTypes;
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

/**
 * Supported types of identites for
 * distinguishability
 */
export enum IdentityTypes {
    /** Person entity */
    Person = "Person",
    /**
     * Organisation, usually one person
     * or multiple who takes responsibility
     */
    Organisation = "Organisation",
    /** Groups identites but can be treated as an identity itself */
    Group = "Group",
    /** Non-person entity possibly autonomous */
    Robot = "Robot",
    /** Similar to robot but possibly not autonomous */
    Service = "Service"
}
