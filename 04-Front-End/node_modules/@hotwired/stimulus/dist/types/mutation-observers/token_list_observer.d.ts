import { AttributeObserverDelegate } from "./attribute_observer";
export interface Token {
    element: Element;
    attributeName: string;
    index: number;
    content: string;
}
export interface TokenListObserverDelegate {
    tokenMatched(token: Token): void;
    tokenUnmatched(token: Token): void;
}
export declare class TokenListObserver implements AttributeObserverDelegate {
    private attributeObserver;
    private delegate;
    private tokensByElement;
    constructor(element: Element, attributeName: string, delegate: TokenListObserverDelegate);
    get started(): boolean;
    start(): void;
    pause(callback: () => void): void;
    stop(): void;
    refresh(): void;
    get element(): Element;
    get attributeName(): string;
    elementMatchedAttribute(element: Element): void;
    elementAttributeValueChanged(element: Element): void;
    elementUnmatchedAttribute(element: Element): void;
    private tokensMatched;
    private tokensUnmatched;
    private tokenMatched;
    private tokenUnmatched;
    private refreshTokensForElement;
    private readTokensForElement;
}
