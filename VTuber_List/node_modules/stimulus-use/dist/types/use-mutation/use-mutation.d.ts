import { StimulusUse, StimulusUseOptions } from '../stimulus-use';
import { MutationComposableController } from './mutation-controller';
export interface MutationControllerOptions {
    element?: Element;
}
export interface MutationOptions extends MutationObserverInit, MutationControllerOptions, StimulusUseOptions {
}
export declare class UseMutation extends StimulusUse {
    controller: MutationComposableController;
    observer: MutationObserver;
    options: MutationOptions;
    constructor(controller: MutationComposableController, options?: MutationOptions);
    observe: () => void;
    unobserve: () => void;
    private mutation;
    private enhanceController;
}
export declare const useMutation: (controller: MutationComposableController, options?: MutationOptions) => readonly [() => void, () => void];
