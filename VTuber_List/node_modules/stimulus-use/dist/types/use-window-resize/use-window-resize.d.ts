import { Controller } from '@hotwired/stimulus';
export interface WindowResizePayload {
    height: number;
    width: number;
    event?: Event;
}
export declare const useWindowResize: (composableController: Controller) => readonly [() => void, () => void];
