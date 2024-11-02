import { Controller } from '@hotwired/stimulus';
import { DispatchOptions } from '../use-dispatch/index';
export type ApplicationOptions = DispatchOptions & {
    overwriteDispatch?: boolean;
};
export declare const useApplication: (controller: Controller, options?: ApplicationOptions) => void;
