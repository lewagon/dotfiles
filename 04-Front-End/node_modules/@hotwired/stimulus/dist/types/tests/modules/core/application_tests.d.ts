import { ApplicationTestCase } from "../../cases/application_test_case";
import { LogController } from "../../controllers/log_controller";
export default class ApplicationTests extends ApplicationTestCase {
    fixtureHTML: string;
    private definitions;
    "test Application#register"(): Promise<void>;
    "test Application#load"(): void;
    "test Application#unload"(): void;
    get controllers(): LogController[];
}
