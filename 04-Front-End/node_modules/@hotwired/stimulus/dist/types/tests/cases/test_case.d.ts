/// <reference types="qunit" />
export declare class TestCase {
    readonly assert: Assert;
    static defineModule(moduleName?: string, qUnit?: QUnit): void;
    static getTest(testName: string): (assert: Assert) => Promise<void>;
    static runTest(testName: string, assert: Assert): Promise<void>;
    static shouldSkipTest(testName: string): boolean;
    static get manifest(): string[][];
    static get testNames(): string[];
    static get testPropertyNames(): string[];
    constructor(assert: Assert);
    runTest(testName: string): Promise<void>;
    runTestBody(testName: string): Promise<any>;
    setup(): Promise<void>;
    teardown(): Promise<void>;
}
