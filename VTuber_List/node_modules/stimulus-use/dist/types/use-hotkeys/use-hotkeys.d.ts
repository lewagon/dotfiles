import { Controller } from '@hotwired/stimulus';
import { KeyHandler } from 'hotkeys-js';
import { StimulusUse, StimulusUseOptions } from '../stimulus-use';
type Options = {
    scope?: string;
    element?: HTMLElement | null;
    keyup?: boolean | null;
    keydown?: boolean | null;
    splitKey?: string;
};
type HotkeyDefinition = {
    handler: KeyHandler;
    options: Options;
};
type SimpleHotkeyDefinition = (KeyHandler | HTMLElement)[];
export interface HotkeyDefinitions {
    [hotkey: string]: HotkeyDefinition | SimpleHotkeyDefinition;
}
export interface HotkeysOptions extends StimulusUseOptions {
    hotkeys?: HotkeyDefinitions;
    filter?: (e: KeyboardEvent) => boolean;
}
export declare class UseHotkeys extends StimulusUse {
    controller: Controller;
    hotkeysOptions: HotkeysOptions;
    constructor(controller: Controller, hotkeysOptions: HotkeysOptions);
    bind: () => void;
    unbind: () => void;
    private enhanceController;
}
export declare const useHotkeys: (controller: Controller, options: HotkeysOptions | HotkeyDefinitions) => UseHotkeys;
export {};
