import { ActionDescriptor } from "./action_descriptor";
import { Token } from "../mutation-observers";
export declare class Action {
    readonly element: Element;
    readonly index: number;
    readonly eventTarget: EventTarget;
    readonly eventName: string;
    readonly eventOptions: AddEventListenerOptions;
    readonly identifier: string;
    readonly methodName: string;
    static forToken(token: Token): Action;
    constructor(element: Element, index: number, descriptor: Partial<ActionDescriptor>);
    toString(): string;
    get params(): object;
    private getParamsFromEventTargetAttributes;
    private get eventTargetName();
}
export declare function getDefaultEventNameForElement(element: Element): string | undefined;
