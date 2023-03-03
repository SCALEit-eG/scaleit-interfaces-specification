/**
 * Basic ACL rights
 */
export interface ACLRights {
    /** Allowed to read / access data? */
    Read: boolean;
    /** Allowed to edit / write data? */
    Edit: boolean;
    /** Allowed to delete the entity? */
    Delete: boolean;
}

/**
 * Common entries of both AAS ACL and submodel ACL
 */
export interface CommonACL {
    /** IDs of identities assigned to the shell / submodel */
    Assignees?: string[];
    /** IDs of group identities the shell or submodel is in */
    Groups?: string[];
    /** Rights of assigned identites */
    AssigneeRights: ACLRights;
    /** Rights of the groups i.e. the identities in those groups */
    GroupRights: ACLRights;
    /** Rights for anonymous */
    OtherRights: ACLRights;
}

/**
 * Submodel specific properties
 */
export interface SubmodelACL extends CommonACL {
    /** Semantic Id of the submodel */
    Submodel: string;
}

/**
 * Shell specific properties
 */
export interface AASACL extends CommonACL {
    /** IDs of identities that own the shell */
    Owners: string[];
    /** ACL definitions of the submodels contained in the shell */
    Submodels: SubmodelACL[];
}