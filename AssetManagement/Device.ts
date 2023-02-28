import { AssetInfo } from "./AssetInfo";

/**
 * Designates a virtual or physical computer and references
 * hardware information as well as device specific
 * master data
 */
export class DeviceAsset extends AssetInfo {
    /** Physical or virtual? */
    DeviceKind: DeviceKind;
    /** Optional label of the product if applicable */
    ProductName?: string;
    /** Reference to the manufacturer if applicable */
    ManufacturerId?: string;
    /** CPU, possibly multiple */
    CPU: Array<CPUBaseInfo>;
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

export class NetworkAdapterAsset extends AssetInfo {}

export class MainboardAsset extends AssetInfo {}

export class MainMemory extends AssetInfo {}

export class DataDrive extends AssetInfo {}