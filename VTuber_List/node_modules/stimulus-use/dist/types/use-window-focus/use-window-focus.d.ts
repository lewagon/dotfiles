import { Controller } from '@hotwired/stimulus';
import { StimulusUse, StimulusUseOptions } from '../stimulus-use';
import { WindowFocusComposableController } from './window-focus-controller';
export interface WindowFocusOptions extends StimulusUseOptions {
    interval?: number;
}
export declare class UseWindowFocus extends StimulusUse {
    controller: WindowFocusComposableController;
    intervalDuration: number;
    interval: any;
    constructor(controller: WindowFocusComposableController, options?: WindowFocusOptions);
    observe: () => void;
    unobserve: () => void;
    private becomesUnfocused;
    private becomesFocused;
    private handleWindowFocusChange;
    private enhanceController;
}
export declare const useWindowFocus: (composableController: Controller, options?: WindowFocusOptions) => readonly [() => void, () => void];
