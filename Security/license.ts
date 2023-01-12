import { AssetInfo } from "../AssetManagement/AssetInfo";
import { AppBinding, DeviceBinding } from "./binding";
import { CertificateData } from "./certificate";

/**
 * Holds basic license information intended for
 * an overview
 * @deprecated
 */
export interface License {
    /** whether the license can be used */
    Valid: boolean;
    /** information from the x509 certificate */
    Certificate: CertificateData;
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

/**
 * Provides the actual details that a license contains
 * and should only be accessed authorized
 * @deprecated
 */
export interface LicenseDetails extends License {
    /**
     * needed to differentiate between licenses for the same order;
     * should be incremented by one for each new license for the same
     * order
     */
    LicenseNumber: number;
    /** information that assigns this license to an order */
    Order: LicenseOrderEntry;
    /** Required data that binds the license to an app */
    App: AppBinding;
    /** Optional data that binds the license to a device */
    Device?: DeviceBinding;
    /** app specific license data */
    LicenseTerms: { [key: string]: any };
}

/** Reduced license info for master view */
export interface LicenseSimpleInfo {
    /** Full Id to use at the API */
    Id: string;
    OrderNumber: string;
    ShopId: string;
    OrderDate: Date;
    LicenseNumber: number;
    DeviceBinding: "NIC" | "TPM" | "None";
    ProductNumber: string;
}

/**
 * License key to access license information
 */
export interface LicenseKey {
    /** key for authorized access */
    Key: string;
    /** App ID for which the key is valid */
    AppId: string;
}

/**
 * License data intended to be managed as an asset.
 */
export class LicenseAsset extends AssetInfo {
    /** Unique in combination with order number */
    LicenseNumber: number;
    /** Order and shop info */
    Order: LicenseOrderEntry;
    /** Required binding to an app */
    App: AppBinding;
    /** Optional binding to a device */
    Device?: DeviceBinding;
    /** License details, app specific */
    LicenseTerms: { [key: string]: any };
    /** Id of the license's certificate */
    LicenseCertificate: string;
    /** Id of the certificate of the CA who issued the license */
    IssuerCertificate: string;
}
