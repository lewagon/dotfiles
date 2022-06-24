import { Multimap } from "./multimap";
export declare class IndexedMultimap<K, V> extends Multimap<K, V> {
    private keysByValue;
    constructor();
    get values(): V[];
    add(key: K, value: V): void;
    delete(key: K, value: V): void;
    hasValue(value: V): boolean;
    getKeysForValue(value: V): K[];
}
