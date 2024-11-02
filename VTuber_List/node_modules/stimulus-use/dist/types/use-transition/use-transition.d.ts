import { Controller } from '@hotwired/stimulus';
export interface TransitionOptions {
    element?: Element;
    transitioned?: boolean;
    enterActive?: string;
    enterFrom?: string;
    enterTo?: string;
    leaveActive?: string;
    leaveFrom?: string;
    leaveTo?: string;
    hiddenClass?: string;
    leaveAfter?: number;
    preserveOriginalClass?: boolean;
    removeToClasses?: boolean;
}
export declare const useTransition: (composableController: Controller, options?: TransitionOptions) => ((event: Event) => void)[] | undefined;
