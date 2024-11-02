import { Controller } from '@hotwired/stimulus';
export interface ResizeOptions {
    element?: Element;
    dispatchEvent?: boolean;
    eventPrefix?: boolean | string;
}
export declare const useResize: (composableController: Controller, options?: ResizeOptions) => readonly [() => void, () => void];
