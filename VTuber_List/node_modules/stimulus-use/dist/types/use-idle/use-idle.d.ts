import { Controller } from '@hotwired/stimulus';
export interface IdleOptions {
    ms?: number;
    initialState?: boolean;
    events?: string[];
    dispatchEvent?: boolean;
    eventPrefix?: boolean | string;
}
export declare const useIdle: (composableController: Controller, options?: IdleOptions) => readonly [() => void, () => void];
