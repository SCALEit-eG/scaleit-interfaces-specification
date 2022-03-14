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

export interface AppFilesystemEntryMetadata{
    Name: string;
    Path: string
    Created: Date;
    LastModified: Date;
}

export interface FileMetadata extends AppFilesystemEntryMetadata{
    /** size in bytes */
    Size: number;
}

export interface DirectoryMetadata extends AppFilesystemEntryMetadata{
    /** number of direct child entries */
    EntryCount: number;
}
