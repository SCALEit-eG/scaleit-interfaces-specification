/** Asset signifies any tangible or non tangible thing of value */
export interface Asset{
    /** Asset ID, Gauid, should be a URI */
    Id: string;
    /** Display name of the asset */
    Label: string;
    /** Alternative IDs */
    AltIds: Array<string>
    /** Registered asset type */
    AssetType: string;
    /** Asset kind */
    AssetKind: AssetKind;
    /** Owners who may also delete the asset or authorize assignees and change permissions */
    Owners: Array<string>;
    /** Groups whose members are authorized with group permissions */
    Groups: Array<string>;
    /** Assigned identities with assignee permissions */
    Assignees: Array<string>;
    /** Timestamp when the asset was created */
    Created: Date;
    /** Timestamp when the asset metadata was last changed */
    LastChanged: Date;
    /** Reserved namespaces to disable identifier prefixes for other asset hierarchies */
    Namespaces: Array<string>;
    /** Permission policies on the asset */
    Permissions: AssetPermissions;
}

/** Permission policies on an asset */
export interface AssetPermissions{
    /** Permissions of group members of assigned groups */
    Group: ACL;
    /** Permissions of assigned identities*/
    Assignee: ACL;
    /** Permissions of all identities including anonymous;
     * disables the other policies if stronger
     */
    Other: ACL;
}

/** Access control lists or permission policy respectively for an asset */
// TODO
export interface ACL{
    ReadMetadata: boolean;
    ChangeMetadata: boolean;
    ReadData: boolean;
    PostData: boolean;
    ChangeOrDeleteData: boolean;
    /** only for asset type assets */
    ConfigureDataTypes: boolean;
}

export interface Identity{
    /** Unique identifier for a person or non-person entity */
    Id: string;
    /** Permissions for global operations */
    Permissions: GlobalPermissions;
}

// TODO
export interface GlobalPermissions{
    AssignNamespaces: boolean;
    RegisterAssetTypes: boolean;
    GloballyAssignOwners: boolean;
    RegisterDataTypes: boolean;
}

export enum AssetKind{
    "Physical", "Virtual", "Complex"
}

/** AssetType registering valid asset types which itself is managed as a special asset */
export interface AssetType{
    /** Unique URI for the asset type */
    Id: string;
    /** Display name for the asset type */
    Label: string;
    /** restricts data types to the given ones if AllowsAll is false; URIs of the data types */
    DataTypes: string[];
    /** allows all data types */
    AllowsAll: boolean;
}

/** Specific data item belonging to an asset */
export interface AssetData{
    /** Automatically generated ID */
    Id: string;
    /** Asset Id */
    AssetId: string;
    /** Datatype ID */
    DataType: string;
    /** version identifier or null for datatypes without versioning */
    Version: string;
    /** Timestamp when the data was posted */
    TimeStamp: Date;
    /** Timestamp when the data was last edited */
    LastModified: Date;
    /** asset relative file url e.g. file:///images/icon.svg */
    Binary?: string;
    /** mime type of the binary data */
    MIMEType?: string;
    /** serialized non-binary data */
    Data?: any;
}

/** Partial asset data intended for posting new data */
export interface AssetDataPost{
    DataType: string;
    Version: string;
    Binary?: string;
    MIMEType?: string;
    Data?: any;
}


/** Registered data type that is managed like a special asset */
export interface AssetDataType{
    /** Datatype Id for the datatype, should be a URI */
    Id: string;
    /** Display name for the datatype */
    Label: string;
    /** if false then only one version is allowed with an empty version identifier */
    AllowVersioning: boolean;
    /** Version Id of the default version to use or null to use the latest */
    DefaultVersion: string;
    /** Available versions */
    Versions: Array<AssetDataTypeVersion>;
    /** Optional regular expression to restrict allowed version identifiers */
    VersioningPattern: string;
}

/** Specific version of a particular data type */
export interface AssetDataTypeVersion{
    /** Version identifier e.g. using semantic versioning */
    VersionId: string;
    /** Release / publish date of the version */
    Release: Date;
    /** Display name of the version / release */
    Label: string;
    /** serialized and plain base64 encoded JSON schema to verify published data against */
    Schema: string;
}

/**
 * Relationship modelling through binary
 * relationships
 */
// TODO
export interface AssetRelation {
    /** Id of "from" or "first" asset */
    Asset1: string;
    /** Id of "to" or "second" asset */
    Asset2: string;
    /** Id / name of the relationship */
    RelType: string;
    /** data directly associated with the relationship */
    RelData: any;
    /** true to indicate that there is no "from" or "to" */
    Bidirectional: boolean;
}