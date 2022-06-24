import { LogControllerTestCase } from "../../cases/log_controller_test_case";
export default class ActionParamsTests extends LogControllerTestCase {
    identifier: string[];
    fixtureHTML: string;
    expectedParamsForC: {
        id: number;
        multiWordExample: string;
        payload: {
            value: number;
        };
        active: boolean;
        empty: string;
        inactive: boolean;
    };
    "test clicking on the element does return its params"(): Promise<void>;
    "test passing params to namespaced controller"(): Promise<void>;
    "test updating manually the params values"(): Promise<void>;
    "test clicking on a nested element does return the params of the actionable element"(): Promise<void>;
    set actionValue(value: string);
    get element(): Element;
    get buttonElement(): Element;
    get nestedElement(): Element;
}
