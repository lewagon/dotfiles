import { LogControllerTestCase } from "../../cases/log_controller_test_case";
export default class ActionOrderingTests extends LogControllerTestCase {
    identifier: string[];
    fixtureHTML: string;
    "test adding an action to the right"(): Promise<void>;
    "test adding an action to the left"(): Promise<void>;
    "test removing an action from the right"(): Promise<void>;
    "test removing an action from the left"(): Promise<void>;
    "test replacing an action on the left"(): Promise<void>;
    "test stopping an action"(): Promise<void>;
    "test disconnecting a controller disconnects its actions"(): Promise<void>;
    set controllerValue(value: string);
    set actionValue(value: string);
    get element(): Element;
    get buttonElement(): Element;
}
