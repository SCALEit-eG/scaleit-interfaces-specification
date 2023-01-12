import { AssetInfo } from "../AssetManagement/AssetInfo";

export class Order extends AssetInfo {
    /** ID of the order */
    OrderNumber: string;
    /** date when the order was done */
    OrderDate: Date;
    /** Unique customer Id */
    CustomerId: string;
    /** Unique Id of the Shop */
    ShopId: string;
    /** date when the order was paid */
    PaymentDate?: Date;
    /** payment status */
    PaymentStatus?: PaymentStatus;
    /** ordered apps, at least one entry */
    Items: OrderItem[];
}

export interface OrderItem {
    /** basic app information */
    App: OrderAppEntry;
    /** For how many days the license is valid */
    Duration?: number;
    /** Expiration date; if given takes precendence over duration */
    Expires?: Date;
    /** how many instances / licenses */
    OrderQuantity: number;
    /** app specific license terms */
    LicenseTerms: any;
}

export interface OrderAppEntry {
    /** App name */
    Name: string;
    /** App version */
    Version: string;
    /** ID of the product */
    ProductNumber: string;
}

export enum PaymentStatus {
    Open = "open",
    Paid = "paid"
}

export interface OrderUpdate {
    /** paid or still open */
    PaymentStatus: PaymentStatus;
    /** date of payment or null */
    PaymentDate: Date;
    /** Identifier for the shop or otherwise the default shop is assumed */
    ShopId?: string;
}