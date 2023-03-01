/** Basic attributes common to all assets */
export interface AssetInfo {
    /** Globally unique Id */
    Id: string;
    /**
     * Alternative globally unique Ids useful for different types of Ids e.g. URL vs URN
     * or if managed by different organizations
     */
    AltIds?: Array<string>;
    /** Local Id for easier reference */
    LocalId?: string;
    /** Descriptive name aka label of the Asset */
    Label?: string;
    /** Detailed description, may be encoded and in a format like html or richtext */
    Description?: {
        Text: string;
        /** MIME Type of the description, "text/plain" is default */
        MIMEType: SupportedTextMIMEType;
        /** Encoding of the description, "none" is default */
        Encoding: SupportedEncoding;
    };
    /** Global Id of the parent asset to express a hierarchy used for ACLs */
    BelongsTo?: string;
    /** Unique tags for findability */
    Tags?: Array<string>;
}

/** Supported MIME Type for text data fields */
export enum SupportedTextMIMEType {
    Plain = "text/plain",
    Html = "text/html",
    Markdown = "text/markdown",
    Richtext = "text/richtext"
}

/** Encoding used for specific data */
export enum SupportedEncoding {
    /** text as is */
    None = "none",
    URLEncoding = "url",
    Base64 = "base64",
    /** base 64 safe url encoding */
    Base64Url = "base64url",
    /** usage of html character encodings */
    Html = "html"
}