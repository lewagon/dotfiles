import { Context, Controller } from '@hotwired/stimulus';
import { ClickOutsideOptions } from './use-click-outside';
export declare class ClickOutsideComposableController extends Controller {
    clickOutside?: (event: Event) => void;
}
export declare class ClickOutsideController extends ClickOutsideComposableController {
    options?: ClickOutsideOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
