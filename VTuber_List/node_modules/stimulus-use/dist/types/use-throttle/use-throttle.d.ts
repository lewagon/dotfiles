import { Controller } from '@hotwired/stimulus';
export interface ThrottleOptions {
    wait?: number;
    name?: string;
}
export declare function throttle(func: Function, wait?: number): Function;
export declare const useThrottle: (composableController: Controller, options?: ThrottleOptions) => void;
