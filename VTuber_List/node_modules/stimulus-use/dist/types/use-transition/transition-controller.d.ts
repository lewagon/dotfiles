import { Controller, Context } from '@hotwired/stimulus';
import { TransitionOptions } from './use-transition';
export declare class TransitionComposableController extends Controller {
    transitioned: boolean;
    enter?: (event: Event | undefined) => void;
    leave?: (event: Event | undefined) => void;
    toggleTransition?: (event: Event | undefined) => void;
}
export declare class TransitionController extends TransitionComposableController {
    options?: TransitionOptions;
    constructor(context: Context);
}
