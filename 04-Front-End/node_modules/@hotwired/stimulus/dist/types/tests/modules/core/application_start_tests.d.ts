import { DOMTestCase } from "../../cases";
export default class ApplicationStartTests extends DOMTestCase {
    iframe: HTMLIFrameElement;
    setup(): Promise<void>;
    "test starting an application when the document is loading"(): Promise<void>;
    "test starting an application when the document is interactive"(): Promise<void>;
    "test starting an application when the document is complete"(): Promise<void>;
    private messageFromStartState;
    private assertIn;
}
