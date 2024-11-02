import { Controller } from '@hotwired/stimulus';
export interface MetaOptions {
    suffix: boolean;
}
export declare const useMeta: (controller: Controller, options?: MetaOptions) => void;
