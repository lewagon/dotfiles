import { Controller } from "../../core/controller";
declare class BaseTargetController extends Controller {
    static targets: string[];
    alphaTarget: Element | null;
    alphaTargets: Element[];
    hasAlphaTarget: boolean;
}
export declare class TargetController extends BaseTargetController {
    static classes: string[];
    static targets: string[];
    static values: {
        inputTargetConnectedCallCount: NumberConstructor;
        inputTargetDisconnectedCallCount: NumberConstructor;
        recursiveTargetConnectedCallCount: NumberConstructor;
        recursiveTargetDisconnectedCallCount: NumberConstructor;
    };
    betaTarget: Element | null;
    betaTargets: Element[];
    hasBetaTarget: boolean;
    inputTarget: Element | null;
    inputTargets: Element[];
    hasInputTarget: boolean;
    hasConnectedClass: boolean;
    hasDisconnectedClass: boolean;
    connectedClass: string;
    disconnectedClass: string;
    inputTargetConnectedCallCountValue: number;
    inputTargetDisconnectedCallCountValue: number;
    recursiveTargetConnectedCallCountValue: number;
    recursiveTargetDisconnectedCallCountValue: number;
    inputTargetConnected(element: Element): void;
    inputTargetDisconnected(element: Element): void;
    recursiveTargetConnected(element: Element): void;
    recursiveTargetDisconnected(element: Element): void;
}
export {};
