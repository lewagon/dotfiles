export interface Schema {
    controllerAttribute: string;
    actionAttribute: string;
    targetAttribute: string;
    targetAttributeForScope(identifier: string): string;
}
export declare const defaultSchema: Schema;
