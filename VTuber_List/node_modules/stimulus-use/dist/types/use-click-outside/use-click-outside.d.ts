import { Controller } from '@hotwired/stimulus';
export interface ClickOutsideOptions {
    element?: Element;
    events?: string[];
    onlyVisible?: boolean;
    dispatchEvent?: boolean;
    eventPrefix?: boolean | string;
}
export declare const useClickOutside: (composableController: Controller, options?: ClickOutsideOptions) => readonly [() => void, () => void];
