import { Controller, Context } from '@hotwired/stimulus';
import { DispatchOptions } from '../use-dispatch';
export declare class ApplicationController extends Controller {
    options?: DispatchOptions;
    readonly isPreview: boolean;
    readonly isConnected: boolean;
    readonly csrfToken: string;
    constructor(context: Context);
    metaValue: (name: string) => string;
    dispatch: (eventName: String, detail: any) => CustomEvent;
}
