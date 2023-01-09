import { SupportedEncoding, SupportedTextMIMEType } from "./Assets";

/** Basic attributes common to all assets */
export abstract class AssetInfo {
    /** Globally unique Id */
    Id: string;
    /** Local Id for easier reference */
    LocalId?: string;
    /** Descriptive name aka label of the Asset */
    Label?: string;
    /** Detailed description, may be encoded and in a format like html or richtext */
    Description?: string;
    /** MIME Type of the description, "text/plain" is default */
    DescriptionMIMEType: SupportedTextMIMEType;
    /** Encoding of the description, "none" is default */
    DescriptionEncoding: SupportedEncoding;
    /** Global Id of the parent asset to express a hierarchy used for ACLs */
    BelongsTo?: string;
    /** Unique tags for findability */
    Tags?: Array<string>;
}