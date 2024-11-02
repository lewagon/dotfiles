import { Controller } from '@hotwired/stimulus';
export interface DebounceOptions {
    wait?: number;
    name?: string;
}
export declare const debounce: (fn: Function, wait?: number) => (this: any) => any;
export declare const useDebounce: (composableController: Controller, options?: DebounceOptions) => void;
