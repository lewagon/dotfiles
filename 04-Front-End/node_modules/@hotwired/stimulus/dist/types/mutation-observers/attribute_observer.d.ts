import { ElementObserverDelegate } from "./element_observer";
export interface AttributeObserverDelegate {
    elementMatchedAttribute?(element: Element, attributeName: string): void;
    elementAttributeValueChanged?(element: Element, attributeName: string): void;
    elementUnmatchedAttribute?(element: Element, attributeName: string): void;
}
export declare class AttributeObserver implements ElementObserverDelegate {
    attributeName: string;
    private delegate;
    private elementObserver;
    constructor(element: Element, attributeName: string, delegate: AttributeObserverDelegate);
    get element(): Element;
    get selector(): string;
    start(): void;
    pause(callback: () => void): void;
    stop(): void;
    refresh(): void;
    get started(): boolean;
    matchElement(element: Element): boolean;
    matchElementsInTree(tree: Element): Element[];
    elementMatched(element: Element): void;
    elementUnmatched(element: Element): void;
    elementAttributeChanged(element: Element, attributeName: string): void;
}
