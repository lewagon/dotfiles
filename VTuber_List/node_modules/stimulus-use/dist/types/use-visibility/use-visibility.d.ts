import { Controller } from '@hotwired/stimulus';
import { StimulusUse, StimulusUseOptions } from '../stimulus-use';
import { VisibilityComposableController } from './visibility-controller';
export interface VisibilityOptions extends StimulusUseOptions {
}
export declare class UseVisibility extends StimulusUse {
    controller: VisibilityComposableController;
    constructor(controller: VisibilityComposableController, options?: VisibilityOptions);
    observe: () => void;
    unobserve: () => void;
    private becomesInvisible;
    private becomesVisible;
    private handleVisibilityChange;
    private enhanceController;
}
export declare const useVisibility: (composableController: Controller, options?: VisibilityOptions) => readonly [() => void, () => void];
