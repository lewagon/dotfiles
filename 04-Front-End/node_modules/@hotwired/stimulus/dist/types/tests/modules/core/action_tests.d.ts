import { LogControllerTestCase } from "../../cases/log_controller_test_case";
export default class ActionTests extends LogControllerTestCase {
    identifier: string;
    fixtureHTML: string;
    "test default event"(): Promise<void>;
    "test bubbling events"(): Promise<void>;
    "test non-bubbling events"(): Promise<void>;
    "test nested actions"(): Promise<void>;
    "test global actions"(): Promise<void>;
    "test nested global actions"(): Promise<void>;
    "test multiple actions"(): Promise<void>;
    "test actions on svg elements"(): Promise<void>;
}
