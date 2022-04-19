/**
 * Represents a file system entry in an app filesystem
 */
export interface AppFilesystemEntry{
    /**
     * name of the entry, usually the file
     * or directory name
     */
    Name: string;
    /**
     * arbitrary ID that uniquely identifies the app filesystem
     * entry in a certain context; usually the URL or base64 encoded
     * path
     */
    Id: string;
    /** whether this entry can be deleted */
    Deletable: boolean;
}

/**
 * Represents a file entry that exposes actual data
 */
export interface AppFilesystemFileEntry extends AppFilesystemEntry{
    /**
     * Whether this file can be changed
     */
    Editable: boolean;
    /**
     * MIMEType of the file as determined by the application
     * or its file extension, see https://wiki.selfhtml.org/wiki/MIME-Type/%C3%9Cbersicht
     */
    MIMEType: string;
}

/**
 * Represents a directory that may contain files and subdirectories
 */
export interface AppFilesystemDirectoryEntry extends AppFilesystemEntry{
    /**
     * Child filesystem entries, may be empty or null
     */
    Entries: Array<AppFilesystemEntry>;
    /**
     * Whether further files and directories can be added
     * to this directory
     */
    Extendable: boolean;
    /**
     * What type of files are accepted if Extendable is true;
     * syntax corresponds to the "Accept" HTTP header
     */
    Accept: string;
}

/**
 * Metadata for an app filesystem entry for both
 * files and directories
 */
export interface AppFilesystemEntryMetadata{
    /** Name of the entry */
    Name: string;
    /** Absolute path */
    Path: string
    /** Timestamp when the entry was created */
    Created: Date;
    /** Timestamp when the entry was last modified */
    LastModified: Date;
}

/**
 * Metadata specific to an app filesytem file entry
 */
export interface FileMetadata extends AppFilesystemEntryMetadata{
    /** size in bytes */
    Size: number;
}

/**
 * Metadata specific to an app filesystem directory entry
 */
export interface DirectoryMetadata extends AppFilesystemEntryMetadata{
    /** number of direct child entries */
    EntryCount: number;
}

/** empty app filesystem */
export var EmptyAppFilesystem: AppFilesystemEntry[] = [];
