/** Information specific to an order asset */
export interface Order {
    /** Id / reference to the customer identity */
    Customer: string;
    /** Unique Id for the transaction */
    OrderNumber: string;
    /** Reference / Id of the publisher of the order number */
    Vendor: string;
    /** Order date */
    OrderDate: Date;
    /** Products */
    Items: OrderItem[];
}

/** Entry of an order */
export interface OrderItem {
    /** Product number given by the manufacturer */
    ProductNumber: string;
    /** Globally unique ID of the manufacturer */
    ManufacturerId: string;
    /** Order quantity, > 0 */
    Quantity: number;
}