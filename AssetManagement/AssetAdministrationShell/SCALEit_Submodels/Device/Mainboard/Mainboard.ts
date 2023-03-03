/**
 * Mainboard information
 */
 export interface MainboardAsset {
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