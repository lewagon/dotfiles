import { TargetController } from "../../controllers/target_controller";
declare const TargetTests_base: import("../../../core/constructor").Constructor<import("../../cases/controller_test_case").ControllerTests<TargetController>>;
export default class TargetTests extends TargetTests_base {
    fixtureHTML: string;
    "test TargetSet#find"(): void;
    "test TargetSet#findAll"(): void;
    "test TargetSet#findAll with multiple arguments"(): void;
    "test TargetSet#has"(): void;
    "test TargetSet#find ignores child controller targets"(): void;
    "test linked target properties"(): void;
    "test inherited linked target properties"(): void;
    "test singular linked target property throws an error when no target is found"(): void;
    "test target connected callback fires after initialize() and when calling connect()"(): void;
    "test target connected callback when element is inserted"(): Promise<void>;
    "test target connected callback when present element adds the target attribute"(): Promise<void>;
    "test target connected callback when element adds a token to an existing target attribute"(): Promise<void>;
    "test target disconnected callback fires when calling disconnect() on the controller"(): Promise<void>;
    "test target disconnected callback when element is removed"(): Promise<void>;
    "test target disconnected callback when an element present in the document removes the target attribute"(): Promise<void>;
    "test target disconnected(), then connected() callback fired when the target name is present after the attribute change"(): Promise<void>;
    "test [target]Connected() and [target]Disconnected() do not loop infinitely"(): Promise<void>;
}
export {};
