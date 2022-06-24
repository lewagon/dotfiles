import { ClassController } from "../../controllers/class_controller";
declare const ClassTests_base: import("../../../core/constructor").Constructor<import("../../cases/controller_test_case").ControllerTests<ClassController>>;
export default class ClassTests extends ClassTests_base {
    fixtureHTML: string;
    "test accessing a class property"(): void;
    "test accessing a missing class property throws an error"(): void;
    "test classes must be scoped by identifier"(): void;
    "test multiple classes map to array"(): void;
    "test accessing a class property returns first class if multiple classes are used"(): void;
}
export {};
