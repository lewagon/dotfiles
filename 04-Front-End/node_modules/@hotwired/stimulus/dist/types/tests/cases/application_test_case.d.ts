import { Application } from "../../core/application";
import { DOMTestCase } from "./dom_test_case";
import { Schema } from "../../core/schema";
export declare class ApplicationTestCase extends DOMTestCase {
    schema: Schema;
    application: Application;
    runTest(testName: string): Promise<void>;
    setupApplication(): void;
}
