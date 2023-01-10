import { AssetInfo } from "../AssetManagement/AssetInfo";

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

/**
 * DN: Distinguished Name of an entity within a
 * digital certificate
 * - see https://www.ibm.com/docs/en/ibm-mq/7.5?topic=certificates-distinguished-names
 * - see https://www.cryptosys.net/pki/manpki/pki_distnames.html
 */
export interface DistinguishedName {
    /** CN: Common name e.g. the FQDN, IP-Address or an identity name like a person's name */
    CommonName: string;
    /** C: Two letter country code */
    Country?: string;
    /** O: Organization */
    Org?: string;
    /** OU: Organization subunit */
    OrgUnit?: string | string[];
    /** MAIL: Possibly an info email address or for a person if identity certificate */
    Email?: string;
    /** ST: Province or region */
    State?: string;
    /** L: City, local place */
    Locality?: string;
    /** DC: domain component */
    Domain?: string | string[];
    /** UID: user identifier */
    UserId?: string;
    /** PC: postal code / zip code */
    PostalCode?: string;
    /** SERIALNUMBER: certificate serial number */
    SerialNo?: string;
    /** T / TITLE: title */
    Title?: string;
    /** STREET: Street name, first line of address */
    Street?: string;
    /** UNSTRUCTUREDNAME: host name */
    UnstructuredName?: string;
    /** UNSTRUCTUREDNAME: IP address */
    StructuredName?: string;
    /** DNQ: distinguished name qualifier */
    DNQ?: string;
    /** pseudonym */
    Pseudonym?: string;
    /** SN: surname */
    Surname?: string;
    /** GN / G: given name */
    GivenName?: string;
    /** initials: initials */
    Initials?: string;
}

/**
 * Certificate information intended to be managed as an asset
 * - See x509 certificate specification https://www.rfc-editor.org/rfc/rfc5280#
 */
export class CertificateAsset extends AssetInfo implements CertificateData {
    // BEGIN fields from certificate data
    Fingerprint: string;
    Fingerprint2: string;
    ValidFrom: Date;
    ValidUntil: Date;
    Subject: string; // DN as complete string
    Issuer: string; // DN as complete string
    // END fields from certificate data
    /** Same as {@link Fingerprint} */
    FingerprintSHA1?: string;
    /** Same as {@link Fingerprint2} */
    FingerprintSHA256?: string;
    /** Parsed DN, possibly only a subset */
    SubjectDN: DistinguishedName;
    /** Analogous to  {@link SubjectDN} */
    IssuerDN: DistinguishedName;
    /** Certificate type version */
    Version?: string;
    /** See https://www.rfc-editor.org/rfc/rfc5280#section-4.1.2.2 */
    SerialNumber?: number;
    /** Algorithm identifier for the algorithm used by the CA to sign the certificate */
    SignatureAlgorithm?: string;
    /** Signature value */
    Signature?: string;
    /** Public key of the subject, value should be base64 encoded */
    PublicKey?: AlgValue;
    /** See https://www.rfc-editor.org/rfc/rfc5280#section-4.2 */
    Extensions?: CertificateExtensions;
}

/** Extensions for a x509 V3 certificate */
export interface CertificateExtensions {
    /** Means to identify the public key corresponding to the private key used to sign a certificate */
    AuthorityKeyIdentifier?: CertificateExtension<AuthorityKeyIdentifier>;
    /** Means to identify certificates containing a particular public key */
    SubjectKeyIdentifier?: CertificateExtension<string>;
    /** Purpose of the contained key */
    KeyUsage?: CertificateExtension<Array<KeyUsageType>>;
    /** ? */
    CertificatePolicies?: CertificateExtension<any[]>;
    /** ? */
    PolicyMappings?: CertificateExtension<any[]>;
    /** Subject alternative name: Allows identities to be bound to the subject */
    SAN?: CertificateExtension<Array<[AlternativeNameType, string]>>;
    /** Issuer alternative name: analogous to {@link SAN}  */
    IAN?: CertificateExtension<Array<[AlternativeNameType, string]>>;
    /** Identification attributes of the subject */
    SubjectDirectoryAttributes?: CertificateExtension<any>;
    /** Decides about CA and its maximum allowed validation path */
    BasicConstraints?: CertificateExtension<BasicConstraints>;
    /** Only for CA certificates, indicates a namespace for subsequent subject certificates */
    NameConstraints?: CertificateExtension<NameConstraints>;
    /** Constraints path validation */
    PolicyConstraints?: CertificateExtension<PolicyConstraints>;
    /** Further purposes of the public key, only for end entity certificates */
    ExtendedKeyUsage?: CertificateExtension<Array<ExtendedKeyUsageType>>;
    /** ? */
    CRLDistributionPoints?: CertificateExtension<any[]>;
    // further extensions as defined...
}

export interface CertificateExtension<T> {
    /** Critical or non-critical extension */
    Critical: boolean;
    /** Specific extension */
    Extension: T;
}

/** See https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.1 */
export interface AuthorityKeyIdentifier {
    /** ? */
    KeyIdentifier?: string;
    /** ? */
    AuthorityCertIssuer?: string;
    /** ? */
    AuthorityCertSerialNumber?: string;
}

/**
 * See
 * - https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.6
 * - https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.7
 */
export enum AlternativeNameType {
    DNSName = "dNSName",
    IP = "iPAddress",
    URI = "uniformResourceIdentifier",
    DirectoryName = "directoryName",
    RegisteredId = "registeredID",
    OtherName = "otherName"
}

/** See https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.3 */
export enum KeyUsageType {
    DigitalSignature = "digitalSignature",
    NonRepudiation = "nonRepudiation",
    KeyEncipherment = "keyEncipherment",
    DataEncipherment = "dataEncipherment",
    KeyAgreement = "keyAgreement",
    KeyCertSign = "keyCertSign",
    CRLSign = "cRLSign",
    EncipherOnly = "encipherOnly",
    DecipherOnly = "decipherOnly"
}

/** See https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.9 */
export interface BasicConstraints {
    /** Whether the certificate represents a CA */
    IsCA: boolean;
    /** Number of allowed intermediate CAs */
    Pathlen?: number;
}

/** See https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.10 */
export interface NameConstraints {
    // ?
}

/** See https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.11 */
export interface PolicyConstraints {
    RequireExplicitPolicy?: number;
    InhibitPolicyMapping?: number;
}

/**
 * See
 * - https://help.hcltechsw.com/domino/11.0.0/conf_keyusageextensionsandextendedkeyusage_r.html
 * - https://www.rfc-editor.org/rfc/rfc5280#section-4.2.1.12
 */
export enum ExtendedKeyUsageType {
    TLSWebServerAuthentication=1,
    TLSWebClientAuthentication=2,
    CodeSigning=3,
    EmailProtection=4,
    IPSECEndSystem=5,
    IPSECTunnel=5,
    IPSECUser=7,
    Timestamping=8,
    OCSPSigning=9
}