import { SysNicInfo } from "../ResourceManagement/SysInfo";

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

/** Data that binds a license to a specific app */
export interface AppBinding {
    /** identifying part of the app config */
    Config: {
        Name: string;
        Version: string;
        /** Unique Id per Shop */
        ProductNumber: string;
        /** Unique Shop Id */
        ShopId: string;
    },
    /** SHA256 fingerprint of the artefacts that are used */
    Artefacts: string[];
}