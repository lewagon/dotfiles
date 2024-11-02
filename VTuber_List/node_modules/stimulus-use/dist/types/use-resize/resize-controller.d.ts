import { Controller, Context } from '@hotwired/stimulus';
import { ResizeOptions } from './use-resize';
export declare class ResizeComposableController extends Controller {
    resize?: (contentRect: DOMRectReadOnly) => void;
}
export declare class ResizeController extends ResizeComposableController {
    options?: ResizeOptions;
    constructor(context: Context);
    observe: () => void;
    unobserve: () => void;
}
