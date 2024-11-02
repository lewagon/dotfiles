import { Controller } from '@hotwired/stimulus';
import { StimulusUse, StimulusUseOptions } from '../stimulus-use';
type MediaQueryDefinitions = Record<string, string>;
export interface MatchMediaPayload {
    name: string;
    media: string;
    matches: boolean;
    event?: MediaQueryListEvent;
}
export interface MatchMediaOptions extends StimulusUseOptions {
    mediaQueries?: MediaQueryDefinitions;
}
export declare class UseMatchMedia extends StimulusUse {
    mediaQueries: MediaQueryDefinitions;
    matches: Array<MediaQueryList>;
    controller: Controller;
    constructor(controller: Controller, options?: MatchMediaOptions);
    callback: (event: MediaQueryListEvent) => void;
    changed: (payload: MatchMediaPayload) => void;
    observe: () => void;
    unobserve: () => void;
    private enhanceController;
}
export declare const useMatchMedia: (controller: Controller, options?: MatchMediaOptions) => readonly [() => void, () => void];
export {};
