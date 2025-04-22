export declare function add<K, V>(map: Map<K, Set<V>>, key: K, value: V): void;
export declare function del<K, V>(map: Map<K, Set<V>>, key: K, value: V): void;
export declare function fetch<K, V>(map: Map<K, Set<V>>, key: K): Set<V>;
export declare function prune<K, V>(map: Map<K, Set<V>>, key: K): void;
