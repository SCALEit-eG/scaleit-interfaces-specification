import { AssetInfo } from "./AssetInfo";

/**
 * Designates a virtual or physical computer and references
 * hardware information as well as device specific
 * master data
 * 
 * Currently also includes OS and software information
 */
export class DeviceAsset extends AssetInfo {
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
 * Detailed asset information about a CPU
 */
export class CPUAsset extends AssetInfo {
    Label: string;
    Brand: string;
    ModelNumber: string;
    Series: string;
    CoreFamily: string;
    /** Total cores */
    Cores: number;
    /** Also known as hyperthreading */
    Multithreading: boolean;
    Threads: number;
    /** CPU Base frequency in Hertz */
    MinClockRate: number;
    /** CPU Turbo frequency in Hertz */
    MaxClockRate: number;
    /** Supported Mainboard connection */
    ProcessorSocket: string;
    /** Base thermal design power in Watt / W */
    BaseTDP: number;
    /** Maximum TDP in Watt */
    MaxTDP: number;
    /** L1 Cache capacity in byte */
    L1Cache: number;
    /** L2 Cache capacity in byte */
    L2Cache: number;
    /** L3 Cache capacity in byte if available */
    L3Cache?: number;
    /** Designation of microarchitecture if available */
    Microarchitecture?: string;
    /** Designates the type of microprocessor e.g. x86-64, armv7 */
    InstructionSet: string;
    /** Maximum operating temperature in degrees celsius °C */
    MaxOpTemp: number;
    /** Date of publication */
    PublishDate: Date;
    IntegratedGraphics?: string;
    /** Supported types of memory e.g. DDR5 */
    MemoryTypes: string[];
    /** Maximum amount of supported main memory in bytes */
    MaxMemory: number;
    SupportingChipsets?: string[];
    SupportedExtensions?: string[];
}

/**
 * Asset representing an network interface controller / adapter,
 * the connection specific configuration like DHCP, gateway or
 * IP address needs a separate data model
 */
export class NetworkAdapterAsset extends AssetInfo {
    Brand: string;
    /** Ethernet 802.3, Wireless etc. */
    AdapterType: string;
    /** Interface technology e.g. PCIe v2.1 */
    Interface: string;
    /** Data rate in bit per second bit/s */
    DataRate: number;
    /** 48-bit MAC address written in hexadecimal */
    MAC: string;
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

/**
 * Mainboard information
 */
export class MainboardAsset extends AssetInfo {
    Brand: string;
    ModelNumber: string;
    /** e.g. ATX */
    FormFactor: string;
    /** Motherboard chipset */
    Chipset: string;
    /** Allowed CPUs */
    CPUSockets: {
        CPUType: string;
        Socket: string;
    }[];
    /** Supported main memory */
    MemorySlots: {
        MemoryType: string;
        /** Maximum RAM capacity in bytes */
        MaxCapacity: number;
        /** Number of slots */
        Count: number;
        FormFactor: string;
        /** RAM operating frequency in Hz */
        ClockRate: number;
    };
    BIOS: {
        BIOSType:  string;
        /** Memory capacity of BIOS in bytes */
        ROM: number;
    };
    /** Expansion cards */
    ExpansionCardSlots: {
        SlotType: string;
        Count: number;
    }[];
    Interfaces: Array<MainboardInterfaceType>;
}

export interface MainboardInterfaceType {
    InterfaceType: string;
}

export interface MainboardInterfaceBase extends MainboardInterfaceType {
    Internal: boolean;
    Count: number;
}

export interface MainboardStorageInterface extends MainboardInterfaceBase {
    /** data transfer rate in bytes/s */
    DataRate: number;
}

export interface MainboardAudioInterface extends MainboardInterfaceType {
    Channel: string;
    Codec: string;
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

/**
 * Data drive e.g. an SSD, HDD or USB-Stick
 */
export class DataDrive extends AssetInfo {
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

/** Information about a configured profile on a computer */
export interface ComputerProfileInformation {
    User?: string;
    Groups?: string[];
    HomeFolder?: string;
    EnvironmentVariables: {[envvar: string]: string};
    // what else?
}