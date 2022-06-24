import { Context } from "./context";
import { StringMapObserverDelegate } from "../mutation-observers";
export declare class ValueObserver implements StringMapObserverDelegate {
    readonly context: Context;
    readonly receiver: any;
    private stringMapObserver;
    private valueDescriptorMap;
    constructor(context: Context, receiver: any);
    start(): void;
    stop(): void;
    get element(): Element;
    get controller(): import("./controller").Controller;
    getStringMapKeyForAttribute(attributeName: string): string | undefined;
    stringMapKeyAdded(key: string, attributeName: string): void;
    stringMapValueChanged(value: string, name: string, oldValue: string): void;
    stringMapKeyRemoved(key: string, attributeName: string, oldValue: string): void;
    private invokeChangedCallbacksForDefaultValues;
    private invokeChangedCallback;
    private get valueDescriptors();
    private get valueDescriptorNameMap();
    private hasValue;
}
