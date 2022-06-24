import { Scope } from "./scope";
export declare class ClassMap {
    readonly scope: Scope;
    constructor(scope: Scope);
    has(name: string): boolean;
    get(name: string): string | undefined;
    getAll(name: string): RegExpMatchArray;
    getAttributeName(name: string): string;
    getDataKey(name: string): string;
    get data(): import("./data_map").DataMap;
}
