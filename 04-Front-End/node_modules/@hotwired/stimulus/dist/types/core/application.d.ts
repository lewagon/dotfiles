import { Controller, ControllerConstructor } from "./controller";
import { Definition } from "./definition";
import { Dispatcher } from "./dispatcher";
import { ErrorHandler } from "./error_handler";
import { Logger } from "./logger";
import { Router } from "./router";
import { Schema } from "./schema";
export declare class Application implements ErrorHandler {
    readonly element: Element;
    readonly schema: Schema;
    readonly dispatcher: Dispatcher;
    readonly router: Router;
    logger: Logger;
    debug: boolean;
    static start(element?: Element, schema?: Schema): Application;
    constructor(element?: Element, schema?: Schema);
    start(): Promise<void>;
    stop(): void;
    register(identifier: string, controllerConstructor: ControllerConstructor): void;
    load(...definitions: Definition[]): void;
    load(definitions: Definition[]): void;
    unload(...identifiers: string[]): void;
    unload(identifiers: string[]): void;
    get controllers(): Controller[];
    getControllerForElementAndIdentifier(element: Element, identifier: string): Controller | null;
    handleError(error: Error, message: string, detail: object): void;
    logDebugActivity: (identifier: string, functionName: string, detail?: object) => void;
    private logFormattedMessage;
}
