import { Controller } from "../../../core/controller";
declare class ErrorWhileConnectingController extends Controller {
    connect(): void;
}
declare const ErrorHandlerTests_base: import("../../../core/constructor").Constructor<import("../../cases/controller_test_case").ControllerTests<ErrorWhileConnectingController>>;
export default class ErrorHandlerTests extends ErrorHandlerTests_base {
    controllerConstructor: typeof ErrorWhileConnectingController;
    setupApplication(): Promise<void>;
    "test errors in connect are thrown and handled by built in logger"(): Promise<void>;
    "test errors in connect are thrown and handled by window.onerror"(): Promise<void>;
}
export {};
