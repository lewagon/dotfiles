import { Context, Controller } from '@hotwired/stimulus';
import { TargetMutationOptions } from './use-target-mutation';
export declare class TargetMutationComposableController extends Controller {
    [index: string]: any;
}
export declare class TargetMutationController extends TargetMutationComposableController {
    options: TargetMutationOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
