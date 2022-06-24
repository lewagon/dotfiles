import { Controller } from "../../core/controller";
declare class BaseClassController extends Controller {
    static classes: string[];
    readonly activeClass: string;
    readonly activeClasses: string[];
    readonly hasActiveClass: boolean;
}
export declare class ClassController extends BaseClassController {
    static classes: string[];
    readonly hasEnabledClass: boolean;
    readonly enabledClass: string;
    readonly enabledClasses: string[];
    readonly loadingClass: string;
    readonly successClass: string;
    readonly successClasses: string[];
}
export {};
