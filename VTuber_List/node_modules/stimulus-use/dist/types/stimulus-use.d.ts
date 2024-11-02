import { Controller } from '@hotwired/stimulus';
import { Logger } from './logger';
export interface StimulusUseOptions {
    debug?: boolean;
    logger?: Logger;
    dispatchEvent?: Boolean;
    eventPrefix?: boolean | string;
    element?: Element;
}
export declare class StimulusUse {
    controller: Controller;
    controllerInitialize: Function;
    controllerConnect: Function;
    controllerDisconnect: Function;
    debug: boolean;
    logger: Logger;
    controllerId: string | undefined;
    dispatchEvent?: Boolean;
    eventPrefix?: boolean | string;
    targetElement: Element;
    constructor(controller: Controller, options?: StimulusUseOptions);
    log: (functionName: string, args: any) => void;
    warn: (message: string) => void;
    dispatch: (eventName: string, details?: any) => void;
    call: (methodName: string, args?: any) => any;
    private extendedEvent;
    private composeEventName;
}
