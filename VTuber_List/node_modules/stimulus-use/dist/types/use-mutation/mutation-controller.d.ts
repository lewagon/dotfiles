import { Context, Controller } from '@hotwired/stimulus';
import { MutationOptions } from './use-mutation';
export declare class MutationComposableController extends Controller {
    mutate?: (entries: MutationRecord[]) => void;
}
export declare class MutationController extends MutationComposableController {
    options?: MutationOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
