import { LicenseDetails } from "../Security/license";

/** Data needed to create a new license */
export interface LicenseRequest {
    Config: CertConfig;
    LicenseInfo: LicenseDetails;
    Days?: number;
    /** if given takes precedence over days */
    Expires?: Date;
}

/** Configuration to create a digital certificate */
export interface CertConfig {
    CommonName: string;
    Country: string;
    Org: string;
    OrgUnit: string;
    Email: string;
    State: string;
    Locality: string;
}

/** Indicates license validity */
export interface ValidationResult {
    /** Whether license is valid */
    Valid: boolean;
    /** reason if license invalid */
    InvalidReason?: string;
    /** extracted license information */
    Payload?: string;
}