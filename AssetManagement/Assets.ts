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
    AltIds: Array<string>;
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
    /** read / view the metadata of an asset */
    ReadMetadata: boolean;
    /** change the metadata of an asset */
    ChangeMetadata: boolean;
    /** view data related to the asset */
    ReadData: boolean;
    /** add new data to the asset */
    AddData: boolean;
    /** change or remove data elements of the asset */
    ChangeOrDeleteData: boolean;
    /** Create, change and delete asset types locally */
    ManageAssetTypes: boolean;
    /** Right to assign ownership locally */
    AssignOwners: boolean;
    /** Create, change and delete data types locally */
    ManageDataTypes: boolean;
    /** Create, change and delete asset types locally */
    ManageRelationTypes: boolean;
}

export interface Identity{
    /** Unique identifier for a person or non-person entity */
    Id: string;
    /** Descriptive information */
    Info: BasicInfo;
    /** Permissions for global operations */
    Permissions: GlobalPermissions;
}

/** permissions that apply independently from assets */
export interface GlobalPermissions{
    /** Namespaces can only be assigned by authorized identities */
    AssignNamespaces: boolean;
    /** Create, change and delete asset types globally */
    ManageAssetTypes: boolean;
    /** Right to assign ownership of root assets */
    GloballyAssignOwners: boolean;
    /** Create, change and delete data types globally */
    ManageDataTypes: boolean;
    /** Create, change and delete asset types globally */
    ManageRelationTypes: boolean;
}

export enum AssetKind{
    /** tangible assets */
    Physical = "Physical",
    /** non-tangible assets */
    Virtual = "Virtual",
    /** combined systems that may have tangible and non-tangible components */
    Complex = "Complex",
    /** declare the asset to designate an asset type */
    AssetType = "Asset Type",
    /** declare the asset to be a data type */
    AssetDataType = "Asset Data Type",
    /** declare the asset to be a relationship type */
    AssetRelationType = "Asset Relationship Type",
    /** declare the asset to be a defined event */
    AssetEvent = "Asset Event"
}

/** AssetType registering valid asset types which itself is managed as a special asset */
export interface AssetType extends Asset{
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

/**
 * Event, treated as special asset
 * 
 * Every raised event must reference an asset. 
 * 
 * Available template variables:
 * - {EventId}: Id of the event asset
 * - {AssetId}: Id of the referenced asset 
 * - {DataTypeId}: Id of the data type, only if configured
 * - {VersionId}: Id of the version, only if configured
 * 
 * All Ids are URL encoded
 */
export interface AssetEvent extends Asset {
    /** If set restricts the data of the event to the referenced data type */
    DataId?: string;
    /** Only in combination with DataId, restricts to a specific version */
    Version?: string;
    /** Configured channels on which to broadcast the event */
    EventChannels: EventChannel[];
    /** Direct subscribers to the event */
    Subscribers: Webhook[];
}

/**
 * Special event that is raised automatically when data of a specific asset changes.
 * It adds the following template variables:
 * - {DataEventName}: name of the data event
 * 
 * Template variables may be used in some fields like the path
 * entry of the event channels for dynamic configuration.
 */
export interface AssetDataEvent extends Asset {
    /**
     * Asset for which to raise events when data changes. The
     * data can be restricted with DataId and Version.
     */
    AssetId: string;
    /** Value for new data event */
    UseNewData: string;
    /** Value for data changed event */
    UseChangedData: string;
    /** Value for data removed event */
    UseRemovedData: string;
}

export interface EventChannel {
    /** Path part in the URI of the event channel */
    Path: string;
    /** How the path is treated */
    PathKind: PathKind;

    /** Abstract method for strategy pattern */
    broadcast(): void;
}

export enum PathKind {
    /** doesn't resolve template variables */
    Literal = "literal",
    /** looks for template variables and resolves them */
    Template = "template"
}

/**
 * SSE uses a system wide configured prefix in order not to
 * clash with defined HTTP and SSE endpoints 
 */
export interface SSEEventChannel extends EventChannel {}

/**
 * It also uses a prefix for the same purpose as SSE
 */
export interface WebsocketsEventChannel extends EventChannel { }

/**
 * MQTT topics may be chosen freely and because another
 * system is referenced the access credentials must be given
 * accordingly.
 */
export interface MQTTEventChannel extends EventChannel {
    Protocol: string;
    Host: string;
    Port: number;
    /** Template variables possible */
    Username: string;
    Password: string;
    /** Template variables possible */
    ClientId: string;
    /** 0, 1 or 2, default=1 */
    QoS: number;
    /** in seconds, 0 to disable, default=60 */
    Keepalive: number;
    Retain: boolean;
    /** Asset ID + Data ID for the CA file */
    CAFile: string;
    /** Asset ID + Data ID for the client certificate file */
    ClientCertFile: string;
    /** Asset ID + Data ID for the client certificate private key file */
    ClientKeyFile: string;
}

export interface Webhook {}