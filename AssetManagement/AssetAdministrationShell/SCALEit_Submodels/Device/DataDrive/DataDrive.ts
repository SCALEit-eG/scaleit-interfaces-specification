/**
 * Data drive e.g. an SSD, HDD or USB-Stick
 */
 export interface DataDrive {
    Brand: string;
    Series: string;
    /** Storage capacity in bytes */
    Capacity: number;
    /** SSD, HDD etc. */
    StorageDriverType: string;
    Interface: {
        /** e.g. SATA or PCIe 4.0 x4 NVMe */
        InterfaceType: string;
        /** data transfer rate in byte/s */
        DataRate: number;
    };
    /** e.g. 2.5 inch */
    FormFactor: string;
    /** internal /or external drive */
    FormType: "internal" | "external";
    /** read velocity in byte/s */
    DataReadRate: number;
    /** write velocity in byte/s */
    DataWriteRate: number;
    /** Total number of bytes that can be written */
    TotalWriteCapacity?: number;
}