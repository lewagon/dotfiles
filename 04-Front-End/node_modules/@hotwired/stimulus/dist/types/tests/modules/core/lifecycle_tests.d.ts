import { LogControllerTestCase } from "../../cases/log_controller_test_case";
export default class LifecycleTests extends LogControllerTestCase {
    controllerElement: Element;
    setup(): Promise<void>;
    "test Controller#initialize"(): Promise<void>;
    "test Controller#connect"(): Promise<void>;
    "test Controller#disconnect"(): Promise<void>;
    reconnectControllerElement(): Promise<void>;
    connectControllerElement(): Promise<void>;
    disconnectControllerElement(): Promise<void>;
}
