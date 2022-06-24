import { ControllerConstructor } from "./controller";
export interface Definition {
    identifier: string;
    controllerConstructor: ControllerConstructor;
}
export declare function blessDefinition(definition: Definition): Definition;
