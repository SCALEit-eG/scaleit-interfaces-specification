import { Signature } from "../Artefact/Artefact";

/**
 * License data intended to be managed as an asset.
 */
export interface License {
    /** Unique in combination with order number */
    LicenseNumber: number;
    /** Id of the order asset */
    OrderId: string;
    /** Some basic order and shop info */
    OrderInfo: LicenseOrderEntry;
    /** Optional reference to an app type */
    AppId?: string;
    /** Optional info to bind license to an app */
    AppBinding?: AppBinding;

    /** Optional reference to a device instance  */
    DeviceId?: string;
    /** Optional info to bind license to a device */
    DeviceBinding?: DeviceBinding;
    /** License details, app specific */
    LicenseTerms: { [key: string]: any };
    /** Id of the license's certificate */
    LicenseCertificate: string;
    /** Id of the certificate of the CA who issued the license */
    IssuerCertificate: string;
    /** Signature of the license to protect against manipulation */
    Signature: Signature;
}

/** Order identification in a license */
export interface LicenseOrderEntry {
    /** unique order number for given shop */
    OrderNumber: string;
    /** unique Id of the shop */
    ShopId: string;
    /** date of the order */
    OrderDate: Date;
}

/** Data that binds a license to a specific app */
export interface AppBinding {
    /** identifying part of the app type */
    Config: {
        Name: string;
        Version: string;
        /** Unique Id per Shop */
        ProductNumber: string;
        /** Unique Shop Id */
        ShopId: string;
    },
    /** SHA256 fingerprints of the artefacts that are used */
    Artefacts: string[];
}

/**
 * Data that binds a license to a device
 * - Exactly one binding must be given
 */
export interface DeviceBinding {
    /** binding using a network adapter */
    NIC?: SysNicInfo;
    /** binding using TPM */
    TPM?: {
        /** fingerprint of the secretly stored certificate */
        Fingerprint: string;
        /** hash of the encrypted fingerprint */
        HashEncryptedFingerprint: string;
    }
}

/**
 * Information about network interface card or
 * network adapter respectively
 */
export interface SysNicInfo {
    Name: string;
    /** e.g. ethernet, wifi, loopback or virtual bridge */
    AdapterType: string;
    /** 48-bit MAC address written in hexadecimal */
    MAC: string;
    Manufacturer: string;
    ProductName: string;
}