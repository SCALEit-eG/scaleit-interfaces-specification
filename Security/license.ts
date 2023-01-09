import { AppBinding, DeviceBinding } from "./binding";
import { CertificateData } from "./certificate";

/**
 * Holds basic license information intended for
 * an overview
 */
export interface License {
    /** whether the license can be used */
    Valid: boolean;
    /** information from the x509 certificate */
    Certificate: CertificateData;
}

/**
 * Provides the actual details that a license contains
 * and should only be accessed authorized
 */
export interface LicenseDetails extends License {
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
    Device: DeviceBinding;
    /** data that binds the license to an app */
    App: AppBinding;
    /** app specific license data */
    LicenseTerms: { [key: string]: any };
}

/** Reduced license info for master view */
export interface LicenseSimpleInfo {
    /** Probably not persisted, only for DTO at the API */
    Id: string;
    OrderNumber: string;
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
