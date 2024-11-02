import { Controller } from '@hotwired/stimulus';
import { StimulusUse, StimulusUseOptions } from '../stimulus-use';
export interface DispatchOptions extends StimulusUseOptions {
    element?: Element;
    eventPrefix?: boolean | string;
    bubbles?: boolean;
    cancelable?: boolean;
}
export declare class UseDispatch extends StimulusUse {
    eventPrefix: boolean | string;
    bubbles: boolean;
    cancelable: boolean;
    constructor(controller: Controller, options?: DispatchOptions);
    dispatch: (eventName: string, detail?: {}) => CustomEvent;
    private enhanceController;
}
export declare const useDispatch: (controller: Controller, options?: DispatchOptions) => UseDispatch;
