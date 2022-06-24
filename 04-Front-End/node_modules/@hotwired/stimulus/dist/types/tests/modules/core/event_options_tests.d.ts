import { LogControllerTestCase } from "../../cases/log_controller_test_case";
export default class EventOptionsTests extends LogControllerTestCase {
    identifier: string[];
    fixtureHTML: string;
    "test different syntaxes for once action"(): Promise<void>;
    "test mix once and standard actions"(): Promise<void>;
    "test stop propagation with once"(): Promise<void>;
    "test global once actions"(): Promise<void>;
    "test edge case when updating action list with setAttribute preserves once history"(): Promise<void>;
    "test default passive action"(): Promise<void>;
    "test global passive actions"(): Promise<void>;
    "test passive false actions"(): Promise<void>;
    "test multiple options"(): Promise<void>;
    "test wrong options are silently ignored"(): Promise<void>;
    set actionValue(value: string);
    get element(): Element;
    get buttonElement(): Element;
}
