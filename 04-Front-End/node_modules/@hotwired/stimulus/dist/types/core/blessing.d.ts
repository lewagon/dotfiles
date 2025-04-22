import { Constructor } from "./constructor";
export declare type Blessing<T> = (constructor: Constructor<T>) => PropertyDescriptorMap;
export interface Blessable<T> extends Constructor<T> {
    readonly blessings?: Blessing<T>[];
}
export declare function bless<T>(constructor: Blessable<T>): Constructor<T>;
