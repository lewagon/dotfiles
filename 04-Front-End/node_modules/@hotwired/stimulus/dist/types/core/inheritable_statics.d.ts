import { Constructor } from "./constructor";
export declare function readInheritableStaticArrayValues<T, U = string>(constructor: Constructor<T>, propertyName: string): U[];
export declare function readInheritableStaticObjectPairs<T, U>(constructor: Constructor<T>, propertyName: string): [string, U][];
