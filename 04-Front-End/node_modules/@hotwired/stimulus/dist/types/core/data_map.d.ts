import { Scope } from "./scope";
export declare class DataMap {
    readonly scope: Scope;
    constructor(scope: Scope);
    get element(): Element;
    get identifier(): string;
    get(key: string): string | null;
    set(key: string, value: string): string | null;
    has(key: string): boolean;
    delete(key: string): boolean;
    getAttributeNameForKey(key: string): string;
}
