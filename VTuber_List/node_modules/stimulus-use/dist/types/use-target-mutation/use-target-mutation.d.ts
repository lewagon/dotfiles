import { Controller } from '@hotwired/stimulus';
import { StimulusUse, StimulusUseOptions } from '../stimulus-use';
import { TargetMutationComposableController } from './target-mutation-controller';
export interface TargetMutationOptions extends StimulusUseOptions {
    targets?: string[];
}
export declare class UseTargetMutation extends StimulusUse {
    controller: TargetMutationComposableController;
    observer: MutationObserver;
    identifier: string;
    identifierPrefix: string;
    targets: string[];
    prefixedTargets: string[];
    options: TargetMutationOptions;
    targetSelector: string;
    scopedTargetSelector: string;
    constructor(controller: TargetMutationComposableController, options?: TargetMutationOptions);
    observe: () => void;
    unobserve: () => void;
    mutation: (entries: MutationRecord[]) => void;
    private processNodeDOMMutation;
    private findTargetInAncestry;
    private targetAdded;
    private targetRemoved;
    private targetChanged;
    private targetsUsedByThisControllerFromNode;
    private targetsUsedByThisController;
    private stripIdentifierPrefix;
    private enhanceController;
}
export declare const useTargetMutation: (composableController: Controller, options?: TargetMutationOptions) => (() => void)[];
