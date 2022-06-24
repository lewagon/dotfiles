import { LogController, ActionLogEntry } from "../controllers/log_controller";
import { ControllerConstructor } from "../../core/controller";
declare const LogControllerTestCase_base: import("../../core/constructor").Constructor<import("./controller_test_case").ControllerTests<LogController>>;
export declare class LogControllerTestCase extends LogControllerTestCase_base {
    controllerConstructor: ControllerConstructor & {
        actionLog: ActionLogEntry[];
    };
    setup(): Promise<void>;
    assertActions(...actions: any[]): void;
    assertNoActions(): void;
    get actionLog(): ActionLogEntry[];
}
export {};
