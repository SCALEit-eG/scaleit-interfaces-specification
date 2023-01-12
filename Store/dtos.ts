import { CertificateData } from "../Security/certificate";
import { LicenseAsset } from "../Security/license";
import { Order } from "./orders";

/**
 * Intended to encapsulate a specific asset to provide the API specific Id, the asset
 * and possibly further information that is not directly included in the asset.
 */
export abstract class AssetDto<T> {
    /** Id to be used at the API possibly a combined value that is encoded */
    Id: string;
    Asset: T;
}

export class OrderDto extends AssetDto<Order> {}

export class LicenseDto extends AssetDto<LicenseAsset> {
    Valid: boolean;
    Certificate: CertificateData;
}