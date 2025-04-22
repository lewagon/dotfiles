import { Constructor } from "./constructor";
export declare function ValuePropertiesBlessing<T>(constructor: Constructor<T>): PropertyDescriptorMap;
export declare function propertiesForValueDefinitionPair<T>(valueDefinitionPair: ValueDefinitionPair): PropertyDescriptorMap;
export declare type ValueDescriptor = {
    type: ValueType;
    key: string;
    name: string;
    defaultValue: ValueTypeDefault;
    hasCustomDefaultValue: boolean;
    reader: Reader;
    writer: Writer;
};
export declare type ValueDescriptorMap = {
    [attributeName: string]: ValueDescriptor;
};
export declare type ValueDefinitionMap = {
    [token: string]: ValueTypeDefinition;
};
export declare type ValueDefinitionPair = [string, ValueTypeDefinition];
export declare type ValueTypeConstant = typeof Array | typeof Boolean | typeof Number | typeof Object | typeof String;
export declare type ValueTypeDefault = Array<any> | Boolean | Number | Object | String;
export declare type ValueTypeObject = {
    type: ValueTypeConstant;
    default: ValueTypeDefault;
};
export declare type ValueTypeDefinition = ValueTypeConstant | ValueTypeDefault | ValueTypeObject;
export declare type ValueType = "array" | "boolean" | "number" | "object" | "string";
declare type Reader = (value: string) => any;
declare type Writer = (value: any) => string;
export {};
