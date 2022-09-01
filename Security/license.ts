export interface License{
    /** whether the license can be used */
    Valid: boolean;
    /** information from the x509 certificate */
    Certificate: CertificateData,
    /** app specific license data */
    License: any;
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