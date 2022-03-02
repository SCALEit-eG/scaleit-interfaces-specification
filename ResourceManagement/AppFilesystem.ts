export interface AppFilesystemEntry{
    Name: string;
    /** base64 encoded path */
    Id: string;
    Deletable: boolean;
}

export interface AppFilesystemFileEntry extends AppFilesystemEntry{
    Editable: boolean;
    MIMEType: string;
}

export interface AppFilesystemDirectoryEntry extends AppFilesystemEntry{
    Entries: Array<AppFilesystemEntry>;
    Extendable: boolean;
    Accept: string;
}
