/** Entry in a log */
export interface LogEntry {
    /** Actual log message */
    Message: string;
    /** Usually the namespace, class or scope */
    Category: string;
    /** Date and time of the log entry's creation */
    TimeStamp: Date;
    /** Log level */
    Level: LogLevel;
}

/** Supported log levels */
export enum LogLevel {
    Trace = "TRACE",
    Debug = "DEBUG",
    Info = "INFO",
    Warn = "WARN",
    Error = "ERROR",
    Critical = "CRITICAL"
}

export const Log: LogEntry[] = [];