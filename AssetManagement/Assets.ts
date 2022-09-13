export interface Asset{
    Gauid: string;
    Label: string;
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

export interface Relation{
    Asset1: string;
    Asset2: string;
    RelType: string;
}

export interface Data{
    Gauid: string;
    DataType: string;
    Data: any;
}