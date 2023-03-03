/**
 * Detailed asset information about a CPU
 */
 export interface CPUAsset {
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