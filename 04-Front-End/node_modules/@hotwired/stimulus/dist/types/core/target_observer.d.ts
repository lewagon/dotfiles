import { Multimap } from "../multimap";
import { Token, TokenListObserverDelegate } from "../mutation-observers";
import { Context } from "./context";
export interface TargetObserverDelegate {
    targetConnected(element: Element, name: string): void;
    targetDisconnected(element: Element, name: string): void;
}
export declare class TargetObserver implements TokenListObserverDelegate {
    readonly context: Context;
    readonly delegate: TargetObserverDelegate;
    readonly targetsByName: Multimap<string, Element>;
    private tokenListObserver?;
    constructor(context: Context, delegate: TargetObserverDelegate);
    start(): void;
    stop(): void;
    tokenMatched({ element, content: name }: Token): void;
    tokenUnmatched({ element, content: name }: Token): void;
    connectTarget(element: Element, name: string): void;
    disconnectTarget(element: Element, name: string): void;
    disconnectAllTargets(): void;
    private get attributeName();
    private get element();
    private get scope();
}
