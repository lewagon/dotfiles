import { Application } from "./application";
import { Context } from "./context";
import { ControllerConstructor } from "./controller";
import { Definition } from "./definition";
import { Scope } from "./scope";
export declare class Module {
    readonly application: Application;
    readonly definition: Definition;
    private contextsByScope;
    private connectedContexts;
    constructor(application: Application, definition: Definition);
    get identifier(): string;
    get controllerConstructor(): ControllerConstructor;
    get contexts(): Context[];
    connectContextForScope(scope: Scope): void;
    disconnectContextForScope(scope: Scope): void;
    private fetchContextForScope;
}
