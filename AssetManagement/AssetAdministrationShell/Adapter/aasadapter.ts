/**
 * Message from which to adapt asset data
 * to the AAS.
 */
export interface AasAdapterMessage {
    /** Actual values */
    Data: SubmodelLikeData;
    /** Required Metadata */
    Metadata: AasInfo;
}

export interface AasInfo {
    AssetKind: AssetKind;
    SubmodelKind: SubmodelKind;
    /** Id of the template, the Semantic ID */
    SubmodelId: string;
    IdConfig: AasIdConfig;
}

export enum AssetKind {
    Instance = "Instance",
    Type = "Type"
}

export enum SubmodelKind {
    Instance = "Instance",
    Template = "Template"
}

/**
 * Configuration for building the asset, shell and submodel Ids.
 * Each part must fit into a respective URI part.
 */
export interface AasIdConfig {
    /** If given a valid URL protocol otherwise a URN is assumed */
    Protocol?: string;
    /** Required organization entry e.g. scale-it.org or www.company.com */
    Organization: string;
    /** Optional organization structure e.g. development, research, projects, some-project */
    Units?: string[];
    /** Optional namespace e.g. factory-x, station-y */
    PathSegments?: string[];
    /** Name or Id for the entity / asset */
    EntityName: string;
}

export interface SubmodelLikeData {
    [IdShort: string]: SmElement;
}

export interface SmElement {
    get Type(): string;
}

export abstract class SmProperty implements SmElement {
    Value: string | number;
    ValueType: string;

    get Type(): string {
        return "Property";
    }
}

export abstract class SmMultiLang implements SmElement {
    LangStrings: {
        Language: string;
        Text: string;
    }[];

    get Type(): string {
        return "MultiLanguage";
    }
}

export abstract class SmRange implements SmElement {
    Min: number;
    Max: number;
    ValueType: string;

    get Type(): string {
        return "Range";
    }
}

export abstract class SmBlob implements SmElement {
    Value: string;
    MimeType: string;

    get Type(): string {
        return "Blob";
    }
}

export abstract class SmFile extends SmBlob {
    get Type(): string {
        return "File";
    }
}

export abstract class SmCollection implements SmElement {
    Ordered: boolean;
    AllowDuplicates: boolean;
    Elements: {[IdShort: string]: SmElement};

    get Type(): string {
        return "Collection";
    }
}

export abstract class SmReference implements SmElement {
    Value: string;

    get Type(): string {
        return "Reference";
    }
}