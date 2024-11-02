export interface Logger {
    groupCollapsed(groupTitle?: string, ...args: any[]): void;
    group(groupTitle?: string, ...optionalParams: any[]): void;
    log(message?: string, ...args: any[]): void;
    table(message?: string, ...args: any[]): void;
    warn(message?: string, ...args: any[]): void;
    error(message?: string, ...args: any[]): void;
    groupEnd(): void;
}
