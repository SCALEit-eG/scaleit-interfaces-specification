import { AssetInfo } from "../AssetManagement/AssetInfo";

/** Shop that is registered at the store */
export interface StoreShop {
    /** Unique Id for the shop, usually related to a digital certificate */
    ShopId: string;
    /** Descriptive label */
    Label?: string;
}

/** Shop managed as asset */
export class Shop extends AssetInfo {
    /**
     * true for only one or none shop to indicate that it is the shop used if no
     * shop identity is given; useful if only one shop is configured
     */
    IsDefault: boolean;
}