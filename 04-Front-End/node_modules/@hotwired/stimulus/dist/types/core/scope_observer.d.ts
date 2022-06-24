import { ErrorHandler } from "./error_handler";
import { Schema } from "./schema";
import { Scope } from "./scope";
import { Token, ValueListObserverDelegate } from "../mutation-observers";
export interface ScopeObserverDelegate extends ErrorHandler {
    createScopeForElementAndIdentifier(element: Element, identifier: string): Scope;
    scopeConnected(scope: Scope): void;
    scopeDisconnected(scope: Scope): void;
}
export declare class ScopeObserver implements ValueListObserverDelegate<Scope> {
    readonly element: Element;
    readonly schema: Schema;
    private delegate;
    private valueListObserver;
    private scopesByIdentifierByElement;
    private scopeReferenceCounts;
    constructor(element: Element, schema: Schema, delegate: ScopeObserverDelegate);
    start(): void;
    stop(): void;
    get controllerAttribute(): string;
    parseValueForToken(token: Token): Scope | undefined;
    elementMatchedValue(element: Element, value: Scope): void;
    elementUnmatchedValue(element: Element, value: Scope): void;
    private fetchScopesByIdentifierForElement;
}
