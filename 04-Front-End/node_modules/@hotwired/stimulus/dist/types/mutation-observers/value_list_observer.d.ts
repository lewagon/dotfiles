import { Token, TokenListObserverDelegate } from "./token_list_observer";
export interface ValueListObserverDelegate<T> {
    parseValueForToken(token: Token): T | undefined;
    elementMatchedValue(element: Element, value: T): void;
    elementUnmatchedValue(element: Element, value: T): void;
}
export declare class ValueListObserver<T> implements TokenListObserverDelegate {
    private tokenListObserver;
    private delegate;
    private parseResultsByToken;
    private valuesByTokenByElement;
    constructor(element: Element, attributeName: string, delegate: ValueListObserverDelegate<T>);
    get started(): boolean;
    start(): void;
    stop(): void;
    refresh(): void;
    get element(): Element;
    get attributeName(): string;
    tokenMatched(token: Token): void;
    tokenUnmatched(token: Token): void;
    private fetchParseResultForToken;
    private fetchValuesByTokenForElement;
    private parseToken;
}
