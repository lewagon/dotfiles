import { Controller, Context } from '@hotwired/stimulus';
import { WindowResizePayload } from './use-window-resize';
export declare class WindowResizeComposableController extends Controller {
    windowResize?: (payload: WindowResizePayload) => void;
}
export declare class WindowResizeController extends WindowResizeComposableController {
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
