import { Controller } from "../../core/controller";
import { ValueDefinitionMap, ValueDescriptorMap } from "../../core/value_properties";
export declare class DefaultValueController extends Controller {
    static values: ValueDefinitionMap;
    valueDescriptorMap: ValueDescriptorMap;
    defaultBooleanValue: boolean;
    hasDefaultBooleanValue: boolean;
    defaultBooleanTrueValue: boolean;
    defaultBooleanFalseValue: boolean;
    hasDefaultBooleanTrueValue: boolean;
    hasDefaultBooleanFalseValue: boolean;
    defaultBooleanOverrideValue: boolean;
    hasDefaultBooleanOverrideValue: boolean;
    defaultStringValue: string;
    hasDefaultStringValue: boolean;
    defaultStringHelloValue: string;
    hasDefaultStringHelloValue: boolean;
    defaultStringOverrideValue: string;
    hasDefaultStringOverrideValue: boolean;
    defaultNumberValue: number;
    hasDefaultNumberValue: boolean;
    defaultNumberThousandValue: number;
    hasDefaultNumberThousandValue: boolean;
    defaultNumberZeroValue: number;
    hasDefaultNumberZeroValue: boolean;
    defaultNumberOverrideValue: number;
    hasDefaultNumberOverrideValue: boolean;
    defaultArrayValue: any[];
    hasDefaultArrayValue: boolean;
    defaultArrayFilledValue: {
        [key: string]: any;
    };
    hasDefaultArrayFilledValue: boolean;
    defaultArrayOverrideValue: {
        [key: string]: any;
    };
    hasDefaultArrayOverrideValue: boolean;
    defaultObjectValue: object;
    hasDefaultObjectValue: boolean;
    defaultObjectPersonValue: object;
    hasDefaultObjectPersonValue: boolean;
    defaultObjectOverrideValue: object;
    hasDefaultObjectOverrideValue: boolean;
}
