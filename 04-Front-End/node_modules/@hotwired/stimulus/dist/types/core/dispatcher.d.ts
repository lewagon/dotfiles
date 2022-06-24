import { Application } from "./application";
import { Binding } from "./binding";
import { BindingObserverDelegate } from "./binding_observer";
import { EventListener } from "./event_listener";
export declare class Dispatcher implements BindingObserverDelegate {
    readonly application: Application;
    private eventListenerMaps;
    private started;
    constructor(application: Application);
    start(): void;
    stop(): void;
    get eventListeners(): EventListener[];
    bindingConnected(binding: Binding): void;
    bindingDisconnected(binding: Binding): void;
    handleError(error: Error, message: string, detail?: object): void;
    private fetchEventListenerForBinding;
    private fetchEventListener;
    private createEventListener;
    private fetchEventListenerMapForEventTarget;
    private cacheKey;
}
