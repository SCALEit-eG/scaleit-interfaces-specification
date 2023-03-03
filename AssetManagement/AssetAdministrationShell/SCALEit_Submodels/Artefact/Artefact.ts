/** Generic executable software artefact */
export interface Artefact {
    /** Type of artefact e.g. ContainerImage, JAR, PythonScript, EXE */
    ArtefactType: string;
    /** Computed checksums of the the artefacts */
    Fingerprints: Array<AlgValue>;
    /** Platform the artefact runs on */
    Platform: Platform;
    /** Timestamp when the artefact was originally created */
    Created?: Date;
    /** Timestamp when the artefact was last changed */
    LastModified?: Date;
    /** Size of the artefact in bytes */
    Size: number;
    /** Digital signatures that guard the artefact */
    Signatures: Array<Signature>;
    /** Optional resources needed for the artefact to properly run */
    Resources?: Array<ArtefactResource>;
}

/** Platform specification where the artefact can be executed */
export interface Platform {
    /** Optional restrictions of operating systems e.g. linux */
    OS?: Array<string | OS_ID>;
    /** Optional restrictions of CPU instruction sets e.g. amd64 */
    Arch?: Array<string | InstructionSet_ID>;
    /** Optional runtime restrictions e.g. containerd, dockerd, java17 */
    Runtime?: string[];
}

/** Artefact resource */
export interface ArtefactResource {
    /** Type of resource */
    Type: ArtefactResourceType;
    /** Unique Id needed for fetching the resource */
    Id: string;
}

/** Specifies the type of resource of an artefact */
export enum ArtefactResourceType {
    /** another artefact */
    Artefact = "Artefact",
    /** single resource file */
    File = "File",
    /** several files and directories */
    Files = "Files"
}

/** Digital signature with metadata */
export interface Signature {
    /** Global Id of the issuer certificate */
    Issuer: string;
    /** Type of signature */
    SignatureType: SignatureType;
    /** Signature value */
    Value: string;
    /** Encoding of the value e.g. JWT for JWS signature */
    Encoding: string;
}

/** Supported signature types */
export enum SignatureType {
    JWS = "JWS",
    XMLDSig = "XMLDSig"
}

/** Algorithm / Value pair used for checksums */
export interface AlgValue {
    /** Algorithm e.g. SHA1, SHA256, MD5 */
    Algorithm: string;
    /** Digest / checksum */
    Value: string;
}

export enum OS_ID {
    Linux = "linux",
    Windows = "windows",
    MacOS = "macos"
}

export enum InstructionSet_ID {
    amd64 = "amd64",
    x86_64 = "amd64",
    i386 = "x86",
    x86 = "x86",
    armv5 = "armv5",
    armv6 = "armv6",
    armv7 = "armv7",
    arm64v8 = "arm64v8",
    mips64le = "mips64le",
    ppc64le = "ppc64le",
    riscv64 = "riscv64",
    s390x = "s390x"
}
