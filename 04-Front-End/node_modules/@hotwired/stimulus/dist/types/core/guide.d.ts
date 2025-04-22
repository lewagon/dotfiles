import { Logger } from "./logger";
export declare class Guide {
    readonly logger: Logger;
    readonly warnedKeysByObject: WeakMap<any, Set<string>>;
    constructor(logger: Logger);
    warn(object: any, key: string, message: string): void;
}
