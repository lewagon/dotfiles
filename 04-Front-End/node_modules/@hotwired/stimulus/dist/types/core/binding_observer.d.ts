import { Action } from "./action";
import { Binding } from "./binding";
import { Context } from "./context";
import { ErrorHandler } from "./error_handler";
import { Schema } from "./schema";
import { Token, ValueListObserverDelegate } from "../mutation-observers";
export interface BindingObserverDelegate extends ErrorHandler {
    bindingConnected(binding: Binding): void;
    bindingDisconnected(binding: Binding): void;
}
export declare class BindingObserver implements ValueListObserverDelegate<Action> {
    readonly context: Context;
    private delegate;
    private valueListObserver?;
    private bindingsByAction;
    constructor(context: Context, delegate: BindingObserverDelegate);
    start(): void;
    stop(): void;
    get element(): Element;
    get identifier(): string;
    get actionAttribute(): string;
    get schema(): Schema;
    get bindings(): Binding[];
    private connectAction;
    private disconnectAction;
    private disconnectAllActions;
    parseValueForToken(token: Token): Action | undefined;
    elementMatchedValue(element: Element, action: Action): void;
    elementUnmatchedValue(element: Element, action: Action): void;
}
