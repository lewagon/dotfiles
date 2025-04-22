declare const DataTests_base: import("../../../core/constructor").Constructor<import("../../cases/controller_test_case").ControllerTests<import("../../..").Controller>>;
export default class DataTests extends DataTests_base {
    fixtureHTML: string;
    "test DataSet#get"(): void;
    "test DataSet#set"(): void;
    "test DataSet#has"(): void;
    "test DataSet#delete"(): void;
}
export {};
