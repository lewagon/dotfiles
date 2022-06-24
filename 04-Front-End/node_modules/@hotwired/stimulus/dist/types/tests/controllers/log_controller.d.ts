import { ActionEvent } from "../../core/action_event";
import { Controller } from "../../core/controller";
export declare type ActionLogEntry = {
    name: string;
    controller: Controller;
    identifier: string;
    eventType: string;
    currentTarget: EventTarget | null;
    params: {
        [key: string]: any;
    };
    defaultPrevented: boolean;
    passive: boolean;
};
export declare class LogController extends Controller {
    static actionLog: ActionLogEntry[];
    initializeCount: number;
    connectCount: number;
    disconnectCount: number;
    initialize(): void;
    connect(): void;
    disconnect(): void;
    log(event: ActionEvent): void;
    log2(event: ActionEvent): void;
    log3(event: ActionEvent): void;
    logPassive(event: ActionEvent): void;
    stop(event: ActionEvent): void;
    get actionLog(): ActionLogEntry[];
    private recordAction;
}
