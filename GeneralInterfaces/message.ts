/**
 * Generic middlelayer message
 */
export interface MiddlelayerMessage<T> {
    /** Type of event */
    Event?: string;
    /** Message data */
    Data: T;
}