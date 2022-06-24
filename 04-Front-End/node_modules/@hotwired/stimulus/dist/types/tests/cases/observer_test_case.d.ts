import { DOMTestCase } from "./dom_test_case";
export interface Observer {
    start(): void;
    stop(): void;
}
export declare class ObserverTestCase extends DOMTestCase {
    observer: Observer;
    calls: any[][];
    private setupCallCount;
    setup(): Promise<void>;
    teardown(): Promise<void>;
    get testCalls(): any[][];
    recordCall(methodName: string, ...args: any[]): void;
}
