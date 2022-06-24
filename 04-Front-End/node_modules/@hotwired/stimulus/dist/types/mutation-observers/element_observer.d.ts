export interface ElementObserverDelegate {
    matchElement(element: Element): boolean;
    matchElementsInTree(tree: Element): Element[];
    elementMatched?(element: Element): void;
    elementUnmatched?(element: Element): void;
    elementAttributeChanged?(element: Element, attributeName: string): void;
}
export declare class ElementObserver {
    element: Element;
    started: boolean;
    private delegate;
    private elements;
    private mutationObserver;
    private mutationObserverInit;
    constructor(element: Element, delegate: ElementObserverDelegate);
    start(): void;
    pause(callback: () => void): void;
    stop(): void;
    refresh(): void;
    private processMutations;
    private processMutation;
    private processAttributeChange;
    private processRemovedNodes;
    private processAddedNodes;
    private matchElement;
    private matchElementsInTree;
    private processTree;
    private elementFromNode;
    private elementIsActive;
    private addElement;
    private removeElement;
}
