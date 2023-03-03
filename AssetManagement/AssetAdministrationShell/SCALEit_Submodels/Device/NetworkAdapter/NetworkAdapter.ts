/**
 * Asset representing an network interface controller / adapter,
 * the connection specific configuration like DHCP, gateway or
 * IP address needs a separate data model
 */
 export interface NetworkAdapterAsset {
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