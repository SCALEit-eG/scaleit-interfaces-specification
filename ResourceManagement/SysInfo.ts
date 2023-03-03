/**
 * Information about computer hardware
 * and basic software stack like OS
 */
export interface SysInfo {
    OS: SysOSInfo;
    Mainboards: SysMotherboardInfo[];
    Bios: SysBiosInfo[];
    Nics: SysNicInfo[];
    Cpus: SysCpuInfo[];
    Memory: SysMemInfo[];
}

export interface SysOSInfo {
    ComputerName: string;
    OSVersion: string;
    Platform: string;
    OSArchitecture: string;
}

export interface SysMotherboardInfo {
    Manufacturer: string;
    SerialNumber: string;
    Product: string;
}

export interface SysBiosInfo {
    Name: string;
    Manufacturer: string;
    SerialNumber: string;
    Version: string;
}

/**
 * Information about network interface card or also
 * called network adapter
 */
export interface SysNicInfo {
    Name: string;
    /** e.g. ethernet, wifi, loopback or virtual bridge */
    AdapterType: string;
    /** 48-bit MAC address written in hexadecimal */
    MAC: string;
    Manufacturer: string;
    ProductName: string;
}

export interface SysCpuInfo {
    Name: string;
    Description: string;
    Manufacturer: string;
    NumberOfCores: number;
    NumberOfLogicalCores: number;
    /** value with unit e.g. Hz or MHz */
    ClockSpeed: string;
}

export interface SysMemInfo {
    Label: string;
    Manufacturer: string;
    /** value with unit e.g. MB or GB */
    Capacity: string;
    /** value with unit e.g. MHz */
    Speed: string;
    SerialNumber: string;
}

export interface SysInfoProcess {
    Name: string;
    Pid: string;
    /** in Byte */
    Memory: number;

    /** computed human friendly version for display */
    get MemoryLabel(): string;
}

/** processes are reported as array */
export var Processes: SysInfoProcess[] = [];
