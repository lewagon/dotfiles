import { Token, ValueListObserver, ValueListObserverDelegate } from "../../../mutation-observers";
import { ObserverTestCase } from "../../cases/observer_test_case";
export interface Value {
    id: number;
    token: Token;
}
export default class ValueListObserverTests extends ObserverTestCase implements ValueListObserverDelegate<Value> {
    attributeName: string;
    fixtureHTML: string;
    observer: ValueListObserver<Value>;
    lastValueId: number;
    "test elementMatchedValue"(): Promise<void>;
    "test adding a token to the right"(): Promise<void>;
    "test adding a token to the left"(): Promise<void>;
    "test removing a token from the right"(): Promise<void>;
    "test removing a token from the left"(): Promise<void>;
    "test removing the only token"(): Promise<void>;
    "test removing and re-adding a token produces a new value"(): Promise<void>;
    get element(): Element;
    set valueString(value: string);
    parseValueForToken(token: Token): {
        id: number;
        token: Token;
    };
    elementMatchedValue(element: Element, value: Value): void;
    elementUnmatchedValue(element: Element, value: Value): void;
}
