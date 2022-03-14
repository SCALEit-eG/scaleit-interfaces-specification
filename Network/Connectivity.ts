export interface MqttConnectivity{
    Host: string;
    Port: number;
    User?: string;
    Password?: string;
    Protocol: "mqtt" | "ws" | "mqtts" | "wss";
    Reconnect?: number;
}

export interface Connectivity{
    Mqtt?: MqttConnectivity;
}