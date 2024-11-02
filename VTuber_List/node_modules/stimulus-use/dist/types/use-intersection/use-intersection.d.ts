import { Controller } from '@hotwired/stimulus';
export interface IntersectionOptions extends IntersectionObserverInit {
    element?: Element;
    dispatchEvent?: boolean;
    eventPrefix?: boolean | string;
    visibleAttribute?: string;
}
export declare const useIntersection: (composableController: Controller, options?: IntersectionOptions) => readonly [() => void, () => void];
