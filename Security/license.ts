import { SysNicInfo } from "../ResourceManagement/SysInfo";

/**
 * Holds basic license information intended for
 * an overview
 */
export interface License{
    /** whether the license can be used */
    Valid: boolean;
    /** information from the x509 certificate */
    Certificate: CertificateData,
}

/**
 * Provides the actual details that a license contains
 * and should only be accessed authorized
 */
export interface LicenseDetails extends License{
    /**
     * needed to differentiate between licenses for the same order;
     * should be incremented by one for each new license for the same
     * order
     */
    LicenseNumber: number;
    /** information that assigns this license to an order */
    Order: {
        /** unique order number */
        OrderNumber: string;
        /** date of the order */
        OrderDate: Date;
    };
    /** data that binds the license to a device */
    Device: {
        /** binding using a network adapter */
        NIC?: SysNicInfo;
        /** binding using TPM */
        TPM?: {
            /** fingerprint of the secretly stored certificate */
            Fingerprint: string;
            /** hash of the encrypted fingerprint */
            HashEncryptedFingerprint: string;
        }
    };
    /** data that binds the license to an app */
    App: {
        /** identifying part of the app config */
        Config: {
            Name: string;
            Version: string;
            ProductNumber: string;
        },
        /** hashes / Ids of the container images that are used */
        Images: string[];
    };
    /** app specific license data */
    LicenseTerms: {[key: string]: any};
}

export interface CertificateData{
    /** SHA1 fingerprint for identification of licenses */
    Fingerprint: string;
    /** SHA256 fingerprint for additional info */
    Fingerprint2: string;
    /** starting date of license's validity */
    ValidFrom: Date;
    /** expiration */
    ValidUntil: Date;
    /** CommonName (CN) of the certificate, usually order number */
    Subject: string;
    /** CN of the CA */
    Issuer: string;
}

export interface LicenseKey{
    /** key for authorized access */
    Key: string;
    /** App ID for which the key is valid */
    AppId: string;
}