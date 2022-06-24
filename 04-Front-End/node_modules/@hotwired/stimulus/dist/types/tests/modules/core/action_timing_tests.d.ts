import { Controller } from "../../../core/controller";
declare class ActionTimingController extends Controller {
    static targets: string[];
    buttonTarget: HTMLButtonElement;
    event?: Event;
    connect(): void;
    record(event: Event): void;
}
declare const ActionTimingTests_base: import("../../../core/constructor").Constructor<import("../../cases/controller_test_case").ControllerTests<ActionTimingController>>;
export default class ActionTimingTests extends ActionTimingTests_base {
    controllerConstructor: typeof ActionTimingController;
    identifier: string;
    fixtureHTML: string;
    "test triggering an action on connect"(): Promise<void>;
}
export {};
