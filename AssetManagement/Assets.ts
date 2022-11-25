export interface BasicInfo{
    /** Name or title */
    Label?: string;
    /** Tags for finding purposes */
    Tags?: Array<string>;
    /** Detailed description, possibly of complex text type and decoded */
    Description?: string;
    /** MIME type of the description or text/plain as default */
    MIMEType?: SupportedTextMIMEType;
    /** Encoding used for the description or none as default */
    Encoding?: SupportedEncoding;
}

/** Supported MIME Type for text data fields */
export enum SupportedTextMIMEType{
    Plain = "text/plain",
    Html = "text/html",
    Markdown = "text/markdown",
    Richtext = "text/richtext"
}

/** Encoding used for specific data */
export enum SupportedEncoding{
    /** text as is */
    None = "none",
    URLEncoding = "url",
    Base64 = "base64",
    /** base 64 safe url encoding */
    Base64Url = "base64url",
    /** usage of html character encodings */
    Html = "html"
}

/** Asset signifies any tangible or non tangible thing of value */
export interface Asset{
    /** Asset ID, Gauid, should be a URI */
    Id: string;
    /** Descriptive info of the asset */
    Info: BasicInfo;
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
    /** Predefined asset as immutable marker by the asset management system */
    Predefined: boolean;
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

/** permissions that apply independently from assets */
export interface GlobalPermissions{
    AssignNamespaces: boolean;
    ManageAssetTypes: boolean;
    GloballyAssignOwners: boolean;
    ManageDataTypes: boolean;
    ManageRelationTypes: boolean;
}

export enum AssetKind{
    Physical = "Physical",
    Virtual = "Virtual",
    Complex = "Complex",
    /** declare the asset to be a data type */
    AssetDataType = "Asset Data Type",
    /** declare the asset to be a relationship type */
    AssetRelationType = "Asset Relationship Type"
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
export interface AssetDataType extends Asset {
    /** if false then only one version is allowed with an empty version identifier */
    AllowVersioning: boolean;
    /** Version Id of the default version to use or null to use the latest */
    DefaultVersion?: string;
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

/** data to change a data type */
export interface AssetDataTypeChange{
    Info: BasicInfo;
    /** enables or disables versioning */
    AllowVersioning: boolean;
    /** if set must already exist */
    DefaultVersion: string;
    /** may disable existing versions */
    VersioningPattern: string;
}

/** data to add a data type */
export interface AssetDataTypeAdd{
    Info: BasicInfo;
    AllowVersioning: boolean;
    VersioningPattern: string;
    /** first version for the datatype */
    Version: AssetDataTypeVersion;
    /** make first version the default version */
    SetDefault: boolean;
}

/**
 * Relationship modelling through binary
 * relationships
 */
export interface AssetRelation {
    /** Id of "from" or "first" asset */
    Asset1: string;
    /** Id of "to" or "second" asset */
    Asset2: string;
    /** Id / name of the relationship */
    RelType: string;
    /** Id for the data directly associated with the relationship */
    RelData?: string;
    /** true to indicate that there is no "from" or "to" */
    Bidirectional: boolean;
}

export interface AssetRelationAdd {
    /** Id of the other asset that acts as second or "to" asset */
    ToAsset: string;
    /** Id / name of the relationship */
    RelType: string;
    /** Id for the data directly associated with the relationship */
    RelData?: string;
    /** true to indicate that there is no "from" or "to" */
    Bidirectional: boolean;
}

/** Relationship type, also managed as a special asset */
export interface AssetRelationType extends Asset {
    /** How often a particular asset can be the source of this type of relationship, -1 for infinite */
    AllowedFrom: number;
    /** How often a particular asset can be the target of this type of relationship, -1 for infinite */
    AllowedTo: number;
}