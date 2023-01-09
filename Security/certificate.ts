/** Information about a digital certificate */
export interface CertificateData {
    /** SHA1 fingerprint for identification of licenses */
    Fingerprint: string;
    /** SHA256 fingerprint for additional info */
    Fingerprint2: string;
    /** starting date of license's validity */
    ValidFrom: Date;
    /** expiration */
    ValidUntil: Date;
    /** DistinguishedName (DN) of the certificate */
    Subject: string;
    /** DN of the CA */
    Issuer: string;
}

/** Algorithm / Value pair used for checksums */
export interface AlgValue {
    /** Algorithm e.g. SHA1, SHA256, MD5 */
    Algorithm: string;
    /** Digest / checksum */
    Value: string;
}

/** Digital signature with metadata */
export interface Signature {
    /** Global Id of the issuer certificate */
    Issuer: string;
    /** Type of signature */
    SignatureType: SignatureType;
    /** Signature value */
    Value: string;
    /** Encoding of the value e.g. JWT for JWS signature */
    Encoding: string;
}

/** Supported signature types */
export enum SignatureType {
    JWS = "JWS",
    XMLDSig = "XMLDSig"
}