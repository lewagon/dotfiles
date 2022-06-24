import { Controller } from "../../core/controller";
import { ValueDefinitionMap, ValueDescriptorMap } from "../../core/value_properties";
declare class BaseValueController extends Controller {
    static values: ValueDefinitionMap;
    valueDescriptorMap: ValueDescriptorMap;
    stringValue: string;
    numericValue: number;
}
export declare class ValueController extends BaseValueController {
    static values: ValueDefinitionMap;
    shadowedBooleanValue: boolean;
    missingStringValue: string;
    idsValue: any[];
    optionsValue: {
        [key: string]: any;
    };
    time24hrValue: Boolean;
    loggedNumericValues: number[];
    oldLoggedNumericValues: any[];
    numericValueChanged(value: number, oldValue: any): void;
    loggedMissingStringValues: string[];
    oldLoggedMissingStringValues: any[];
    missingStringValueChanged(value: string, oldValue: any): void;
    optionsValues: Object[];
    oldOptionsValues: any[];
    optionsValueChanged(value: Object, oldValue: any): void;
}
export {};
