import { Definition } from "@hotwired/stimulus";
export interface ECMAScriptModule {
    __esModule: boolean;
    default?: object;
}
export declare function definitionsFromContext(context: any): Definition[];
export declare function definitionForModuleWithContextAndKey(context: any, key: string): Definition | undefined;
export declare function definitionForModuleAndIdentifier(module: ECMAScriptModule, identifier: string): Definition | undefined;
export declare function identifierForContextKey(key: string): string | undefined;
