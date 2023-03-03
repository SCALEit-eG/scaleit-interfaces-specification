/**
 * Designates a virtual or physical computer and references
 * hardware information as well as device specific
 * master data
 * 
 * Currently also includes OS and software information
 */
 export interface DeviceAsset {
    /** Physical or virtual? */
    DeviceKind: DeviceKind;
    /** Optional label of the product if applicable */
    ProductName?: string;
    /** Reference to the manufacturer if applicable */
    ManufacturerId?: string;
    /** CPU, possibly multiple, basic info and asset reference */
    CPU: Array<CPUBaseInfo>;
    /** RAM / main memory, only information */
    RAM: Array<MainMemoryInfo>;
    /** Data drives */
    DataDrives: Array<DataDriveBaseInfo>;
    /** Network interface cards, asset reference and basic info */
    NetworkAdapters: Array<NetworkAdapterBaseInfo>;
    /** Reference / Id to mainboard asset if existing */
    MainboardId?: string;
    /** Installed OS if any; move to computer submodel? */
    OS?: OSInfo;
    /** Environment variables set for each profile; move to computer submodel? */
    SystemEnvironmentVariables?: {[envvar: string]: string};
    /** Configured profiles; move to computer submodel? */
    Profiles: ComputerProfileInformation[];
    /** Installed drivers; move to computer submodel? */
    Drivers?: any; // ? incomplete
}

/**
 * Whether a device is a physical or virtual computer
 */
 export enum DeviceKind {
    Physical = "Physical",
    Virtual = "Virtual"
}

/**
 * Basic information about a CPU 
 */
 export interface CPUBaseInfo {
    /**
     * If the CPU has its own asset then
     * the reference should be given
     */
    Id?: string;
    /** Product label */
    Label: string;
    /**
     * Number of total cores; sometimes several core
     * types are available e.g. performance-cores and
     * efficient cores
     */
    Cores: number;
    /** Multithreading / Hyperthreading support */
    Multithreading: boolean;
    /** Total number of threads; not always 2*Cores */
    Threads?: number;
    /** Processor base frequency in Hertz / Hz */
    MinClockRate: number;
    /** Microprocessor type */
    InstructionSet: string;
    /** Supported motherboard connection */
    ProcessorSocket: string;
}

/**
 * Information about main memory / RAM
 */
 export interface MainMemoryInfo {
    /** Product label / designation */
    Label: string;
    Brand: string;
    /** Storage capacity in bytes */
    Capacity: number;
    FormFactor: string;
    MemoryType: string;
    /** Voltage in Volt V */
    Voltage: number;
    Latency: string;
    /** Operating frequency in Hertz Hz */
    Frequency: number;
}

/** Reference to a data drive and basic info */
export interface DataDriveBaseInfo {
    /** Reference to asset if existing */
    Id?: string;
    /** Storage capacity in bytes */
    Capacity: number;
    /** SSD, HDD etc. */
    StorageDriverType: string;
    /** e.g. SATA or PCIe 4.0 x4 NVMe */
    InterfaceType: string;
}

/** Reference and basic info about NIC */
export class NetworkAdapterBaseInfo {
    /** Reference to asset if existing */
    Id?: string;
    /** Ethernet 802.3, Wireless etc. */
    AdapterType: string;
    /** 48-bit MAC address written in hexadecimal */
    MAC: string;
}

/** Installed OS */
export interface OSInfo {
    /** OS label e.g. Windows 10 Home, Ubuntu 20.04 */
    Name?: string;
    /** Identifier for the type of OS e.g. Windows, Linux */
    Type: string;
    /** Official version identifier */
    Version: string;
    /** Edition like home / enterprise or release type e.g. desktop / server */
    Variant?: string;
    /** CPU architecture */
    Architecture: string;
}

/** Information about a configured profile on a computer */
export interface ComputerProfileInformation {
    User?: string;
    Groups?: string[];
    HomeFolder?: string;
    EnvironmentVariables: {[envvar: string]: string};
    // what else?
}
