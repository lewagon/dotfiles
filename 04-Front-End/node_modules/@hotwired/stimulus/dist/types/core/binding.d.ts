import { Action } from "./action";
import { Context } from "./context";
export declare class Binding {
    readonly context: Context;
    readonly action: Action;
    constructor(context: Context, action: Action);
    get index(): number;
    get eventTarget(): EventTarget;
    get eventOptions(): AddEventListenerOptions;
    get identifier(): string;
    handleEvent(event: Event): void;
    get eventName(): string;
    get method(): Function;
    private invokeWithEvent;
    private willBeInvokedByEvent;
    private get controller();
    private get methodName();
    private get element();
    private get scope();
}
