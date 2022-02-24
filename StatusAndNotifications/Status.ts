export interface Status{
    Status: string | "isOK" | "isWarn" | "isError" | "isUndefined";
    Name: string;
    Text: string;
}
