export interface Asset{
    /** Asset ID, Gauid */
    Id: string;
    Label: string;
    /** Alternative IDs */
    AltIds: Array<string>
    AssetType: string;
    AssetKind: AssetKind;
    Owners: Array<string>;
    Groups: Array<string>;
    Assignees: Array<string>;
    Created: Date;
    LastChanged: Date;
    Namespaces: Array<string>;
}

export enum AssetKind{
    "Physical", "Virtual", "Complex"
}

/**
 * Relationship modelling through binary
 * relationships
 */
export interface Relation{
    Asset1: string;
    Asset2: string;
    RelType: string;
    RelData: any;
}

export interface Data{
    /** Asset Id */
    Id: string;
    DataType: string;
    TimeStamp: Date;
    /** asset relative file url e.g. file:///images/icon.svg */
    Binary?: string;
    /** mime type of the binary data */
    MIMEType?: string;
    /** serialized non-binary data */
    Data?: any;
}