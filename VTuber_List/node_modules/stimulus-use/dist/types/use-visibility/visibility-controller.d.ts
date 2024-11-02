import { Controller, Context } from '@hotwired/stimulus';
import { VisibilityOptions } from './use-visibility';
export declare class VisibilityComposableController extends Controller {
    isVisible: boolean;
    visible?: () => void;
    invisible?: () => void;
}
export declare class VisibilityController extends VisibilityComposableController {
    options?: VisibilityOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
