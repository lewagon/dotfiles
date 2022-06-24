import { ApplicationTestCase } from "../../cases/application_test_case";
import { LogController } from "../../controllers/log_controller";
export default class ApplicationTests extends ApplicationTestCase {
    fixtureHTML: string;
    "test module with false shouldLoad should not load when registering"(): void;
    "test module with true shouldLoad should load when registering"(): void;
    get controllers(): LogController[];
}
