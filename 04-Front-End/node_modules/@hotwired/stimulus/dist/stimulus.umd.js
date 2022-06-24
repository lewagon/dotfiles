/*
Stimulus 3.0.1
Copyright © 2021 Basecamp, LLC
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Stimulus = {}));
}(this, (function (exports) { 'use strict';

    class EventListener {
        constructor(eventTarget, eventName, eventOptions) {
            this.eventTarget = eventTarget;
            this.eventName = eventName;
            this.eventOptions = eventOptions;
            this.unorderedBindings = new Set();
        }
        connect() {
            this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
        }
        disconnect() {
            this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
        }
        bindingConnected(binding) {
            this.unorderedBindings.add(binding);
        }
        bindingDisconnected(binding) {
            this.unorderedBindings.delete(binding);
        }
        handleEvent(event) {
            const extendedEvent = extendEvent(event);
            for (const binding of this.bindings) {
                if (extendedEvent.immediatePropagationStopped) {
                    break;
                }
                else {
                    binding.handleEvent(extendedEvent);
                }
            }
        }
        get bindings() {
            return Array.from(this.unorderedBindings).sort((left, right) => {
                const leftIndex = left.index, rightIndex = right.index;
                return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
            });
        }
    }
    function extendEvent(event) {
        if ("immediatePropagationStopped" in event) {
            return event;
        }
        else {
            const { stopImmediatePropagation } = event;
            return Object.assign(event, {
                immediatePropagationStopped: false,
                stopImmediatePropagation() {
                    this.immediatePropagationStopped = true;
                    stopImmediatePropagation.call(this);
                }
            });
        }
    }

    class Dispatcher {
        constructor(application) {
            this.application = application;
            this.eventListenerMaps = new Map;
            this.started = false;
        }
        start() {
            if (!this.started) {
                this.started = true;
                this.eventListeners.forEach(eventListener => eventListener.connect());
            }
        }
        stop() {
            if (this.started) {
                this.started = false;
                this.eventListeners.forEach(eventListener => eventListener.disconnect());
            }
        }
        get eventListeners() {
            return Array.from(this.eventListenerMaps.values())
                .reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
        }
        bindingConnected(binding) {
            this.fetchEventListenerForBinding(binding).bindingConnected(binding);
        }
        bindingDisconnected(binding) {
            this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
        }
        handleError(error, message, detail = {}) {
            this.application.handleError(error, `Error ${message}`, detail);
        }
        fetchEventListenerForBinding(binding) {
            const { eventTarget, eventName, eventOptions } = binding;
            return this.fetchEventListener(eventTarget, eventName, eventOptions);
        }
        fetchEventListener(eventTarget, eventName, eventOptions) {
            const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
            const cacheKey = this.cacheKey(eventName, eventOptions);
            let eventListener = eventListenerMap.get(cacheKey);
            if (!eventListener) {
                eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
                eventListenerMap.set(cacheKey, eventListener);
            }
            return eventListener;
        }
        createEventListener(eventTarget, eventName, eventOptions) {
            const eventListener = new EventListener(eventTarget, eventName, eventOptions);
            if (this.started) {
                eventListener.connect();
            }
            return eventListener;
        }
        fetchEventListenerMapForEventTarget(eventTarget) {
            let eventListenerMap = this.eventListenerMaps.get(eventTarget);
            if (!eventListenerMap) {
                eventListenerMap = new Map;
                this.eventListenerMaps.set(eventTarget, eventListenerMap);
            }
            return eventListenerMap;
        }
        cacheKey(eventName, eventOptions) {
            const parts = [eventName];
            Object.keys(eventOptions).sort().forEach(key => {
                parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
            });
            return parts.join(":");
        }
    }

    const descriptorPattern = /^((.+?)(@(window|document))?->)?(.+?)(#([^:]+?))(:(.+))?$/;
    function parseActionDescriptorString(descriptorString) {
        const source = descriptorString.trim();
        const matches = source.match(descriptorPattern) || [];
        return {
            eventTarget: parseEventTarget(matches[4]),
            eventName: matches[2],
            eventOptions: matches[9] ? parseEventOptions(matches[9]) : {},
            identifier: matches[5],
            methodName: matches[7]
        };
    }
    function parseEventTarget(eventTargetName) {
        if (eventTargetName == "window") {
            return window;
        }
        else if (eventTargetName == "document") {
            return document;
        }
    }
    function parseEventOptions(eventOptions) {
        return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
    }
    function stringifyEventTarget(eventTarget) {
        if (eventTarget == window) {
            return "window";
        }
        else if (eventTarget == document) {
            return "document";
        }
    }

    function camelize(value) {
        return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
    }
    function capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    function dasherize(value) {
        return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
    }
    function tokenize(value) {
        return value.match(/[^\s]+/g) || [];
    }

    class Action {
        constructor(element, index, descriptor) {
            this.element = element;
            this.index = index;
            this.eventTarget = descriptor.eventTarget || element;
            this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
            this.eventOptions = descriptor.eventOptions || {};
            this.identifier = descriptor.identifier || error("missing identifier");
            this.methodName = descriptor.methodName || error("missing method name");
        }
        static forToken(token) {
            return new this(token.element, token.index, parseActionDescriptorString(token.content));
        }
        toString() {
            const eventNameSuffix = this.eventTargetName ? `@${this.eventTargetName}` : "";
            return `${this.eventName}${eventNameSuffix}->${this.identifier}#${this.methodName}`;
        }
        get params() {
            if (this.eventTarget instanceof Element) {
                return this.getParamsFromEventTargetAttributes(this.eventTarget);
            }
            else {
                return {};
            }
        }
        getParamsFromEventTargetAttributes(eventTarget) {
            const params = {};
            const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`);
            const attributes = Array.from(eventTarget.attributes);
            attributes.forEach(({ name, value }) => {
                const match = name.match(pattern);
                const key = match && match[1];
                if (key) {
                    Object.assign(params, { [camelize(key)]: typecast(value) });
                }
            });
            return params;
        }
        get eventTargetName() {
            return stringifyEventTarget(this.eventTarget);
        }
    }
    const defaultEventNames = {
        "a": e => "click",
        "button": e => "click",
        "form": e => "submit",
        "details": e => "toggle",
        "input": e => e.getAttribute("type") == "submit" ? "click" : "input",
        "select": e => "change",
        "textarea": e => "input"
    };
    function getDefaultEventNameForElement(element) {
        const tagName = element.tagName.toLowerCase();
        if (tagName in defaultEventNames) {
            return defaultEventNames[tagName](element);
        }
    }
    function error(message) {
        throw new Error(message);
    }
    function typecast(value) {
        try {
            return JSON.parse(value);
        }
        catch (o_O) {
            return value;
        }
    }

    class Binding {
        constructor(context, action) {
            this.context = context;
            this.action = action;
        }
        get index() {
            return this.action.index;
        }
        get eventTarget() {
            return this.action.eventTarget;
        }
        get eventOptions() {
            return this.action.eventOptions;
        }
        get identifier() {
            return this.context.identifier;
        }
        handleEvent(event) {
            if (this.willBeInvokedByEvent(event)) {
                this.invokeWithEvent(event);
            }
        }
        get eventName() {
            return this.action.eventName;
        }
        get method() {
            const method = this.controller[this.methodName];
            if (typeof method == "function") {
                return method;
            }
            throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
        }
        invokeWithEvent(event) {
            const { target, currentTarget } = event;
            try {
                const { params } = this.action;
                const actionEvent = Object.assign(event, { params });
                this.method.call(this.controller, actionEvent);
                this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
            }
            catch (error) {
                const { identifier, controller, element, index } = this;
                const detail = { identifier, controller, element, index, event };
                this.context.handleError(error, `invoking action "${this.action}"`, detail);
            }
        }
        willBeInvokedByEvent(event) {
            const eventTarget = event.target;
            if (this.element === eventTarget) {
                return true;
            }
            else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
                return this.scope.containsElement(eventTarget);
            }
            else {
                return this.scope.containsElement(this.action.element);
            }
        }
        get controller() {
            return this.context.controller;
        }
        get methodName() {
            return this.action.methodName;
        }
        get element() {
            return this.scope.element;
        }
        get scope() {
            return this.context.scope;
        }
    }

    class ElementObserver {
        constructor(element, delegate) {
            this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
            this.element = element;
            this.started = false;
            this.delegate = delegate;
            this.elements = new Set;
            this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
        }
        start() {
            if (!this.started) {
                this.started = true;
                this.mutationObserver.observe(this.element, this.mutationObserverInit);
                this.refresh();
            }
        }
        pause(callback) {
            if (this.started) {
                this.mutationObserver.disconnect();
                this.started = false;
            }
            callback();
            if (!this.started) {
                this.mutationObserver.observe(this.element, this.mutationObserverInit);
                this.started = true;
            }
        }
        stop() {
            if (this.started) {
                this.mutationObserver.takeRecords();
                this.mutationObserver.disconnect();
                this.started = false;
            }
        }
        refresh() {
            if (this.started) {
                const matches = new Set(this.matchElementsInTree());
                for (const element of Array.from(this.elements)) {
                    if (!matches.has(element)) {
                        this.removeElement(element);
                    }
                }
                for (const element of Array.from(matches)) {
                    this.addElement(element);
                }
            }
        }
        processMutations(mutations) {
            if (this.started) {
                for (const mutation of mutations) {
                    this.processMutation(mutation);
                }
            }
        }
        processMutation(mutation) {
            if (mutation.type == "attributes") {
                this.processAttributeChange(mutation.target, mutation.attributeName);
            }
            else if (mutation.type == "childList") {
                this.processRemovedNodes(mutation.removedNodes);
                this.processAddedNodes(mutation.addedNodes);
            }
        }
        processAttributeChange(node, attributeName) {
            const element = node;
            if (this.elements.has(element)) {
                if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
                    this.delegate.elementAttributeChanged(element, attributeName);
                }
                else {
                    this.removeElement(element);
                }
            }
            else if (this.matchElement(element)) {
                this.addElement(element);
            }
        }
        processRemovedNodes(nodes) {
            for (const node of Array.from(nodes)) {
                const element = this.elementFromNode(node);
                if (element) {
                    this.processTree(element, this.removeElement);
                }
            }
        }
        processAddedNodes(nodes) {
            for (const node of Array.from(nodes)) {
                const element = this.elementFromNode(node);
                if (element && this.elementIsActive(element)) {
                    this.processTree(element, this.addElement);
                }
            }
        }
        matchElement(element) {
            return this.delegate.matchElement(element);
        }
        matchElementsInTree(tree = this.element) {
            return this.delegate.matchElementsInTree(tree);
        }
        processTree(tree, processor) {
            for (const element of this.matchElementsInTree(tree)) {
                processor.call(this, element);
            }
        }
        elementFromNode(node) {
            if (node.nodeType == Node.ELEMENT_NODE) {
                return node;
            }
        }
        elementIsActive(element) {
            if (element.isConnected != this.element.isConnected) {
                return false;
            }
            else {
                return this.element.contains(element);
            }
        }
        addElement(element) {
            if (!this.elements.has(element)) {
                if (this.elementIsActive(element)) {
                    this.elements.add(element);
                    if (this.delegate.elementMatched) {
                        this.delegate.elementMatched(element);
                    }
                }
            }
        }
        removeElement(element) {
            if (this.elements.has(element)) {
                this.elements.delete(element);
                if (this.delegate.elementUnmatched) {
                    this.delegate.elementUnmatched(element);
                }
            }
        }
    }

    class AttributeObserver {
        constructor(element, attributeName, delegate) {
            this.attributeName = attributeName;
            this.delegate = delegate;
            this.elementObserver = new ElementObserver(element, this);
        }
        get element() {
            return this.elementObserver.element;
        }
        get selector() {
            return `[${this.attributeName}]`;
        }
        start() {
            this.elementObserver.start();
        }
        pause(callback) {
            this.elementObserver.pause(callback);
        }
        stop() {
            this.elementObserver.stop();
        }
        refresh() {
            this.elementObserver.refresh();
        }
        get started() {
            return this.elementObserver.started;
        }
        matchElement(element) {
            return element.hasAttribute(this.attributeName);
        }
        matchElementsInTree(tree) {
            const match = this.matchElement(tree) ? [tree] : [];
            const matches = Array.from(tree.querySelectorAll(this.selector));
            return match.concat(matches);
        }
        elementMatched(element) {
            if (this.delegate.elementMatchedAttribute) {
                this.delegate.elementMatchedAttribute(element, this.attributeName);
            }
        }
        elementUnmatched(element) {
            if (this.delegate.elementUnmatchedAttribute) {
                this.delegate.elementUnmatchedAttribute(element, this.attributeName);
            }
        }
        elementAttributeChanged(element, attributeName) {
            if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
                this.delegate.elementAttributeValueChanged(element, attributeName);
            }
        }
    }

    class StringMapObserver {
        constructor(element, delegate) {
            this.element = element;
            this.delegate = delegate;
            this.started = false;
            this.stringMap = new Map;
            this.mutationObserver = new MutationObserver(mutations => this.processMutations(mutations));
        }
        start() {
            if (!this.started) {
                this.started = true;
                this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
                this.refresh();
            }
        }
        stop() {
            if (this.started) {
                this.mutationObserver.takeRecords();
                this.mutationObserver.disconnect();
                this.started = false;
            }
        }
        refresh() {
            if (this.started) {
                for (const attributeName of this.knownAttributeNames) {
                    this.refreshAttribute(attributeName, null);
                }
            }
        }
        processMutations(mutations) {
            if (this.started) {
                for (const mutation of mutations) {
                    this.processMutation(mutation);
                }
            }
        }
        processMutation(mutation) {
            const attributeName = mutation.attributeName;
            if (attributeName) {
                this.refreshAttribute(attributeName, mutation.oldValue);
            }
        }
        refreshAttribute(attributeName, oldValue) {
            const key = this.delegate.getStringMapKeyForAttribute(attributeName);
            if (key != null) {
                if (!this.stringMap.has(attributeName)) {
                    this.stringMapKeyAdded(key, attributeName);
                }
                const value = this.element.getAttribute(attributeName);
                if (this.stringMap.get(attributeName) != value) {
                    this.stringMapValueChanged(value, key, oldValue);
                }
                if (value == null) {
                    const oldValue = this.stringMap.get(attributeName);
                    this.stringMap.delete(attributeName);
                    if (oldValue)
                        this.stringMapKeyRemoved(key, attributeName, oldValue);
                }
                else {
                    this.stringMap.set(attributeName, value);
                }
            }
        }
        stringMapKeyAdded(key, attributeName) {
            if (this.delegate.stringMapKeyAdded) {
                this.delegate.stringMapKeyAdded(key, attributeName);
            }
        }
        stringMapValueChanged(value, key, oldValue) {
            if (this.delegate.stringMapValueChanged) {
                this.delegate.stringMapValueChanged(value, key, oldValue);
            }
        }
        stringMapKeyRemoved(key, attributeName, oldValue) {
            if (this.delegate.stringMapKeyRemoved) {
                this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
            }
        }
        get knownAttributeNames() {
            return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
        }
        get currentAttributeNames() {
            return Array.from(this.element.attributes).map(attribute => attribute.name);
        }
        get recordedAttributeNames() {
            return Array.from(this.stringMap.keys());
        }
    }

    function add(map, key, value) {
        fetch(map, key).add(value);
    }
    function del(map, key, value) {
        fetch(map, key).delete(value);
        prune(map, key);
    }
    function fetch(map, key) {
        let values = map.get(key);
        if (!values) {
            values = new Set();
            map.set(key, values);
        }
        return values;
    }
    function prune(map, key) {
        const values = map.get(key);
        if (values != null && values.size == 0) {
            map.delete(key);
        }
    }

    class Multimap {
        constructor() {
            this.valuesByKey = new Map();
        }
        get keys() {
            return Array.from(this.valuesByKey.keys());
        }
        get values() {
            const sets = Array.from(this.valuesByKey.values());
            return sets.reduce((values, set) => values.concat(Array.from(set)), []);
        }
        get size() {
            const sets = Array.from(this.valuesByKey.values());
            return sets.reduce((size, set) => size + set.size, 0);
        }
        add(key, value) {
            add(this.valuesByKey, key, value);
        }
        delete(key, value) {
            del(this.valuesByKey, key, value);
        }
        has(key, value) {
            const values = this.valuesByKey.get(key);
            return values != null && values.has(value);
        }
        hasKey(key) {
            return this.valuesByKey.has(key);
        }
        hasValue(value) {
            const sets = Array.from(this.valuesByKey.values());
            return sets.some(set => set.has(value));
        }
        getValuesForKey(key) {
            const values = this.valuesByKey.get(key);
            return values ? Array.from(values) : [];
        }
        getKeysForValue(value) {
            return Array.from(this.valuesByKey)
                .filter(([key, values]) => values.has(value))
                .map(([key, values]) => key);
        }
    }

    class IndexedMultimap extends Multimap {
        constructor() {
            super();
            this.keysByValue = new Map;
        }
        get values() {
            return Array.from(this.keysByValue.keys());
        }
        add(key, value) {
            super.add(key, value);
            add(this.keysByValue, value, key);
        }
        delete(key, value) {
            super.delete(key, value);
            del(this.keysByValue, value, key);
        }
        hasValue(value) {
            return this.keysByValue.has(value);
        }
        getKeysForValue(value) {
            const set = this.keysByValue.get(value);
            return set ? Array.from(set) : [];
        }
    }

    class TokenListObserver {
        constructor(element, attributeName, delegate) {
            this.attributeObserver = new AttributeObserver(element, attributeName, this);
            this.delegate = delegate;
            this.tokensByElement = new Multimap;
        }
        get started() {
            return this.attributeObserver.started;
        }
        start() {
            this.attributeObserver.start();
        }
        pause(callback) {
            this.attributeObserver.pause(callback);
        }
        stop() {
            this.attributeObserver.stop();
        }
        refresh() {
            this.attributeObserver.refresh();
        }
        get element() {
            return this.attributeObserver.element;
        }
        get attributeName() {
            return this.attributeObserver.attributeName;
        }
        elementMatchedAttribute(element) {
            this.tokensMatched(this.readTokensForElement(element));
        }
        elementAttributeValueChanged(element) {
            const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
            this.tokensUnmatched(unmatchedTokens);
            this.tokensMatched(matchedTokens);
        }
        elementUnmatchedAttribute(element) {
            this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
        }
        tokensMatched(tokens) {
            tokens.forEach(token => this.tokenMatched(token));
        }
        tokensUnmatched(tokens) {
            tokens.forEach(token => this.tokenUnmatched(token));
        }
        tokenMatched(token) {
            this.delegate.tokenMatched(token);
            this.tokensByElement.add(token.element, token);
        }
        tokenUnmatched(token) {
            this.delegate.tokenUnmatched(token);
            this.tokensByElement.delete(token.element, token);
        }
        refreshTokensForElement(element) {
            const previousTokens = this.tokensByElement.getValuesForKey(element);
            const currentTokens = this.readTokensForElement(element);
            const firstDifferingIndex = zip(previousTokens, currentTokens)
                .findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
            if (firstDifferingIndex == -1) {
                return [[], []];
            }
            else {
                return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
            }
        }
        readTokensForElement(element) {
            const attributeName = this.attributeName;
            const tokenString = element.getAttribute(attributeName) || "";
            return parseTokenString(tokenString, element, attributeName);
        }
    }
    function parseTokenString(tokenString, element, attributeName) {
        return tokenString.trim().split(/\s+/).filter(content => content.length)
            .map((content, index) => ({ element, attributeName, content, index }));
    }
    function zip(left, right) {
        const length = Math.max(left.length, right.length);
        return Array.from({ length }, (_, index) => [left[index], right[index]]);
    }
    function tokensAreEqual(left, right) {
        return left && right && left.index == right.index && left.content == right.content;
    }

    class ValueListObserver {
        constructor(element, attributeName, delegate) {
            this.tokenListObserver = new TokenListObserver(element, attributeName, this);
            this.delegate = delegate;
            this.parseResultsByToken = new WeakMap;
            this.valuesByTokenByElement = new WeakMap;
        }
        get started() {
            return this.tokenListObserver.started;
        }
        start() {
            this.tokenListObserver.start();
        }
        stop() {
            this.tokenListObserver.stop();
        }
        refresh() {
            this.tokenListObserver.refresh();
        }
        get element() {
            return this.tokenListObserver.element;
        }
        get attributeName() {
            return this.tokenListObserver.attributeName;
        }
        tokenMatched(token) {
            const { element } = token;
            const { value } = this.fetchParseResultForToken(token);
            if (value) {
                this.fetchValuesByTokenForElement(element).set(token, value);
                this.delegate.elementMatchedValue(element, value);
            }
        }
        tokenUnmatched(token) {
            const { element } = token;
            const { value } = this.fetchParseResultForToken(token);
            if (value) {
                this.fetchValuesByTokenForElement(element).delete(token);
                this.delegate.elementUnmatchedValue(element, value);
            }
        }
        fetchParseResultForToken(token) {
            let parseResult = this.parseResultsByToken.get(token);
            if (!parseResult) {
                parseResult = this.parseToken(token);
                this.parseResultsByToken.set(token, parseResult);
            }
            return parseResult;
        }
        fetchValuesByTokenForElement(element) {
            let valuesByToken = this.valuesByTokenByElement.get(element);
            if (!valuesByToken) {
                valuesByToken = new Map;
                this.valuesByTokenByElement.set(element, valuesByToken);
            }
            return valuesByToken;
        }
        parseToken(token) {
            try {
                const value = this.delegate.parseValueForToken(token);
                return { value };
            }
            catch (error) {
                return { error };
            }
        }
    }

    class BindingObserver {
        constructor(context, delegate) {
            this.context = context;
            this.delegate = delegate;
            this.bindingsByAction = new Map;
        }
        start() {
            if (!this.valueListObserver) {
                this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
                this.valueListObserver.start();
            }
        }
        stop() {
            if (this.valueListObserver) {
                this.valueListObserver.stop();
                delete this.valueListObserver;
                this.disconnectAllActions();
            }
        }
        get element() {
            return this.context.element;
        }
        get identifier() {
            return this.context.identifier;
        }
        get actionAttribute() {
            return this.schema.actionAttribute;
        }
        get schema() {
            return this.context.schema;
        }
        get bindings() {
            return Array.from(this.bindingsByAction.values());
        }
        connectAction(action) {
            const binding = new Binding(this.context, action);
            this.bindingsByAction.set(action, binding);
            this.delegate.bindingConnected(binding);
        }
        disconnectAction(action) {
            const binding = this.bindingsByAction.get(action);
            if (binding) {
                this.bindingsByAction.delete(action);
                this.delegate.bindingDisconnected(binding);
            }
        }
        disconnectAllActions() {
            this.bindings.forEach(binding => this.delegate.bindingDisconnected(binding));
            this.bindingsByAction.clear();
        }
        parseValueForToken(token) {
            const action = Action.forToken(token);
            if (action.identifier == this.identifier) {
                return action;
            }
        }
        elementMatchedValue(element, action) {
            this.connectAction(action);
        }
        elementUnmatchedValue(element, action) {
            this.disconnectAction(action);
        }
    }

    class ValueObserver {
        constructor(context, receiver) {
            this.context = context;
            this.receiver = receiver;
            this.stringMapObserver = new StringMapObserver(this.element, this);
            this.valueDescriptorMap = this.controller.valueDescriptorMap;
            this.invokeChangedCallbacksForDefaultValues();
        }
        start() {
            this.stringMapObserver.start();
        }
        stop() {
            this.stringMapObserver.stop();
        }
        get element() {
            return this.context.element;
        }
        get controller() {
            return this.context.controller;
        }
        getStringMapKeyForAttribute(attributeName) {
            if (attributeName in this.valueDescriptorMap) {
                return this.valueDescriptorMap[attributeName].name;
            }
        }
        stringMapKeyAdded(key, attributeName) {
            const descriptor = this.valueDescriptorMap[attributeName];
            if (!this.hasValue(key)) {
                this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
            }
        }
        stringMapValueChanged(value, name, oldValue) {
            const descriptor = this.valueDescriptorNameMap[name];
            if (value === null)
                return;
            if (oldValue === null) {
                oldValue = descriptor.writer(descriptor.defaultValue);
            }
            this.invokeChangedCallback(name, value, oldValue);
        }
        stringMapKeyRemoved(key, attributeName, oldValue) {
            const descriptor = this.valueDescriptorNameMap[key];
            if (this.hasValue(key)) {
                this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
            }
            else {
                this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
            }
        }
        invokeChangedCallbacksForDefaultValues() {
            for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
                if (defaultValue != undefined && !this.controller.data.has(key)) {
                    this.invokeChangedCallback(name, writer(defaultValue), undefined);
                }
            }
        }
        invokeChangedCallback(name, rawValue, rawOldValue) {
            const changedMethodName = `${name}Changed`;
            const changedMethod = this.receiver[changedMethodName];
            if (typeof changedMethod == "function") {
                const descriptor = this.valueDescriptorNameMap[name];
                const value = descriptor.reader(rawValue);
                let oldValue = rawOldValue;
                if (rawOldValue) {
                    oldValue = descriptor.reader(rawOldValue);
                }
                changedMethod.call(this.receiver, value, oldValue);
            }
        }
        get valueDescriptors() {
            const { valueDescriptorMap } = this;
            return Object.keys(valueDescriptorMap).map(key => valueDescriptorMap[key]);
        }
        get valueDescriptorNameMap() {
            const descriptors = {};
            Object.keys(this.valueDescriptorMap).forEach(key => {
                const descriptor = this.valueDescriptorMap[key];
                descriptors[descriptor.name] = descriptor;
            });
            return descriptors;
        }
        hasValue(attributeName) {
            const descriptor = this.valueDescriptorNameMap[attributeName];
            const hasMethodName = `has${capitalize(descriptor.name)}`;
            return this.receiver[hasMethodName];
        }
    }

    class TargetObserver {
        constructor(context, delegate) {
            this.context = context;
            this.delegate = delegate;
            this.targetsByName = new Multimap;
        }
        start() {
            if (!this.tokenListObserver) {
                this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
                this.tokenListObserver.start();
            }
        }
        stop() {
            if (this.tokenListObserver) {
                this.disconnectAllTargets();
                this.tokenListObserver.stop();
                delete this.tokenListObserver;
            }
        }
        tokenMatched({ element, content: name }) {
            if (this.scope.containsElement(element)) {
                this.connectTarget(element, name);
            }
        }
        tokenUnmatched({ element, content: name }) {
            this.disconnectTarget(element, name);
        }
        connectTarget(element, name) {
            var _a;
            if (!this.targetsByName.has(name, element)) {
                this.targetsByName.add(name, element);
                (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name));
            }
        }
        disconnectTarget(element, name) {
            var _a;
            if (this.targetsByName.has(name, element)) {
                this.targetsByName.delete(name, element);
                (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name));
            }
        }
        disconnectAllTargets() {
            for (const name of this.targetsByName.keys) {
                for (const element of this.targetsByName.getValuesForKey(name)) {
                    this.disconnectTarget(element, name);
                }
            }
        }
        get attributeName() {
            return `data-${this.context.identifier}-target`;
        }
        get element() {
            return this.context.element;
        }
        get scope() {
            return this.context.scope;
        }
    }

    class Context {
        constructor(module, scope) {
            this.logDebugActivity = (functionName, detail = {}) => {
                const { identifier, controller, element } = this;
                detail = Object.assign({ identifier, controller, element }, detail);
                this.application.logDebugActivity(this.identifier, functionName, detail);
            };
            this.module = module;
            this.scope = scope;
            this.controller = new module.controllerConstructor(this);
            this.bindingObserver = new BindingObserver(this, this.dispatcher);
            this.valueObserver = new ValueObserver(this, this.controller);
            this.targetObserver = new TargetObserver(this, this);
            try {
                this.controller.initialize();
                this.logDebugActivity("initialize");
            }
            catch (error) {
                this.handleError(error, "initializing controller");
            }
        }
        connect() {
            this.bindingObserver.start();
            this.valueObserver.start();
            this.targetObserver.start();
            try {
                this.controller.connect();
                this.logDebugActivity("connect");
            }
            catch (error) {
                this.handleError(error, "connecting controller");
            }
        }
        disconnect() {
            try {
                this.controller.disconnect();
                this.logDebugActivity("disconnect");
            }
            catch (error) {
                this.handleError(error, "disconnecting controller");
            }
            this.targetObserver.stop();
            this.valueObserver.stop();
            this.bindingObserver.stop();
        }
        get application() {
            return this.module.application;
        }
        get identifier() {
            return this.module.identifier;
        }
        get schema() {
            return this.application.schema;
        }
        get dispatcher() {
            return this.application.dispatcher;
        }
        get element() {
            return this.scope.element;
        }
        get parentElement() {
            return this.element.parentElement;
        }
        handleError(error, message, detail = {}) {
            const { identifier, controller, element } = this;
            detail = Object.assign({ identifier, controller, element }, detail);
            this.application.handleError(error, `Error ${message}`, detail);
        }
        targetConnected(element, name) {
            this.invokeControllerMethod(`${name}TargetConnected`, element);
        }
        targetDisconnected(element, name) {
            this.invokeControllerMethod(`${name}TargetDisconnected`, element);
        }
        invokeControllerMethod(methodName, ...args) {
            const controller = this.controller;
            if (typeof controller[methodName] == "function") {
                controller[methodName](...args);
            }
        }
    }

    function readInheritableStaticArrayValues(constructor, propertyName) {
        const ancestors = getAncestorsForConstructor(constructor);
        return Array.from(ancestors.reduce((values, constructor) => {
            getOwnStaticArrayValues(constructor, propertyName).forEach(name => values.add(name));
            return values;
        }, new Set));
    }
    function readInheritableStaticObjectPairs(constructor, propertyName) {
        const ancestors = getAncestorsForConstructor(constructor);
        return ancestors.reduce((pairs, constructor) => {
            pairs.push(...getOwnStaticObjectPairs(constructor, propertyName));
            return pairs;
        }, []);
    }
    function getAncestorsForConstructor(constructor) {
        const ancestors = [];
        while (constructor) {
            ancestors.push(constructor);
            constructor = Object.getPrototypeOf(constructor);
        }
        return ancestors.reverse();
    }
    function getOwnStaticArrayValues(constructor, propertyName) {
        const definition = constructor[propertyName];
        return Array.isArray(definition) ? definition : [];
    }
    function getOwnStaticObjectPairs(constructor, propertyName) {
        const definition = constructor[propertyName];
        return definition ? Object.keys(definition).map(key => [key, definition[key]]) : [];
    }

    function bless(constructor) {
        return shadow(constructor, getBlessedProperties(constructor));
    }
    function shadow(constructor, properties) {
        const shadowConstructor = extend(constructor);
        const shadowProperties = getShadowProperties(constructor.prototype, properties);
        Object.defineProperties(shadowConstructor.prototype, shadowProperties);
        return shadowConstructor;
    }
    function getBlessedProperties(constructor) {
        const blessings = readInheritableStaticArrayValues(constructor, "blessings");
        return blessings.reduce((blessedProperties, blessing) => {
            const properties = blessing(constructor);
            for (const key in properties) {
                const descriptor = blessedProperties[key] || {};
                blessedProperties[key] = Object.assign(descriptor, properties[key]);
            }
            return blessedProperties;
        }, {});
    }
    function getShadowProperties(prototype, properties) {
        return getOwnKeys(properties).reduce((shadowProperties, key) => {
            const descriptor = getShadowedDescriptor(prototype, properties, key);
            if (descriptor) {
                Object.assign(shadowProperties, { [key]: descriptor });
            }
            return shadowProperties;
        }, {});
    }
    function getShadowedDescriptor(prototype, properties, key) {
        const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
        const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
        if (!shadowedByValue) {
            const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
            if (shadowingDescriptor) {
                descriptor.get = shadowingDescriptor.get || descriptor.get;
                descriptor.set = shadowingDescriptor.set || descriptor.set;
            }
            return descriptor;
        }
    }
    const getOwnKeys = (() => {
        if (typeof Object.getOwnPropertySymbols == "function") {
            return (object) => [
                ...Object.getOwnPropertyNames(object),
                ...Object.getOwnPropertySymbols(object)
            ];
        }
        else {
            return Object.getOwnPropertyNames;
        }
    })();
    const extend = (() => {
        function extendWithReflect(constructor) {
            function extended() {
                return Reflect.construct(constructor, arguments, new.target);
            }
            extended.prototype = Object.create(constructor.prototype, {
                constructor: { value: extended }
            });
            Reflect.setPrototypeOf(extended, constructor);
            return extended;
        }
        function testReflectExtension() {
            const a = function () { this.a.call(this); };
            const b = extendWithReflect(a);
            b.prototype.a = function () { };
            return new b;
        }
        try {
            testReflectExtension();
            return extendWithReflect;
        }
        catch (error) {
            return (constructor) => class extended extends constructor {
            };
        }
    })();

    function blessDefinition(definition) {
        return {
            identifier: definition.identifier,
            controllerConstructor: bless(definition.controllerConstructor)
        };
    }

    class Module {
        constructor(application, definition) {
            this.application = application;
            this.definition = blessDefinition(definition);
            this.contextsByScope = new WeakMap;
            this.connectedContexts = new Set;
        }
        get identifier() {
            return this.definition.identifier;
        }
        get controllerConstructor() {
            return this.definition.controllerConstructor;
        }
        get contexts() {
            return Array.from(this.connectedContexts);
        }
        connectContextForScope(scope) {
            const context = this.fetchContextForScope(scope);
            this.connectedContexts.add(context);
            context.connect();
        }
        disconnectContextForScope(scope) {
            const context = this.contextsByScope.get(scope);
            if (context) {
                this.connectedContexts.delete(context);
                context.disconnect();
            }
        }
        fetchContextForScope(scope) {
            let context = this.contextsByScope.get(scope);
            if (!context) {
                context = new Context(this, scope);
                this.contextsByScope.set(scope, context);
            }
            return context;
        }
    }

    class ClassMap {
        constructor(scope) {
            this.scope = scope;
        }
        has(name) {
            return this.data.has(this.getDataKey(name));
        }
        get(name) {
            return this.getAll(name)[0];
        }
        getAll(name) {
            const tokenString = this.data.get(this.getDataKey(name)) || "";
            return tokenize(tokenString);
        }
        getAttributeName(name) {
            return this.data.getAttributeNameForKey(this.getDataKey(name));
        }
        getDataKey(name) {
            return `${name}-class`;
        }
        get data() {
            return this.scope.data;
        }
    }

    class DataMap {
        constructor(scope) {
            this.scope = scope;
        }
        get element() {
            return this.scope.element;
        }
        get identifier() {
            return this.scope.identifier;
        }
        get(key) {
            const name = this.getAttributeNameForKey(key);
            return this.element.getAttribute(name);
        }
        set(key, value) {
            const name = this.getAttributeNameForKey(key);
            this.element.setAttribute(name, value);
            return this.get(key);
        }
        has(key) {
            const name = this.getAttributeNameForKey(key);
            return this.element.hasAttribute(name);
        }
        delete(key) {
            if (this.has(key)) {
                const name = this.getAttributeNameForKey(key);
                this.element.removeAttribute(name);
                return true;
            }
            else {
                return false;
            }
        }
        getAttributeNameForKey(key) {
            return `data-${this.identifier}-${dasherize(key)}`;
        }
    }

    class Guide {
        constructor(logger) {
            this.warnedKeysByObject = new WeakMap;
            this.logger = logger;
        }
        warn(object, key, message) {
            let warnedKeys = this.warnedKeysByObject.get(object);
            if (!warnedKeys) {
                warnedKeys = new Set;
                this.warnedKeysByObject.set(object, warnedKeys);
            }
            if (!warnedKeys.has(key)) {
                warnedKeys.add(key);
                this.logger.warn(message, object);
            }
        }
    }

    function attributeValueContainsToken(attributeName, token) {
        return `[${attributeName}~="${token}"]`;
    }

    class TargetSet {
        constructor(scope) {
            this.scope = scope;
        }
        get element() {
            return this.scope.element;
        }
        get identifier() {
            return this.scope.identifier;
        }
        get schema() {
            return this.scope.schema;
        }
        has(targetName) {
            return this.find(targetName) != null;
        }
        find(...targetNames) {
            return targetNames.reduce((target, targetName) => target
                || this.findTarget(targetName)
                || this.findLegacyTarget(targetName), undefined);
        }
        findAll(...targetNames) {
            return targetNames.reduce((targets, targetName) => [
                ...targets,
                ...this.findAllTargets(targetName),
                ...this.findAllLegacyTargets(targetName)
            ], []);
        }
        findTarget(targetName) {
            const selector = this.getSelectorForTargetName(targetName);
            return this.scope.findElement(selector);
        }
        findAllTargets(targetName) {
            const selector = this.getSelectorForTargetName(targetName);
            return this.scope.findAllElements(selector);
        }
        getSelectorForTargetName(targetName) {
            const attributeName = this.schema.targetAttributeForScope(this.identifier);
            return attributeValueContainsToken(attributeName, targetName);
        }
        findLegacyTarget(targetName) {
            const selector = this.getLegacySelectorForTargetName(targetName);
            return this.deprecate(this.scope.findElement(selector), targetName);
        }
        findAllLegacyTargets(targetName) {
            const selector = this.getLegacySelectorForTargetName(targetName);
            return this.scope.findAllElements(selector).map(element => this.deprecate(element, targetName));
        }
        getLegacySelectorForTargetName(targetName) {
            const targetDescriptor = `${this.identifier}.${targetName}`;
            return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
        }
        deprecate(element, targetName) {
            if (element) {
                const { identifier } = this;
                const attributeName = this.schema.targetAttribute;
                const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
                this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". ` +
                    `The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
            }
            return element;
        }
        get guide() {
            return this.scope.guide;
        }
    }

    class Scope {
        constructor(schema, element, identifier, logger) {
            this.targets = new TargetSet(this);
            this.classes = new ClassMap(this);
            this.data = new DataMap(this);
            this.containsElement = (element) => {
                return element.closest(this.controllerSelector) === this.element;
            };
            this.schema = schema;
            this.element = element;
            this.identifier = identifier;
            this.guide = new Guide(logger);
        }
        findElement(selector) {
            return this.element.matches(selector)
                ? this.element
                : this.queryElements(selector).find(this.containsElement);
        }
        findAllElements(selector) {
            return [
                ...this.element.matches(selector) ? [this.element] : [],
                ...this.queryElements(selector).filter(this.containsElement)
            ];
        }
        queryElements(selector) {
            return Array.from(this.element.querySelectorAll(selector));
        }
        get controllerSelector() {
            return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
        }
    }

    class ScopeObserver {
        constructor(element, schema, delegate) {
            this.element = element;
            this.schema = schema;
            this.delegate = delegate;
            this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
            this.scopesByIdentifierByElement = new WeakMap;
            this.scopeReferenceCounts = new WeakMap;
        }
        start() {
            this.valueListObserver.start();
        }
        stop() {
            this.valueListObserver.stop();
        }
        get controllerAttribute() {
            return this.schema.controllerAttribute;
        }
        parseValueForToken(token) {
            const { element, content: identifier } = token;
            const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
            let scope = scopesByIdentifier.get(identifier);
            if (!scope) {
                scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
                scopesByIdentifier.set(identifier, scope);
            }
            return scope;
        }
        elementMatchedValue(element, value) {
            const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
            this.scopeReferenceCounts.set(value, referenceCount);
            if (referenceCount == 1) {
                this.delegate.scopeConnected(value);
            }
        }
        elementUnmatchedValue(element, value) {
            const referenceCount = this.scopeReferenceCounts.get(value);
            if (referenceCount) {
                this.scopeReferenceCounts.set(value, referenceCount - 1);
                if (referenceCount == 1) {
                    this.delegate.scopeDisconnected(value);
                }
            }
        }
        fetchScopesByIdentifierForElement(element) {
            let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
            if (!scopesByIdentifier) {
                scopesByIdentifier = new Map;
                this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
            }
            return scopesByIdentifier;
        }
    }

    class Router {
        constructor(application) {
            this.application = application;
            this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
            this.scopesByIdentifier = new Multimap;
            this.modulesByIdentifier = new Map;
        }
        get element() {
            return this.application.element;
        }
        get schema() {
            return this.application.schema;
        }
        get logger() {
            return this.application.logger;
        }
        get controllerAttribute() {
            return this.schema.controllerAttribute;
        }
        get modules() {
            return Array.from(this.modulesByIdentifier.values());
        }
        get contexts() {
            return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
        }
        start() {
            this.scopeObserver.start();
        }
        stop() {
            this.scopeObserver.stop();
        }
        loadDefinition(definition) {
            this.unloadIdentifier(definition.identifier);
            const module = new Module(this.application, definition);
            this.connectModule(module);
        }
        unloadIdentifier(identifier) {
            const module = this.modulesByIdentifier.get(identifier);
            if (module) {
                this.disconnectModule(module);
            }
        }
        getContextForElementAndIdentifier(element, identifier) {
            const module = this.modulesByIdentifier.get(identifier);
            if (module) {
                return module.contexts.find(context => context.element == element);
            }
        }
        handleError(error, message, detail) {
            this.application.handleError(error, message, detail);
        }
        createScopeForElementAndIdentifier(element, identifier) {
            return new Scope(this.schema, element, identifier, this.logger);
        }
        scopeConnected(scope) {
            this.scopesByIdentifier.add(scope.identifier, scope);
            const module = this.modulesByIdentifier.get(scope.identifier);
            if (module) {
                module.connectContextForScope(scope);
            }
        }
        scopeDisconnected(scope) {
            this.scopesByIdentifier.delete(scope.identifier, scope);
            const module = this.modulesByIdentifier.get(scope.identifier);
            if (module) {
                module.disconnectContextForScope(scope);
            }
        }
        connectModule(module) {
            this.modulesByIdentifier.set(module.identifier, module);
            const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
            scopes.forEach(scope => module.connectContextForScope(scope));
        }
        disconnectModule(module) {
            this.modulesByIdentifier.delete(module.identifier);
            const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
            scopes.forEach(scope => module.disconnectContextForScope(scope));
        }
    }

    const defaultSchema = {
        controllerAttribute: "data-controller",
        actionAttribute: "data-action",
        targetAttribute: "data-target",
        targetAttributeForScope: identifier => `data-${identifier}-target`
    };

    class Application {
        constructor(element = document.documentElement, schema = defaultSchema) {
            this.logger = console;
            this.debug = false;
            this.logDebugActivity = (identifier, functionName, detail = {}) => {
                if (this.debug) {
                    this.logFormattedMessage(identifier, functionName, detail);
                }
            };
            this.element = element;
            this.schema = schema;
            this.dispatcher = new Dispatcher(this);
            this.router = new Router(this);
        }
        static start(element, schema) {
            const application = new Application(element, schema);
            application.start();
            return application;
        }
        async start() {
            await domReady();
            this.logDebugActivity("application", "starting");
            this.dispatcher.start();
            this.router.start();
            this.logDebugActivity("application", "start");
        }
        stop() {
            this.logDebugActivity("application", "stopping");
            this.dispatcher.stop();
            this.router.stop();
            this.logDebugActivity("application", "stop");
        }
        register(identifier, controllerConstructor) {
            if (controllerConstructor.shouldLoad) {
                this.load({ identifier, controllerConstructor });
            }
        }
        load(head, ...rest) {
            const definitions = Array.isArray(head) ? head : [head, ...rest];
            definitions.forEach(definition => this.router.loadDefinition(definition));
        }
        unload(head, ...rest) {
            const identifiers = Array.isArray(head) ? head : [head, ...rest];
            identifiers.forEach(identifier => this.router.unloadIdentifier(identifier));
        }
        get controllers() {
            return this.router.contexts.map(context => context.controller);
        }
        getControllerForElementAndIdentifier(element, identifier) {
            const context = this.router.getContextForElementAndIdentifier(element, identifier);
            return context ? context.controller : null;
        }
        handleError(error, message, detail) {
            var _a;
            this.logger.error(`%s\n\n%o\n\n%o`, message, error, detail);
            (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error);
        }
        logFormattedMessage(identifier, functionName, detail = {}) {
            detail = Object.assign({ application: this }, detail);
            this.logger.groupCollapsed(`${identifier} #${functionName}`);
            this.logger.log("details:", Object.assign({}, detail));
            this.logger.groupEnd();
        }
    }
    function domReady() {
        return new Promise(resolve => {
            if (document.readyState == "loading") {
                document.addEventListener("DOMContentLoaded", () => resolve());
            }
            else {
                resolve();
            }
        });
    }

    function ClassPropertiesBlessing(constructor) {
        const classes = readInheritableStaticArrayValues(constructor, "classes");
        return classes.reduce((properties, classDefinition) => {
            return Object.assign(properties, propertiesForClassDefinition(classDefinition));
        }, {});
    }
    function propertiesForClassDefinition(key) {
        return {
            [`${key}Class`]: {
                get() {
                    const { classes } = this;
                    if (classes.has(key)) {
                        return classes.get(key);
                    }
                    else {
                        const attribute = classes.getAttributeName(key);
                        throw new Error(`Missing attribute "${attribute}"`);
                    }
                }
            },
            [`${key}Classes`]: {
                get() {
                    return this.classes.getAll(key);
                }
            },
            [`has${capitalize(key)}Class`]: {
                get() {
                    return this.classes.has(key);
                }
            }
        };
    }

    function TargetPropertiesBlessing(constructor) {
        const targets = readInheritableStaticArrayValues(constructor, "targets");
        return targets.reduce((properties, targetDefinition) => {
            return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
        }, {});
    }
    function propertiesForTargetDefinition(name) {
        return {
            [`${name}Target`]: {
                get() {
                    const target = this.targets.find(name);
                    if (target) {
                        return target;
                    }
                    else {
                        throw new Error(`Missing target element "${name}" for "${this.identifier}" controller`);
                    }
                }
            },
            [`${name}Targets`]: {
                get() {
                    return this.targets.findAll(name);
                }
            },
            [`has${capitalize(name)}Target`]: {
                get() {
                    return this.targets.has(name);
                }
            }
        };
    }

    function ValuePropertiesBlessing(constructor) {
        const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
        const propertyDescriptorMap = {
            valueDescriptorMap: {
                get() {
                    return valueDefinitionPairs.reduce((result, valueDefinitionPair) => {
                        const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair);
                        const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
                        return Object.assign(result, { [attributeName]: valueDescriptor });
                    }, {});
                }
            }
        };
        return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
            return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
        }, propertyDescriptorMap);
    }
    function propertiesForValueDefinitionPair(valueDefinitionPair) {
        const definition = parseValueDefinitionPair(valueDefinitionPair);
        const { key, name, reader: read, writer: write } = definition;
        return {
            [name]: {
                get() {
                    const value = this.data.get(key);
                    if (value !== null) {
                        return read(value);
                    }
                    else {
                        return definition.defaultValue;
                    }
                },
                set(value) {
                    if (value === undefined) {
                        this.data.delete(key);
                    }
                    else {
                        this.data.set(key, write(value));
                    }
                }
            },
            [`has${capitalize(name)}`]: {
                get() {
                    return this.data.has(key) || definition.hasCustomDefaultValue;
                }
            }
        };
    }
    function parseValueDefinitionPair([token, typeDefinition]) {
        return valueDescriptorForTokenAndTypeDefinition(token, typeDefinition);
    }
    function parseValueTypeConstant(constant) {
        switch (constant) {
            case Array: return "array";
            case Boolean: return "boolean";
            case Number: return "number";
            case Object: return "object";
            case String: return "string";
        }
    }
    function parseValueTypeDefault(defaultValue) {
        switch (typeof defaultValue) {
            case "boolean": return "boolean";
            case "number": return "number";
            case "string": return "string";
        }
        if (Array.isArray(defaultValue))
            return "array";
        if (Object.prototype.toString.call(defaultValue) === "[object Object]")
            return "object";
    }
    function parseValueTypeObject(typeObject) {
        const typeFromObject = parseValueTypeConstant(typeObject.type);
        if (typeFromObject) {
            const defaultValueType = parseValueTypeDefault(typeObject.default);
            if (typeFromObject !== defaultValueType) {
                throw new Error(`Type "${typeFromObject}" must match the type of the default value. Given default value: "${typeObject.default}" as "${defaultValueType}"`);
            }
            return typeFromObject;
        }
    }
    function parseValueTypeDefinition(typeDefinition) {
        const typeFromObject = parseValueTypeObject(typeDefinition);
        const typeFromDefaultValue = parseValueTypeDefault(typeDefinition);
        const typeFromConstant = parseValueTypeConstant(typeDefinition);
        const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
        if (type)
            return type;
        throw new Error(`Unknown value type "${typeDefinition}"`);
    }
    function defaultValueForDefinition(typeDefinition) {
        const constant = parseValueTypeConstant(typeDefinition);
        if (constant)
            return defaultValuesByType[constant];
        const defaultValue = typeDefinition.default;
        if (defaultValue !== undefined)
            return defaultValue;
        return typeDefinition;
    }
    function valueDescriptorForTokenAndTypeDefinition(token, typeDefinition) {
        const key = `${dasherize(token)}-value`;
        const type = parseValueTypeDefinition(typeDefinition);
        return {
            type,
            key,
            name: camelize(key),
            get defaultValue() { return defaultValueForDefinition(typeDefinition); },
            get hasCustomDefaultValue() { return parseValueTypeDefault(typeDefinition) !== undefined; },
            reader: readers[type],
            writer: writers[type] || writers.default
        };
    }
    const defaultValuesByType = {
        get array() { return []; },
        boolean: false,
        number: 0,
        get object() { return {}; },
        string: ""
    };
    const readers = {
        array(value) {
            const array = JSON.parse(value);
            if (!Array.isArray(array)) {
                throw new TypeError("Expected array");
            }
            return array;
        },
        boolean(value) {
            return !(value == "0" || value == "false");
        },
        number(value) {
            return Number(value);
        },
        object(value) {
            const object = JSON.parse(value);
            if (object === null || typeof object != "object" || Array.isArray(object)) {
                throw new TypeError("Expected object");
            }
            return object;
        },
        string(value) {
            return value;
        }
    };
    const writers = {
        default: writeString,
        array: writeJSON,
        object: writeJSON
    };
    function writeJSON(value) {
        return JSON.stringify(value);
    }
    function writeString(value) {
        return `${value}`;
    }

    class Controller {
        constructor(context) {
            this.context = context;
        }
        static get shouldLoad() {
            return true;
        }
        get application() {
            return this.context.application;
        }
        get scope() {
            return this.context.scope;
        }
        get element() {
            return this.scope.element;
        }
        get identifier() {
            return this.scope.identifier;
        }
        get targets() {
            return this.scope.targets;
        }
        get classes() {
            return this.scope.classes;
        }
        get data() {
            return this.scope.data;
        }
        initialize() {
        }
        connect() {
        }
        disconnect() {
        }
        dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
            const type = prefix ? `${prefix}:${eventName}` : eventName;
            const event = new CustomEvent(type, { detail, bubbles, cancelable });
            target.dispatchEvent(event);
            return event;
        }
    }
    Controller.blessings = [ClassPropertiesBlessing, TargetPropertiesBlessing, ValuePropertiesBlessing];
    Controller.targets = [];
    Controller.values = {};

    exports.Application = Application;
    exports.AttributeObserver = AttributeObserver;
    exports.Context = Context;
    exports.Controller = Controller;
    exports.ElementObserver = ElementObserver;
    exports.IndexedMultimap = IndexedMultimap;
    exports.Multimap = Multimap;
    exports.StringMapObserver = StringMapObserver;
    exports.TokenListObserver = TokenListObserver;
    exports.ValueListObserver = ValueListObserver;
    exports.add = add;
    exports.defaultSchema = defaultSchema;
    exports.del = del;
    exports.fetch = fetch;
    exports.prune = prune;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
