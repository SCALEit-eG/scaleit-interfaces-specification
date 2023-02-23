/**
 * Basic ACL rights
 */
export interface ACLRights {
    Read: boolean;
    Edit: boolean;
    Delete: boolean;
}

export interface CommonACL {
    Assignees?: string[];
    Groups?: string[];
    AssigneeRights: ACLRights;
    GroupRights: ACLRights;
    OtherRights: ACLRights;
}

export interface SubmodelACL extends CommonACL {
    Submodel: string;
}

export interface AASACL extends CommonACL {
    Owners: string[];
}