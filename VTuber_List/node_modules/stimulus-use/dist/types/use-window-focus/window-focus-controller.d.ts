import { Controller, Context } from '@hotwired/stimulus';
import { WindowFocusOptions } from './use-window-focus';
export declare class WindowFocusComposableController extends Controller {
    hasFocus: boolean;
    focus?: () => void;
    unfocus?: () => void;
}
export declare class WindowFocusController extends WindowFocusComposableController {
    options?: WindowFocusOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
