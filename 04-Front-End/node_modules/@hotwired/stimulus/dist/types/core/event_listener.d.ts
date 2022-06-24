import { Binding } from "./binding";
export declare class EventListener implements EventListenerObject {
    readonly eventTarget: EventTarget;
    readonly eventName: string;
    readonly eventOptions: AddEventListenerOptions;
    private unorderedBindings;
    constructor(eventTarget: EventTarget, eventName: string, eventOptions: AddEventListenerOptions);
    connect(): void;
    disconnect(): void;
    bindingConnected(binding: Binding): void;
    bindingDisconnected(binding: Binding): void;
    handleEvent(event: Event): void;
    get bindings(): Binding[];
}
