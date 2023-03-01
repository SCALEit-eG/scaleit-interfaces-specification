/** Identification of a software asset */
export interface SoftwareId {
    /** Globally unique manufacturer Id */
    ManufacturerId: string;
    /** Name of the software */
    Name: string;
    /** Version identifier */
    Version: string;
    /** Official product number given by the manufacturer */
    ProductNumber: string;
}