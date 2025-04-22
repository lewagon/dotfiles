import { LogControllerTestCase } from "../../cases/log_controller_test_case";
export default class ES6Tests extends LogControllerTestCase {
    static shouldSkipTest(testName: string): boolean;
    fixtureHTML: string;
    fixtureScript: string;
    renderFixture(): Promise<void>;
    teardown(): Promise<void>;
    "test ES6 controller classes"(): Promise<void>;
}
