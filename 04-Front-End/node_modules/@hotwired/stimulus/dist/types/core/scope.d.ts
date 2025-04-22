import { ClassMap } from "./class_map";
import { DataMap } from "./data_map";
import { Guide } from "./guide";
import { Logger } from "./logger";
import { Schema } from "./schema";
import { TargetSet } from "./target_set";
export declare class Scope {
    readonly schema: Schema;
    readonly element: Element;
    readonly identifier: string;
    readonly guide: Guide;
    readonly targets: TargetSet;
    readonly classes: ClassMap;
    readonly data: DataMap;
    constructor(schema: Schema, element: Element, identifier: string, logger: Logger);
    findElement(selector: string): Element | undefined;
    findAllElements(selector: string): Element[];
    containsElement: (element: Element) => boolean;
    private queryElements;
    private get controllerSelector();
}
