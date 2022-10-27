export interface Order{
    /** ID of the order */
    OrderNumber: string;
    /** date when the order was done */
    OrderDate: Date;
    /** date when the order was paid */
    PaymentDate: Date;
    /** payment status */
    PaymentStatus: PaymentStatus;
    /** ordered apps, at least one entry */
    Items: OrderItem[];
}

export interface OrderItem{
    /** basic app information */
    App: OrderAppEntry;
    /** how many instances / licenses */
    OrderQuantity: number;
    /** app specific license terms */
    LicenceTerms: any;
}

export interface OrderAppEntry{
    /** App name */
    Name: string;
    /** App version */
    Version: string;
    /** ID of the product */
    ProductNumber: string;
}

export enum PaymentStatus{
    Open = "open",
    Paid = "paid"
}

export interface OrderUpdate{
    /** paid or still open */
    PaymentStatus: PaymentStatus;
    /** date of payment or null */
    PaymentDate: Date;
}