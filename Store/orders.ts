export interface Order{
    OrderNumber: string;
    App: OrderAppEntry;
    OrderQuantity: number;
    PaymentStatus: PaymentStatus;
    LicenceTerms: any;
}

export interface OrderAppEntry{
    Name: string;
    Version: string;
    ProductNumber: string;
}

export enum PaymentStatus{
    Open = "open",
    Paid = "paid"
}

export interface OrderUpdate{
    PaymentStatus: PaymentStatus;
}