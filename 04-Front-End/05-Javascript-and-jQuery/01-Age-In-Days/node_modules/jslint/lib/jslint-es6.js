// jslint.js
// 2015-12-26
// Copyright (c) 2015 Douglas Crockford  (www.JSLint.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// The Software shall be used for Good, not Evil.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// jslint is a function that takes 3 arguments:

//      source          A text to analyze, a string or an array of strings.
//      option_object   An object whose keys correspond to option names.
//      global_array    An array of strings containing global variables that
//                      the file is allowed readonly access.

// jslint returns an object containing its results. The object contains a lot
// of valuable information. It can be used to generate reports. The object
// contains:

//      edition: the version of JSLint that did the analysis.
//      functions: an array of objects that represent all of the functions
//              declared in the file.
//      global: an object representing the global object. Its .context property
//              is an object containing a property for each global variable.
//      id: "(JSLint)"
//      imports: an array of strings representing each of the imports.
//      json: true if the file is a JSON text.
//      lines: an array of strings, the source.
//      module: true if an import or export statement was used.
//      ok: true if no warnings were generated. This is what you want.
//      option: the option argument.
//      property: a property object.
//      stop: true if JSLint was unable to finish. You don't want this.
//      tokens: an array of objects representing the tokens in the file.
//      tree: the token objects arranged in a tree.
//      warnings: an array of warning objects. A warning object can contain:
//          name: 'JSLintError'
//          column: A column number in the file.
//          line: A line number in the file.
//          code: A warning code string.
//          message: The warning message string.
//          a: Exhibit A.
//          b: Exhibit B.
//          c: Exhibit C.
//          d: Exhibit D.

// jslint works in several phases. In any of these phases, errors might be
// found. Sometimes JSLint is able to recover from an error and continue
// parsing. In some cases, it cannot and will stop early. If that should happen,
// repair your code and try again.

// Phases:

//      1. If the source is a single string, split it into an array of strings.
//      2. Turn the source into an array of tokens.
//      3. Furcate the tokens into a parse tree.
//      4. Walk the tree, traversing all of the nodes of the tree. It is a
//          recursive traversal. Each node may be processed on the way down
//          (preaction) and on the way up (postaction).
//      5. Check the whitespace between the tokens.

// jslint can also examine JSON text. It decides that a file is JSON text if
// the first token is '[' or '{'. Processing of JSON text is much simpler than
// the processing of JavaScript programs. Only the first three phases are
// required.

// WARNING: JSLint will hurt your feelings.

/*property
    a, and, arity, b, bad_assignment_a, bad_character_number_a,
    bad_directive_a, bad_get, bad_module_name_a, bad_option_a, bad_property_a,
    bad_set, bitwise, block, body, browser, c, calls, catch, charAt,
    charCodeAt, closer, closure, code, column, concat, constant, context,
    couch, create, d, dead, devel, directive, directives, disrupt, dot,
    duplicate_a, edition, ellipsis, else, empty_block, es6, eval, every,
    expected_a_at_b_c, expected_a_b, expected_a_b_from_c_d,
    expected_a_before_b, expected_digits_after_a, expected_four_digits,
    expected_identifier_a, expected_line_break_a_b, expected_regexp_factor_a,
    expected_space_a_b, expected_statements_a, expected_string_a,
    expected_type_string_a, expression, extra, flag, for, forEach, free, from,
    fud, fudge, function, function_in_loop, functions, g, global, i, id,
    identifier, import, imports, inc, indexOf, infix_in, init, initial,
    isArray, isNaN, join, json, keys, label, label_a, lbp, led, length, level,
    line, lines, live, loop, m, margin, match, maxerr, maxlen, message,
    misplaced_a, misplaced_directive_a, missing_browser, module, naked_block,
    name, names, nested_comment, new, node, not_label_a, nud, ok, open, option,
    out_of_scope_a, parameters, pop, property, push, qmark, quote,
    redefinition_a_b, replace, reserved_a, role, search, signature,
    slash_equal, slice, some, sort, split, statement, stop, strict,
    subscript_a, switch, test, this, thru, toString, todo_comment, tokens,
    too_long, too_many, tree, type, u, unclosed_comment, unclosed_mega,
    unclosed_string, undeclared_a, unexpected_a, unexpected_a_after_b,
    unexpected_at_top_level_a, unexpected_char_a, unexpected_comment,
    unexpected_directive_a, unexpected_expression_a, unexpected_label_a,
    unexpected_parens, unexpected_space_a_b, unexpected_statement_a,
    unexpected_trailing_space, unexpected_typeof_a, uninitialized_a,
    unreachable_a, unregistered_property_a, unsafe, unused_a, use_spaces, used,
    value, var_loop, var_switch, variable, warning, warnings,
    weird_condition_a, weird_expression_a, weird_loop, weird_relation_a, white,
    wrap_assignment, wrap_condition, wrap_immediate, wrap_regexp, wrap_unary,
    wrapped, writable, y
*/

var jslint = (function JSLint() {
    'use strict';

    function empty() {

// The empty function produces a new empty object that inherits nothing. This is
// much better than {} because confusions around accidental method names like
// 'constructor' are completely avoided.

        return Object.create(null);
    }

    function populate(object, array, value) {

// Augment an object by taking property names from an array of strings.

        array.forEach(function (name) {
            object[name] = value;
        });
    }

    var allowed_option = {

// These are the options that are recognized in the option object or that may
// appear in a /*jslint*/ directive. Most options will have a boolean value,
// usually true. Some options will also predefine some number of global
// variables.

        bitwise: true,
        browser: [
            'Audio', 'clearInterval', 'clearTimeout', 'document', 'event',
            'FormData', 'history', 'Image', 'localStorage', 'location', 'name',
            'navigator', 'Option', 'screen', 'sessionStorage', 'setInterval',
            'setTimeout', 'Storage', 'XMLHttpRequest'
        ],
        couch: [
            'emit', 'getRow', 'isArray', 'log', 'provides', 'registerType',
            'require', 'send', 'start', 'sum', 'toJSON'
        ],
        devel: [
            'alert', 'confirm', 'console', 'Debug', 'opera', 'prompt', 'WSH'
        ],
        es6: [
            'ArrayBuffer', 'DataView', 'Float32Array', 'Float64Array',
            'Generator', 'GeneratorFunction', 'Int8Array', 'Int16Array',
            'Int32Array', 'Intl', 'Map', 'Promise', 'Proxy', 'Reflect',
            'Set', 'Symbol', 'System', 'Uint8Array', 'Uint8ClampedArray',
            'Uint16Array', 'Uint32Array', 'WeakMap', 'WeakSet'
        ],
        eval: true,
        for: true,
        fudge: true,
        maxerr: 10000,
        maxlen: 10000,
        node: [
            'Buffer', 'clearImmediate', 'clearInterval', 'clearTimeout',
            'console', 'exports', 'global', 'module', 'process', 'querystring',
            'require', 'setImmediate', 'setInterval', 'setTimeout',
            '__dirname', '__filename'
        ],
        this: true,
        white: true
    };

    var spaceop = {

// This is the set of infix operators that require a space on each side.

        '!=': true,
        '!==': true,
        '%': true,
        '%=': true,
        '&': true,
        '&=': true,
        '&&': true,
        '*': true,
        '*=': true,
        '+=': true,
        '-=': true,
        '/': true,
        '/=': true,
        '<': true,
        '<=': true,
        '<<': true,
        '<<=': true,
        '=': true,
        '==': true,
        '===': true,
        '=>': true,
        '>': true,
        '>=': true,
        '>>': true,
        '>>=': true,
        '>>>': true,
        '>>>=': true,
        '^': true,
        '^=': true,
        '|': true,
        '|=': true,
        '||': true
    };

    var bitwiseop = {

// These are the bitwise operators.

        '~': true,
        '^': true,
        '^=': true,
        '&': true,
        '&=': true,
        '|': true,
        '|=': true,
        '<<': true,
        '<<=': true,
        '>>': true,
        '>>=': true,
        '>>>': true,
        '>>>=': true
    };

    var opener = {

// The open and close pairs.

        '(': ')',       // paren
        '[': ']',       // bracket
        '{': '}',       // brace
        '${': '}'       // mega
    };

    var relationop = {

// The relational operators.

        '!=': true,
        '!==': true,
        '==': true,
        '===': true,
        '<': true,
        '<=': true,
        '>': true,
        '>=': true
    };

    var standard = [

// These are the globals that are provided by the ES5 language standard.

        'Array', 'Boolean', 'Date', 'decodeURI', 'decodeURIComponent',
        'encodeURI', 'encodeURIComponent', 'Error', 'EvalError', 'isFinite',
        'isNaN', 'JSON', 'Math', 'Number', 'Object', 'parseInt', 'parseFloat',
        'RangeError', 'ReferenceError', 'RegExp', 'String', 'SyntaxError',
        'TypeError', 'URIError'
    ];

    var bundle = {

// The bundle contains the raw text messages that are generated by jslint. It
// seems that they are all error messages and warnings. There are no "Atta
// boy!" or "You are so awesome!" messages. There is no positive reinforcement
// or encouragement. This relentless negativity can undermine self-esteem and
// wound the inner child. But if you accept it as sound advice rather than as
// personal criticism, it can make your programs better.

        and: "The '&&' subexpression should be wrapped in parens.",
        bad_assignment_a: "Bad assignment to '{a}'.",
        bad_character_number_a: "Bad character code: '{a}'",
        bad_directive_a: "Bad directive '{a}'.",
        bad_get: "A get function takes no parameters.",
        bad_module_name_a: "Bad module name '{a}'.",
        bad_option_a: "Bad option '{a}'.",
        bad_property_a: "Bad property name '{a}'.",
        bad_set: "A set function takes one parameter.",
        duplicate_a: "Duplicate '{a}'.",
        empty_block: "Empty block.",
        es6: "Unexpected ES6 feature '{a}'.",
        expected_a_at_b_c: "Expected '{a}' at column {b}, not column {c}.",
        expected_a_b: "Expected '{a}' and instead saw '{b}'.",
        expected_a_b_from_c_d: "Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'.",
        expected_a_before_b: "Expected '{a}' before '{b}'.",
        expected_digits_after_a: "Expected digits after '{a}'.",
        expected_four_digits: "Expected four digits after '\\u'.",
        expected_identifier_a: "Expected an identifier and instead saw '{a}'.",
        expected_line_break_a_b: "Expected a line break between '{a}' and '{b}'.",
        expected_regexp_factor_a: "Expected a regexp factor and instead saw '{a}'.",
        expected_space_a_b: "Expected one space between '{a}' and '{b}'.",
        expected_statements_a: "Expected statements before '{a}'.",
        expected_string_a: "Expected a string and instead saw '{a}'.",
        expected_type_string_a: "Expected a type string and instead saw '{a}'.",
        function_in_loop: "Don't make functions within a loop.",
        infix_in: "Unexpected 'in'. Compare with undefined, or use the hasOwnProperty method instead.",
        isNaN: "Use the isNaN function to compare with NaN.",
        label_a: "'{a}' is a statement label.",
        misplaced_a: "Place '{a}' at the outermost level.",
        misplaced_directive_a: "Place the '/*{a}*/' directive before the first statement.",
        missing_browser: "/*global*/ requires the Assume a browser option.",
        naked_block: "Naked block.",
        nested_comment: "Nested comment.",
        not_label_a: "'{a}' is not a label.",
        out_of_scope_a: "'{a}' is out of scope.",
        redefinition_a_b: "Redefinition of '{a}' from line {b}.",
        reserved_a: "Reserved name '{a}'.",
        slash_equal: "A regular expression literal can be confused with '/='.",
        subscript_a: "['{a}'] is better written in dot notation.",
        todo_comment: "Unexpected TODO comment.",
        too_long: "Line too long.",
        too_many: "Too many warnings.",
        unclosed_comment: "Unclosed comment.",
        unclosed_mega: "Unclosed mega literal.",
        unclosed_string: "Unclosed string.",
        undeclared_a: "Undeclared '{a}'.",
        unexpected_a: "Unexpected '{a}'.",
        unexpected_a_after_b: "Unexpected '{a}' after '{b}'.",
        unexpected_at_top_level_a: "Unexpected '{a}' at top level.",
        unexpected_char_a: "Unexpected character '{a}'.",
        unexpected_comment: "Unexpected comment.",
        unexpected_directive_a: "When using modules, don't use directive '/*{a}'.",
        unexpected_expression_a: "Unexpected expression '{a}' in statement position.",
        unexpected_label_a: "Unexpected label '{a}'.",
        unexpected_parens: "Don't wrap function literals in parens.",
        unexpected_space_a_b: "Unexpected space between '{a}' and '{b}'.",
        unexpected_statement_a: "Unexpected statement '{a}' in expression position.",
        unexpected_trailing_space: "Unexpected trailing space.",
        unexpected_typeof_a: "Unexpected 'typeof'. Use '===' to compare directly with {a}.",
        uninitialized_a: "Uninitialized '{a}'.",
        unreachable_a: "Unreachable '{a}'.",
        unregistered_property_a: "Unregistered property name '{a}'.",
        unsafe: "Unsafe character '{a}'.",
        unused_a: "Unused '{a}'.",
        use_spaces: "Use spaces, not tabs.",
        var_loop: "Don't declare variables in a loop.",
        var_switch: "Don't declare variables in a switch.",
        weird_condition_a: "Weird condition '{a}'.",
        weird_expression_a: "Weird expression '{a}'.",
        weird_loop: "Weird loop.",
        weird_relation_a: "Weird relation '{a}'.",
        wrap_assignment: "Don't wrap assignment statements in parens.",
        wrap_condition: "Wrap the condition in parens.",
        wrap_immediate: "Wrap an immediate function invocation in " +
                "parentheses to assist the reader in understanding that the " +
                "expression is the result of a function, and not the " +
                "function itself.",
        wrap_regexp: "Wrap this regexp in parens to avoid confusion.",
        wrap_unary: "Wrap the unary expression in parens."
    };

// Regular expression literals:

// supplant {variables}
    var rx_supplant = /\{([^{}]*)\}/g,
// carriage return, carriage return linefeed, or linefeed
        rx_crlf = /\n|\r\n?/,
// unsafe characters that are silently deleted by one or more browsers
        rx_unsafe = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,
// identifier
        rx_identifier = /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,
        rx_bad_property = /^_|\$|Sync$|_$/,
// star slash
        rx_star_slash = /\*\//,
// slash star
        rx_slash_star = /\/\*/,
// slash star or ending slash
        rx_slash_star_or_slash = /\/\*|\/$/,
// uncompleted work comment
        rx_todo = /\b(?:todo|TO\s?DO|HACK)\b/,
// tab
        rx_tab = /\t/g,
// directive
        rx_directive = /^(jslint|property|global)\s*(.*)$/,
        rx_directive_part = /^([a-zA-Z$_][a-zA-Z0-9$_]*)\s*(?::\s*(true|false|[0-9]+)\s*)?(?:,\s*)?(.*)$/,
// token (sorry it is so long)
        rx_token = /^((\s+)|([a-zA-Z_$][a-zA-Z0-9_$]*)|[(){}\[\]\?,:;'"~`]|=(?:==?|>)?|\.+|\/[=*\/]?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[\|=]?|>{1,3}=?|<<?=?|!={0,2}|(0|[1-9][0-9]*))(.*)$/,
        rx_digits = /^([0-9]+)(.*)$/,
        rx_hexs = /^([0-9a-fA-F]+)(.*)$/,
        rx_octals = /^([0-7]+)(.*)$/,
        rx_bits = /^([01]+)(.*)$/,
// mega
        rx_mega = /`|\$\{/,
// indentation
        rx_colons = /^(.*)\?([:.]*)$/,
        rx_dot = /\.$/,
// JSON number
        rx_JSON_number = /^-?\d+(?:\.\d*)?(?:e[\-+]?\d+)?$/i;

    function is_letter(string) {
        return (string >= 'a' && string <= 'z\uffff') ||
                (string >= 'A' && string <= 'Z\uffff');
    }

    function supplant(string, object) {
        return string.replace(rx_supplant, function (found, filling) {
            var replacement = object[filling];
            return (replacement !== undefined)
                ? replacement
                : found;
        });
    }

    var anon = "anonymous", // The guessed name for anonymous functions.
        blockage,           // The current block.
        block_stack,        // The stack of blocks.
        declared_globals,   // The object containing the global declarations.
        directives,         // The directive comments.
        directive_mode,     // true if directives are still allowed.
        early_stop,         // true if JSLint cannot finish.
        export_mode,        // true if an export statement was seen.
        fudge,              // true if the natural numbers start with 1.
        functionage,        // The current function.
        functions,          // The array containing all of the functions.
        global,             // The global object, the outermost context.
        imports,            // The array collecting all import-from strings.
        json_mode,          // true if parsing JSON.
        lines,              // The array containing source lines.
        module_mode,        // true if import or export was used.
        next_token,         // The next token to be examined in the parse.
        option,             // The options parameter.
        property,           // The object containing the tallied property names.
        mega_mode,          // true if currently parsing a megastring literal.
        stack,              // The stack of functions.
        syntax,             // The object containing the parser.
        token,              // The current token being examined in the parse.
        token_nr,           // The number of the next token.
        tokens,             // The array of tokens.
        tenure,             // The predefined property registry.
        tree,               // The abstract parse tree.
        var_mode,           // true if using var, false if using let.
        warnings;           // The array collecting all generated warnings.

// Error reportage functions:

    function artifact(the_token) {

// Return a string representing an artifact.

        if (the_token === undefined) {
            the_token = next_token;
        }
        return (the_token.id === '(string)' || the_token.id === '(number)')
            ? String(the_token.value)
            : the_token.id;
    }

    function artifact_line(the_token) {

// Return the fudged line number of an artifact.

        if (the_token === undefined) {
            the_token = next_token;
        }
        return the_token.line + fudge;
    }

    function artifact_column(the_token) {

// Return the fudged column number of an artifact.

        if (the_token === undefined) {
            the_token = next_token;
        }
        return the_token.from + fudge;
    }

    function warn_at(code, line, column, a, b, c, d) {

// Report an error at some line and column of the program. The warning object
// resembles an exception.

        var warning = {         // ~~
            name: 'JSLintError',
            column: column,
            line: line,
            code: code
        };
        if (a !== undefined) {
            warning.a = a;
        }
        if (b !== undefined) {
            warning.b = b;
        }
        if (c !== undefined) {
            warning.c = c;
        }
        if (d !== undefined) {
            warning.d = d;
        }
        warning.message = supplant(bundle[code] || code, warning);
        warnings.push(warning);
        return (typeof option.maxerr === 'number' &&
                warnings.length === option.maxerr)
            ? stop_at('too_many', line, column)
            : warning;
    }

    function stop_at(code, line, column, a, b, c, d) {

// Same as warn_at, except that it stops the analysis.

        throw warn_at(code, line, column, a, b, c, d);
    }

    function warn(code, the_token, a, b, c, d) {

// Same as warn_at, except the warning will be associated with a specific token.
// If there is already a warning on this token, suppress the new one. It is
// likely that the first warning will be the most meaningful.

        if (the_token === undefined) {
            the_token = next_token;
        }
        if (the_token.warning === undefined) {
            the_token.warning = warn_at(
                code,
                the_token.line,
                the_token.from,
                a || artifact(the_token),
                b,
                c,
                d
            );
            return the_token.warning;
        }
    }

    function stop(code, the_token, a, b, c, d) {

// Similar to warn and stop_at. If the token already had a warning, that
// warning will be replaced with this new one. It is likely that the stopping
// warning will be the most meaningful.

        if (the_token === undefined) {
            the_token = next_token;
        }
        the_token.warning = undefined;
        throw warn(code, the_token, a, b, c, d);
    }

// Tokenize:

    function tokenize(source) {

// tokenize takes a source and produces from it an array of token objects.
// JavaScript is notoriously difficult to tokenize because of the horrible
// interactions between automatic semicolon insertion, regular expression
// literals, and now megastring literals. JSLint benefits from eliminating
// automatic semicolon insertion and nested megastring literals, which allows
// full tokenization to precede parsing.

// If the source is not an array, then it is split into lines at the
// carriage return/linefeed.

        lines = (Array.isArray(source))
            ? source
            : source.split(rx_crlf);
        tokens = [];

        var char,                   // a popular character
            column = 0,             // the column number of the next character
            from,                   // the starting column number of the token
            line = -1,              // the line number of the next character
            previous = global,      // the previous token including comments
            prior = global,         // the previous token excluding comments
            mega_from,              // the starting column of megastring
            mega_line,              // the starting line of megastring
            snippet,                // a piece of string
            source_line;            // the current line source string

        function next_line() {

// Put the next line of source in source_line. If the line contains tabs,
// replace them with spaces and give a warning. Also warn if the line contains
// unsafe characters or is too damn long.

            var at;
            column = 0;
            line += 1;
            source_line = lines[line];
            if (source_line !== undefined) {
                at = source_line.search(rx_tab);
                if (at >= 0) {
                    if (!option.white) {
                        warn_at('use_spaces', line, at + 1);
                    }
                    source_line = source_line.replace(rx_tab, ' ');
                }
                at = source_line.search(rx_unsafe);
                if (at >= 0) {
                    warn_at(
                        'unsafe',
                        line,
                        column + at,
                        'U+' + source_line.charCodeAt(at).toString(16)
                    );
                }
                if (option.maxlen && option.maxlen < source_line.length) {
                    warn_at('too_long', line, source_line.length);
                } else if (!option.white && source_line.slice(-1) === ' ') {
                    warn_at(
                        'unexpected_trailing_space',
                        line,
                        source_line.length - 1
                    );
                }
            }
            return source_line;
        }

// Most tokens, including the identifiers, operators, and punctuators, can be
// found with a regular expression. Regular expressions cannot correctly match
// regular expression literals, so we will match those the hard way. String
// literals and number literals can be matched by regular expressions, but they
// don't provide good warnings. The functions snip, next_char, prev_char,
// some_digits, and escape help in the parsing of literals.

        function snip() {

// Remove the last character from snippet.

            snippet = snippet.slice(0, -1);
        }

        function next_char(match) {

// Get the next character from the source line. Remove it from the source_line,
// and append it to the snippet. Optionally check that the previous character
// matched an expected value.

            if (match !== undefined && char !== match) {
                return stop_at('expected_a_b', line, column, match, char);
            }
            if (source_line) {
                char = source_line.charAt(0);
                source_line = source_line.slice(1);
                snippet += char;
            } else {
                char = '';
                snippet += ' ';
            }
            column += 1;
            return char;
        }

        function back_char() {

// Back up one character by moving a character from the end of the snippet to
// the front of the source_line.

            if (snippet) {
                char = snippet.slice(-1);
                source_line = char + source_line;
                column -= 1;
                snip();
            } else {
                char = '';
            }
            return char;
        }

        function some_digits(rx, quiet) {
            var result = source_line.match(rx);
            if (result) {
                char = result[1];
                column += char.length;
                source_line = result[2];
                snippet += char;
            } else {
                char = '';
                if (!quiet) {
                    warn_at(
                        'expected_digits_after_a',
                        line,
                        column,
                        snippet
                    );
                }
            }
            return char.length;
        }

        function escape(extra) {
            switch (next_char('\\')) {
            case '\\':
            case '\'':
            case '"':
            case '/':
            case ':':
            case '=':
            case '|':
            case 'b':
            case 'f':
            case 'n':
            case 'r':
            case 't':
            case ' ':
                break;
            case 'u':
                if (next_char('u') === '{') {
                    if (some_digits(rx_hexs) > 5) {
                        warn_at('too_many_digits', line, column - 1);
                    }
                    if (!option.es6) {
                        warn_at('es6', line, column, 'u{');
                    }
                    if (next_char() !== '}') {
                        stop_at('expected_a_before_b', line, column, '}', char);
                    }
                    next_char();
                    return;
                }
                back_char();
                if (some_digits(rx_hexs, true) < 4) {
                    warn_at('expected_four_digits', line, column - 1);
                }
                break;
            case '':
                return stop_at('unclosed_string', line, column);
            default:
                if (extra && extra.indexOf(char) < 0) {
                    warn_at('unexpected_a_after_b', line, column, char, '\\');
                }
            }
            next_char();
        }

        function make(id, value, identifier) {

// Make the token object and append it to the tokens list.

            var the_token = {
                id: id,
                identifier: !!identifier,
                from: from,
                thru: column,
                line: line
            };
            tokens.push(the_token);

// Directives must appear before the first statement.

            if (id !== '(comment)') {
                directive_mode = false;
            }

// If the token is to have a value, give it one.

            if (value !== undefined) {
                the_token.value = value;
            }

// If this token is an identifier that touches a preceding number, or
// a '/', comment, or regular expression literal that touches a preceding
// comment or regular expression literal, then give a missing space warning.
// This warning is not suppressed by option.white.

            if (
                previous.line === line &&
                previous.thru === from &&
                (
                    (id === '(comment)' || id === '(regexp)' || id === '/') &&
                    (
                        previous.id === '(comment)' ||
                        previous.id === '(regexp)'
                    )
                )
            ) {
                warn(
                    'expected_space_a_b',
                    the_token,
                    artifact(previous),
                    artifact(the_token)
                );
            }
            if (previous.id === '.' && id === '(number)') {
                warn('expected_a_before_b', previous, '0', '.');
            }
            if (prior.id === '.' && the_token.identifier) {
                the_token.dot = true;
            }

// The previous token is used to detect adjacency problems.

            previous = the_token;

// The prior token is a previous token that was not a comment. The prior token
// is used to disambiguate '/', which can mean division or regular expression
// literal.

            if (previous.id !== '(comment)') {
                prior = previous;
            }
            return the_token;
        }

        function parse_directive(the_comment, body) {

// JSLint recognizes three directives that can be encoded in comments. This
// function processes one item, and calls itself recursively to process the
// next one.

            var result = body.match(rx_directive_part);
            if (result) {
                var allowed,
                    name = result[1],
                    value = result[2];
                switch (the_comment.directive) {
                case 'jslint':
                    allowed = allowed_option[name];
                    switch (typeof allowed) {
                    case 'boolean':
                    case 'object':
                        switch (value) {
                        case 'true':
                        case '':
                        case undefined:
                            option[name] = true;
                            if (Array.isArray(allowed)) {
                                populate(declared_globals, allowed, false);
                            }
                            break;
                        case 'false':
                            option[name] = false;
                            break;
                        default:
                            warn('bad_option_a', the_comment, name + ':' + value);
                        }
                        break;
                    case 'number':
                        if (isFinite(+value)) {
                            option[name] = +value;
                        } else {
                            warn('bad_option_a', the_comment, name + ':' + value);
                        }
                        break;
                    default:
                        warn('bad_option_a', the_comment, name);
                    }
                    break;
                case 'property':
                    if (tenure === undefined) {
                        tenure = empty();
                    }
                    tenure[name] = true;
                    break;
                case 'global':
                    if (value) {
                        warn('bad_option_a', the_comment, name + ':' + value);
                    }
                    declared_globals[name] = false;
                    module_mode = the_comment;
                    break;
                }
                return parse_directive(the_comment, result[3]);
            }
            if (body) {
                return stop('bad_directive_a', the_comment, body);
            }
        }

        function comment(snippet) {

// Make a comment object. Comments are not allowed in JSON text. Comments can
// include directives and notices of incompletion.

            var the_comment = make('(comment)', snippet);
            if (Array.isArray(snippet)) {
                snippet = snippet.join(' ');
            }
            if (!option.devel && rx_todo.test(snippet)) {
                warn('todo_comment', the_comment);
            }
            var result = snippet.match(rx_directive);
            if (result) {
                if (!directive_mode) {
                    warn_at('misplaced_directive_a', line, from, result[1]);
                } else {
                    the_comment.directive = result[1];
                    parse_directive(the_comment, result[2]);
                }
                directives.push(the_comment);
            }
            return the_comment;
        }

        function regexp() {

// Parse a regular expression literal.

            var result,
                value;

            function quantifier() {

// Match an optional quantifier.

                switch (char) {
                case '?':
                case '*':
                case '+':
                    next_char();
                    break;
                case '{':
                    if (some_digits(rx_digits, true) === 0) {
                        warn_at('expected_a', line, column, '0');
                    }
                    if (next_char() === ',') {
                        some_digits(rx_digits, true);
                        next_char();
                    }
                    next_char('}');
                    break;
                default:
                    return;
                }
                if (char === '?') {
                    next_char('?');
                }
            }

            function subklass() {

// Match a character in a character class.

                switch (char) {
                case '\\':
                    escape();
                    return true;
                case '[':
                case ']':
                case '/':
                case '^':
                case '-':
                case '|':
                case '':
                    return false;
                case '`':
                    if (mega_mode) {
                        warn_at('unexpected_a', line, column, '`');
                    }
                    next_char();
                    return true;
                case ' ':
                    warn_at('expected_a_before_b', line, column, '\\', ' ');
                    next_char();
                    return true;
                default:
                    next_char();
                    return true;
                }
            }

            function range() {

// Match a range of subclasses.

                if (subklass()) {
                    if (char === '-') {
                        next_char('-');
                        if (!subklass()) {
                            return stop_at('unexpected_a', line, column - 1, '-');
                        }
                    }
                    return range();
                }
            }

            function klass() {

// Match a class.

                next_char('[');
                if (char === '^') {
                    next_char('^');
                }
                range();
                next_char(']');
            }

            function choice() {

                function group() {

// Match a group that starts with left paren.

                    next_char('(');
                    if (char === '?') {
                        next_char('?');
                        switch (char) {
                        case ':':
                        case '=':
                        case '!':
                            next_char();
                            break;
                        default:
                            next_char(':');
                        }
                    } else if (char === ':') {
                        warn_at('expected_a_before_b', line, column, '?', ':');
                    }
                    choice();
                    next_char(')');
                }

                function factor() {
                    switch (char) {
                    case '[':
                        klass();
                        return true;
                    case '\\':
                        escape('BbDdSsWw^${}[]().|*+?');
                        return true;
                    case '(':
                        group();
                        return true;
                    case '/':
                    case '|':
                    case ']':
                    case ')':
                    case '}':
                    case '{':
                    case '?':
                    case '+':
                    case '*':
                    case '':
                        return false;
                    case '`':
                        if (mega_mode) {
                            warn_at('unexpected_a', line, column, '`');
                        }
                        break;
                    case ' ':
                        warn_at('expected_a_before_b', line, column, '\\', ' ');
                        break;
                    }
                    next_char();
                    return true;
                }

                function sequence(follow) {
                    if (factor()) {
                        quantifier();
                        return sequence(true);
                    }
                    if (!follow) {
                        warn_at('expected_regexp_factor_a', line, column, char);
                    }
                }

// Match a choice (a sequence that can be followed by | and another choice).

                sequence();
                if (char === '|') {
                    next_char('|');
                    return choice();
                }
            }

// Scan the regexp literal. Give a warning if the first character is = because
// /= looks like a division assignment operator.

            snippet = '';
            next_char();
            if (char === '=') {
                warn_at('expected_a_before_b', line, column, '\\', '=');
            }
            choice();

// Make sure there is a closing slash.

            snip();
            value = snippet;
            next_char('/');

// Process dangling flag letters.

            var allowed = {
                    g: true,
                    i: true,
                    m: true,
                    u: 6,
                    y: 6
                },
                flag = empty();
            (function make_flag() {
                if (is_letter(char)) {
                    switch (allowed[char]) {
                    case true:
                        break;
                    case 6:
                        if (!option.es6) {
                            warn_at('es6', line, column, char);
                        }
                        break;
                    default:
                        warn_at('unexpected_a', line, column, char);
                    }
                    allowed[char] = false;
                    flag[char] = true;
                    next_char();
                    return make_flag();
                }
            }());
            back_char();
            if (char === '/' || char === '*') {
                return stop_at('unexpected_a', line, from, char);
            }
            result = make('(regexp)', char);
            result.flag = flag;
            result.value = value;
            return result;
        }

        function string(quote) {

// Make a string token.

            var the_token;
            snippet = '';
            next_char();

            return (function next() {
                switch (char) {
                case quote:
                    snip();
                    the_token = make('(string)', snippet);
                    the_token.quote = quote;
                    return the_token;
                case '\\':
                    escape();
                    break;
                case '':
                    return stop_at('unclosed_string', line, column);
                case '`':
                    if (mega_mode) {
                        warn_at('unexpected_a', line, column, '`');
                    }
                    next_char('`');
                    break;
                default:
                    next_char();
                }
                return next();
            }());
        }

        function frack() {
            if (char === '.') {
                some_digits(rx_digits);
                next_char();
            }
            if (char === 'E' || char === 'e') {
                next_char();
                if (char !== '+' && char !== '-') {
                    back_char();
                }
                some_digits(rx_digits);
                next_char();
            }
        }

        function number() {
            if (snippet === '0') {
                switch (next_char()) {
                case '.':
                    frack();
                    break;
                case 'b':
                    some_digits(rx_bits);
                    next_char();
                    break;
                case 'o':
                    some_digits(rx_octals);
                    next_char();
                    break;
                case 'x':
                    some_digits(rx_hexs);
                    next_char();
                    break;
                }
            } else {
                next_char();
                frack();
            }

// If the next character after a number is a digit or letter, then something
// unexpected is going on.

            if (
                (char >= '0' && char <= '9') ||
                (char >= 'a' && char <= 'z') ||
                (char >= 'A' && char <= 'Z')
            ) {
                return stop_at(
                    'unexpected_a_after_b',
                    line,
                    column - 1,
                    snippet.slice(-1),
                    snippet.slice(0, -1)
                );
            }
            back_char();
            return make('(number)', snippet);
        }

        function lex() {
            var array,
                i = 0,
                j = 0,
                last,
                result,
                the_token;
            if (!source_line) {
                source_line = next_line();
                from = 0;
                return (source_line === undefined)
                    ? (mega_mode)
                        ? stop_at('unclosed_mega', mega_line, mega_from)
                        : make('(end)')
                    : lex();
            }
            from = column;
            result = source_line.match(rx_token);

// result[1] token
// result[2] whitespace
// result[3] identifier
// result[4] number
// result[5] rest

            if (!result) {
                return stop_at('unexpected_char_a', line, column, source_line.charAt(0));
            }

            snippet = result[1];
            column += snippet.length;
            source_line = result[5];

// Whitespace was matched. Call lex again to get more.

            if (result[2]) {
                return lex();
            }

// The token is an identifier.

            if (result[3]) {
                return make(snippet, undefined, true);
            }

// The token is a number.

            if (result[4]) {
                return number(snippet);
            }

// The token is something miscellaneous.

            switch (snippet) {

// The token is a single or double quote string.

            case '\'':
            case '"':
                return string(snippet);

// The token is a megastring. We don't allow any kind if mega nesting.

            case '`':
                if (mega_mode) {
                    return stop_at('expected_a_b', line, column, '}', '`');
                }
                snippet = '';
                mega_from = from;
                mega_line = line;
                mega_mode = true;

// Parsing a mega literal is tricky. First make a ` token.

                make('`');
                from += 1;

// Then loop, building up a string, possibly from many lines, until seeing
// the end of file, a closing `, or a ${ indicting an expression within the
// string.

                (function part() {
                    var at = source_line.search(rx_mega);

// If neither ` nor ${ is seen, then the whole line joins the snippet.

                    if (at < 0) {
                        snippet += source_line + '\n';
                        return (next_line() === undefined)
                            ? stop_at('unclosed_mega', mega_line, mega_from)
                            : part();
                    }

// if either ` or ${ was found, then the preceding joins the snippet to become
// a string token.

                    snippet += source_line.slice(0, at);
                    column += at;
                    source_line = source_line.slice(at);
                    make('(string)', snippet).quote = '`';
                    snippet = '';

// If ${, then make tokens that will become part of an expression until
// a } token is made.

                    if (source_line.charAt(0) === '$') {
                        column += 2;
                        make('${');
                        source_line = source_line.slice(2);
                        (function expr() {
                            var id = lex().id;
                            if (id === '{') {
                                return stop_at(
                                    'expected_a_b',
                                    line,
                                    column,
                                    '}',
                                    '{'
                                );
                            }
                            if (id !== '}') {
                                return expr();
                            }
                        }());
                        return part();
                    }
                }());
                source_line = source_line.slice(1);
                column += 1;
                mega_mode = false;
                return make('`');

// The token is a // comment.

            case '//':
                snippet = source_line;
                source_line = '';
                the_token = comment(snippet);
                if (mega_mode) {
                    warn('unexpected_comment', the_token, '`');
                }
                return the_token;

// The token is a /* comment.

            case '/*':
                array = [];
                if (source_line.charAt(0) === '/') {
                    warn_at('unexpected_a', line, column + i, '/');
                }
                (function next() {
                    if (source_line > '') {
                        i = source_line.search(rx_star_slash);
                        if (i >= 0) {
                            return;
                        }
                        j = source_line.search(rx_slash_star);
                        if (j >= 0) {
                            warn_at('nested_comment', line, column + j);
                        }
                    }
                    array.push(source_line);
                    source_line = next_line();
                    if (source_line === undefined) {
                        return stop_at('unclosed_comment', line, column);
                    }
                    return next();
                }());
                snippet = source_line.slice(0, i);
                j = snippet.search(rx_slash_star_or_slash);
                if (j >= 0) {
                    warn_at('nested_comment', line, column + j);
                }
                array.push(snippet);
                column += i + 2;
                source_line = source_line.slice(i + 2);
                return comment(array);

// The token is a slash.

            case '/':

// The / can be a division operator or the beginning of a regular expression
// literal. It is not possible to know which without doing a complete parse.
// We want to complete the tokenization before we begin to parse, so we will
// estimate. This estimator can fail in some cases. For example, it cannot
// know if '}' is ending a block or ending an object literal, so it can
// behave incorrectly in that case; it is not meaningful to divide an
// object, so it is likely that we can get away with it. We avoided the worst
// cases by eliminating automatic semicolon insertion.

                if (prior.identifier) {
                    if (!prior.dot) {
                        switch (prior.id) {
                        case 'return':
                            return regexp();
                        case '(begin)':
                        case 'case':
                        case 'delete':
                        case 'in':
                        case 'instanceof':
                        case 'new':
                        case 'typeof':
                        case 'void':
                        case 'yield':
                            the_token = regexp();
                            return stop('unexpected_a', the_token);
                        }
                    }
                } else {
                    last = prior.id.charAt(prior.id.length - 1);
                    if ('(,=:?['.indexOf(last) >= 0) {
                        return regexp();
                    }
                    if ('!&|{};~+-*%/^<>'.indexOf(last) >= 0) {
                        the_token = regexp();
                        warn('wrap_regexp', the_token);
                        return the_token;
                    }
                }
                if (source_line.charAt(0) === '/') {
                    column += 1;
                    source_line = source_line.slice(1);
                    snippet = '/=';
                    warn_at('unexpected_a', line, column, '/=');
                }
                break;
            }
            return make(snippet);
        }

// This is the only loop in JSLint. It will turn into a recursive call to lex
// when ES6 has been finished and widely deployed and adopted.

        while (true) {
            if (lex().id === '(end)') {
                break;
            }
        }
    }

// Parsing:

// Parsing weaves the tokens into an abstract syntax tree. During that process,
// a token may be given any of these properties:

//      arity       string
//      label       identifier
//      name        identifier
//      expression  expressions
//      block       statements
//      else        statements (else, default, catch)

// Specialized tokens may have additional properties.

    function survey(name) {
        var id = name.id;

// Tally the property name. If it is a string, only tally strings that conform
// to the identifier rules.

        if (id === '(string)') {
            id = name.value;
            if (!rx_identifier.test(id)) {
                return id;
            }
        } else {
            if (!name.identifier) {
                return stop('expected_identifier_a', name);
            }
        }

// If we have seen this name before, increment its count.

        if (typeof property[id] === 'number') {
            property[id] += 1;

// If this is the first time seeing this property name, and if there is a
// tenure list, then it must be on the list. Otherwise, it must conform to
// the rules for good property names.

        } else {
            if (tenure !== undefined) {
                if (tenure[id] !== true) {
                    warn('unregistered_property_a', name);
                }
            } else {
                if (name.identifier && rx_bad_property.test(id)) {
                    warn('bad_property_a', name);
                }
            }
            property[id] = 1;
        }
        return id;
    }

    function dispense() {

// Deliver the next token, skipping the comments.

        var cadet = tokens[token_nr];
        token_nr += 1;
        if (cadet.id === '(comment)') {
            if (json_mode) {
                warn('unexpected_a', cadet);
            }
            return dispense();
        } else {
            return cadet;
        }
    }

    function lookahead() {

// Look ahead one token without advancing.

        var old_token_nr = token_nr,
            cadet = dispense(true);
        token_nr = old_token_nr;
        return cadet;
    }

    function advance(id, match) {

// Produce the next token.

// Attempt to give helpful names to anonymous functions.

        if (token.identifier && token.id !== 'function') {
            anon = token.id;
        } else if (token.id === '(string)' && rx_identifier.test(token.value)) {
            anon = token.value;
        }

// Attempt to match next_token with an expected id.

        if (id !== undefined && next_token.id !== id) {
            return (match === undefined)
                ? stop('expected_a_b', next_token, id, artifact())
                : stop(
                    'expected_a_b_from_c_d',
                    next_token,
                    id,
                    artifact(match),
                    artifact_line(match),
                    artifact(next_token)
                );
        }

// Promote the tokens, skipping comments.

        token = next_token;
        next_token = dispense();
        if (next_token.id === '(end)') {
            token_nr -= 1;
        }
    }

// Parsing of JSON is simple:

    function json_value() {

        function json_object() {
            var brace = next_token,
                object = empty();
            advance('{');
            if (next_token.id !== '}') {
                (function next() {
                    if (next_token.quote !== '"') {
                        warn('unexpected_a', next_token, next_token.quote);
                    }
                    advance('(string)');
                    if (object[token.value] !== undefined) {
                        warn('duplicate_a', token);
                    } else if (token.value === '__proto__') {
                        warn('bad_property_name_a', token);
                    } else {
                        object[token.value] = token;
                    }
                    advance(':');
                    json_value();
                    if (next_token.id === ',') {
                        advance(',');
                        return next();
                    }
                }());
            }
            advance('}', brace);
        }

        function json_array() {
            var bracket = next_token;
            advance('[');
            if (next_token.id !== ']') {
                (function next() {
                    json_value();
                    if (next_token.id === ',') {
                        advance(',');
                        return next();
                    }
                }());
            }
            advance(']', bracket);
        }

        switch (next_token.id) {
        case '{':
            json_object();
            break;
        case '[':
            json_array();
            break;
        case 'true':
        case 'false':
        case 'null':
            advance();
            break;
        case '(number)':
            if (!rx_JSON_number.test(next_token.value)) {
                warn('unexpected_a');
            }
            advance();
            break;
        case '(string)':
            if (next_token.quote !== '"') {
                warn('unexpected_a', next_token, next_token.quote);
            }
            advance();
            break;
        case '-':
            advance('-');
            advance('(number)');
            break;
        default:
            stop('unexpected_a');
        }
    }

// Now we parse JavaScript.

    function enroll(name, role, readonly) {

// Enroll a name into the current function context. The role can be exception,
// function, label, parameter, or variable. We look for variable redefinition
// because it causes confusion.

        var id = name.id;

// Reserved words may not be enrolled.

        if (syntax[id] !== undefined && id !== 'ignore') {
            warn('reserved_a', name);
        } else {

// Has the name been enrolled in this context?

            var earlier = functionage.context[id];
            if (earlier) {
                warn(
                    'redefinition_a_b',
                    name,
                    name.id,
                    earlier.line + fudge
                );

// Has the name been enrolled in an outer context?

            } else {
                stack.forEach(function (value) {
                    var item = value.context[id];
                    if (item !== undefined) {
                        earlier = item;
                    }
                });
                if (earlier) {
                    if (id === 'ignore') {
                        if (earlier.role === 'variable') {
                            warn('unexpected_a', name);
                        }
                    } else {
                        if ((
                            role !== 'exception' ||
                            earlier.role !== 'exception'
                        ) && role !== 'parameter') {
                            warn(
                                'redefinition_a_b',
                                name,
                                name.id,
                                earlier.line + fudge
                            );
                        }
                    }
                }

// Enroll it.

                functionage.context[id] = name;
                name.dead = true;
                name.function = functionage;
                name.init = false;
                name.role = role;
                name.used = 0;
                name.writable = !readonly;
            }
        }
    }

    function expression(rbp, initial) {

// This is the heart of the Pratt parser. I retained Pratt's nomenclature.
// They are elements of the parsing method called Top Down Operator Precedence.

// nud     Null denotation
// led     Left denotation
// lbp     Left binding power
// rbp     Right binding power

// It processes a nud (variable, constant, prefix operator). It will then
// process leds (infix operators) until the bind powers cause it to stop. It
// returns the expression's parse tree.

        var left, the_symbol;

// Statements will have already advanced, so advance now only if the token is
// not the first of a statement,

        if (!initial) {
            advance();
        }
        the_symbol = syntax[token.id];
        if (the_symbol !== undefined && the_symbol.nud !== undefined) {
            left = the_symbol.nud();
        } else if (token.identifier) {
            left = token;
            left.arity = 'variable';
        } else {
            return stop('unexpected_a', token);
        }
        (function right() {
            the_symbol = syntax[next_token.id];
            if (
                the_symbol !== undefined &&
                the_symbol.led !== undefined &&
                rbp < the_symbol.lbp
            ) {
                advance();
                left = the_symbol.led(left);
                return right();
            }
        }());
        return left;
    }

    function condition() {

// Parse the condition part of a do, if, while.

        var the_paren = next_token,
            the_value;
        the_paren.free = true;
        advance('(');
        the_value = expression(0);
        advance(')');
        if (the_value.wrapped === true) {
            warn('unexpected_a', the_paren);
        }
        switch (the_value.id) {
        case '?':
        case '~':
        case '&':
        case '|':
        case '^':
        case '<<':
        case '>>':
        case '>>>':
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
        case 'typeof':
        case '(number)':
        case '(string)':
            warn('unexpected_a', the_value);
            break;
        }
        return the_value;
    }

    function is_weird(thing) {
        return (
            thing.id === '(regexp)' ||
            thing.id === '{' ||
            thing.id === '=>' ||
            thing.id === 'function' ||
            (thing.id === '[' && thing.arity === 'unary')
        );
    }

    function are_similar(a, b) {
        if (a === b) {
            return true;
        }
        if (Array.isArray(a)) {
            return (
                Array.isArray(b) &&
                a.length === b.length &&
                a.every(function (value, index) {
                    return are_similar(value, b[index]);
                })
            );
        }
        if (Array.isArray(b)) {
            return false;
        }
        if (a.id === '(number)' && b.id === '(number)') {
            return a.value === b.value;
        }
        var a_string, b_string;
        if (a.id === '(string)') {
            a_string = a.value;
        } else if (a.id === '`' && a.constant) {
            a_string = a.value[0];
        }
        if (b.id === '(string)') {
            b_string = b.value;
        } else if (b.id === '`' && b.constant) {
            b_string = b.value[0];
        }
        if (typeof a_string === 'string') {
            return a_string === b_string;
        }
        if (is_weird(a) || is_weird(b)) {
            return false;
        }
        if (a.arity === b.arity && a.id === b.id) {
            if (a.id === '.') {
                return are_similar(a.expression, b.expression) &&
                        are_similar(a.name, b.name);
            }
            switch (a.arity) {
            case 'unary':
                return are_similar(a.expression, b.expression);
            case 'binary':
                return a.id !== '(' &&
                        are_similar(a.expression[0], b.expression[0]) &&
                        are_similar(a.expression[1], b.expression[1]);
            case 'ternary':
                return are_similar(a.expression[0], b.expression[0]) &&
                        are_similar(a.expression[1], b.expression[1]) &&
                        are_similar(a.expression[2], b.expression[2]);
            case 'function':
            case 'regexp':
                return false;
            default:
                return true;
            }
        }
        return false;
    }

    function semicolon() {

// Try to match a semicolon.

        if (next_token.id === ';') {
            advance(';');
        } else {
            warn_at(
                'expected_a_b',
                token.line,
                token.thru,
                ';',
                artifact(next_token)
            );
        }
        anon = 'anonymous';
    }

    function statement() {

// Parse a statement. Any statement may have a label, but only four statements
// have use for one. A statement can be one of the standard statements, or
// an assignment expression, or an invocation expression.

        var first,
            the_label,
            the_statement,
            the_symbol;
        advance();
        if (token.identifier && next_token.id === ':') {
            the_label = token;
            if (the_label.id === 'ignore') {
                warn('unexpected_a', the_label);
            }
            advance(':');
            switch (next_token.id) {
            case 'do':
            case 'for':
            case 'switch':
            case 'while':
                enroll(the_label, 'label', true);
                the_label.init = true;
                the_label.dead = false;
                the_statement = statement();
                the_statement.label = the_label;
                the_statement.statement = true;
                return the_statement;
            default:
                advance();
                warn('unexpected_label_a', the_label);
            }
        }

// Parse the statement.

        first = token;
        first.statement = true;
        the_symbol = syntax[first.id];
        if (the_symbol !== undefined && the_symbol.fud !== undefined) {
            the_symbol.disrupt = false;
            the_symbol.statement = true;
            the_statement = the_symbol.fud();
        } else {

// It is an expression statement.

            the_statement = expression(0, true);
            if (the_statement.wrapped && the_statement.id !== '(') {
                warn('unexpected_a', first);
            }
            semicolon();
        }
        if (the_label !== undefined) {
            the_label.dead = true;
        }
        return the_statement;
    }

    function statements() {

// Parse a list of statements. Give a warning if an unreachable statement
// follows a disruptive statement.

        var array = [];
        (function next(disrupt) {
            var a_statement;
            switch (next_token.id) {
            case '}':
            case 'case':
            case 'default':
            case 'else':
            case '(end)':
                break;
            default:
                a_statement = statement();
                array.push(a_statement);
                if (disrupt) {
                    warn('unreachable_a', a_statement);
                }
                return next(a_statement.disrupt);
            }
        }(false));
        return array;
    }

    function not_top_level(thing) {

// Some features should not be at the outermost level.

        if (functionage === global) {
            warn('unexpected_at_top_level_a', thing);
        }
    }

    function top_level_only(the_thing) {

// Some features must be at the most outermost level.

        if (blockage !== global) {
            warn('misplaced_a', the_thing);
        }
    }

    function block(special) {

// Parse a block, a sequence of statements wrapped in braces.
//  special 'body'      The block is a function body.
//          'ignore'    No warning on an empty block.
//          'naked'     No advance.
//          undefined   Not special.

        var stmts, the_block;
        if (special !== 'naked') {
            advance('{');
        }
        the_block = token;
        the_block.arity = 'statement';
        the_block.body = special === 'body';

// All top level function bodies should include the 'use strict' pragma unless
// the whole file is strict.

        if (the_block.body && stack.length <= 1 && !global.strict) {
            if (
                next_token.id === '(string)' ||
                next_token.value === 'use strict'
            ) {
                next_token.statement = true;
                functionage.strict = true;
                advance('(string)');
                advance(';');
            } else {
                warn(
                    'expected_a_before_b',
                    next_token,
                    (next_token.id === '`')
                        ? '\''
                        : 'use strict',
                    artifact(next_token)
                );
            }
        }
        stmts = statements();
        the_block.block = stmts;
        if (stmts.length === 0) {
            if (!option.devel && special !== 'ignore') {
                warn('empty_block', the_block);
            }
            the_block.disrupt = false;
        } else {
            the_block.disrupt = stmts[stmts.length - 1].disrupt;
        }
        advance('}');
        return the_block;
    }

    function mutation_check(the_thing) {

// The only expressions that may be assigned to are
//      e.b
//      e[b]
//      v

        if (
            the_thing.id !== '.' &&
            (the_thing.id !== '[' || the_thing.arity !== 'binary') &&
            the_thing.arity !== 'variable'
        ) {
            warn('bad_assignment_a', the_thing);
            return false;
        }
        return true;
    }

    function left_check(left, right) {

// Warn if the left is not one of these:
//      e.b
//      e[b]
//      e()
//      identifier

        var id = left.id;
        if (
            !left.identifier &&
            (
                left.arity !== 'binary' ||
                (id !== '.' && id !== '(' && id !== '[')
            )
        ) {
            warn('unexpected_a', right);
            return false;
        }
        return true;
    }

// These functions are used to specify the grammar of our language:

    function symbol(id, bp) {

// Make a symbol if it does not already exist in the language's syntax.

        var the_symbol = syntax[id];
        if (the_symbol === undefined) {
            the_symbol = empty();
            the_symbol.id = id;
            the_symbol.lbp = bp || 0;
            syntax[id] = the_symbol;
        }
        return the_symbol;
    }

    function assignment(id) {

// Make an assignment operator. The one true assignment is different because
// its left side, when it is a variable, is not treated as an expression.
// That case is special because that is when a variable gets initialized. The
// other assignment operators can modify, but they cannot initialize.

        var the_symbol = symbol(id, 20);
        the_symbol.led = function (left) {
            var the_token = token,
                right;
            the_token.arity = 'assignment';
            right = expression(20 - 1);
            if (id === '=' && left.arity === 'variable') {
                the_token.names = left;
                the_token.expression = right;
            } else {
                the_token.expression = [left, right];
            }
            switch (right.arity) {
            case 'assignment':
            case 'pre':
            case 'post':
                warn('unexpected_a', right);
                break;
            }
            if (
                option.es6 &&
                left.arity === 'unary' &&
                (left.id === '[' || left.id === '{')
            ) {
                warn('expected_a_before_b', left, 'const', left.id);
            } else {
                mutation_check(left);
            }
            return the_token;
        };
        return the_symbol;
    }

    function constant(id, type, value) {

// Make a constant symbol.

        var the_symbol = symbol(id);
        the_symbol.nud = (typeof value === 'function')
            ? value
            : function () {
                token.constant = true;
                if (value !== undefined) {
                    token.value = value;
                }
                return token;
            };
        the_symbol.type = type;
        the_symbol.value = value;
        return the_symbol;
    }

    function infix(id, bp, f) {

// Make an infix operator.

        var the_symbol = symbol(id, bp);
        the_symbol.led = function (left) {
            var the_token = token;
            the_token.arity = 'binary';
            if (f !== undefined) {
                return f(left);
            }
            the_token.expression = [left, expression(bp)];
            return the_token;
        };
        return the_symbol;
    }

    function post(id) {

// Make one of the post operators.

        var the_symbol = symbol(id, 150);
        the_symbol.led = function (left) {
            token.expression = left;
            token.arity = 'post';
            mutation_check(token.expression);
            return token;
        };
        return the_symbol;
    }

    function pre(id) {

// Make one of the pre operators.

        var the_symbol = symbol(id);
        the_symbol.nud = function () {
            var the_token = token;
            the_token.arity = 'pre';
            the_token.expression = expression(150);
            mutation_check(the_token.expression);
            return the_token;
        };
        return the_symbol;
    }

    function prefix(id, f) {

// Make a prefix operator.

        var the_symbol = symbol(id);
        the_symbol.nud = function () {
            var the_token = token;
            the_token.arity = 'unary';
            if (typeof f === 'function') {
                return f();
            }
            the_token.expression = expression(150);
            return the_token;
        };
        return the_symbol;
    }

    function stmt(id, f) {

// Make a statement.

        var the_symbol = symbol(id);
        the_symbol.fud = function () {
            token.arity = 'statement';
            return f();
        };
        return the_symbol;
    }

    function ternary(id1, id2) {

// Make a ternary operator.

        var the_symbol = symbol(id1, 30);
        the_symbol.led = function (left) {
            var the_token = token,
                second = expression(20);
            advance(id2);
            token.arity = 'ternary';
            the_token.arity = 'ternary';
            the_token.expression = [left, second, expression(10)];
            return the_token;
        };
        return the_symbol;
    }

// Begin defining the language.

    syntax = empty();

    symbol('}');
    symbol(')');
    symbol(']');
    symbol(',');
    symbol(';');
    symbol(':');
    symbol('*/');
    symbol('await');
    symbol('case');
    symbol('catch');
    symbol('class');
    symbol('default');
    symbol('else');
    symbol('enum');
    symbol('finally');
    symbol('implements');
    symbol('interface');
    symbol('package');
    symbol('private');
    symbol('protected');
    symbol('public');
    symbol('static');
    symbol('super');
    symbol('void');
    symbol('yield');

    constant('(number)', 'number');
    constant('(regexp)', 'regexp');
    constant('(string)', 'string');
    constant('arguments', 'object', function () {
        if (option.es6) {
            warn('unexpected_a', token);
        }
        return token;
    });
    constant('eval', 'function', function () {
        if (!option.eval) {
            warn('unexpected_a', token);
        } else if (next_token.id !== '(') {
            warn('expected_a_before_b', next_token, '(', artifact());
        }
        return token;
    });
    constant('false', 'boolean', false);
    constant('Function', 'function', function () {
        if (!option.eval) {
            warn('unexpected_a', token);
        } else if (next_token.id !== '(') {
            warn('expected_a_before_b', next_token, '(', artifact());
        }
        return token;
    });
    constant('ignore', 'undefined', function () {
        warn('unexpected_a', token);
        return token;
    });
    constant('Infinity', 'number', Infinity);
    constant('NaN', 'number', NaN);
    constant('null', 'null', null);
    constant('this', 'object', function () {
        if (!option.this) {
            warn('unexpected_a', token);
        }
        return token;
    });
    constant('true', 'boolean', true);
    constant('undefined', 'undefined');

    assignment('=');
    assignment('+=');
    assignment('-=');
    assignment('*=');
    assignment('/=');
    assignment('%=');
    assignment('&=');
    assignment('|=');
    assignment('^=');
    assignment('<<=');
    assignment('>>=');
    assignment('>>>=');

    infix('||', 40);
    infix('&&', 50);
    infix('|', 70);
    infix('^', 80);
    infix('&', 90);
    infix('==', 100);
    infix('===', 100);
    infix('!=', 100);
    infix('!==', 100);
    infix('<', 110);
    infix('>', 110);
    infix('<=', 110);
    infix('>=', 110);
    infix('in', 110);
    infix('instanceof', 110);
    infix('<<', 120);
    infix('>>', 120);
    infix('>>>', 120);
    infix('+', 130);
    infix('-', 130);
    infix('*', 140);
    infix('/', 140);
    infix('%', 140);
    infix('(', 160, function (left) {
        var the_paren = token,
            the_argument;
        if (left.id !== 'function') {
            left_check(left, the_paren);
        }
        the_paren.expression = [left];
        if (left.identifier) {
            if (left.new) {
                if (
                    left.id.charAt(0) > 'Z' ||
                    left.id === 'Boolean' ||
                    left.id === 'Number' ||
                    left.id === 'String' ||
                    (left.id === 'Symbol' && option.es6)
                ) {
                    warn('unexpected_a', left, 'new');
                } else if (left.id === 'Function') {
                    if (!option.eval) {
                        warn('unexpected_a', left, 'new Function');
                    }
                } else if (left.id === 'Array') {
                    warn('expected_a_b', left, '[]', 'new Array');
                } else if (left.id === 'Object') {
                    warn(
                        'expected_a_b',
                        left,
                        'Object.create(null)',
                        'new Object'
                    );
                }
            } else {
                if (
                    left.id.charAt(0) >= 'A' &&
                    left.id.charAt(0) <= 'Z' &&
                    left.id !== 'Boolean' &&
                    left.id !== 'Number' &&
                    left.id !== 'String' &&
                    left.id !== 'Symbol'
                ) {
                    warn(
                        'expected_a_before_b',
                        left,
                        'new',
                        artifact(left)
                    );
                }
                if (functionage.arity === 'statement') {
                    functionage.name.calls[left.id] = left;
                }
            }
        }
        if (next_token.id !== ')') {
            (function next() {
                var ellipsis;
                if (next_token.id === '...') {
                    if (!option.es6) {
                        warn('es6');
                    }
                    ellipsis = true;
                    advance('...');
                }
                the_argument = expression(10);
                if (ellipsis) {
                    the_argument.ellipsis = true;
                }
                the_paren.expression.push(the_argument);
                if (next_token.id === ',') {
                    advance(',');
                    return next();
                }
            }());
        }
        advance(')', the_paren);
        if (the_paren.expression.length === 2) {
            the_paren.free = true;
            if (the_argument.wrapped === true) {
                warn('unexpected_a', the_paren);
            }
            if (the_argument.id === '(') {
                the_argument.wrapped = true;
            }
        } else {
            the_paren.free = false;
        }
        return the_paren;
    });
    infix('.', 170, function (left) {
        var the_token = token,
            name = next_token;
        if (
            (left.id !== '(string)' || name.id !== 'indexOf') &&
            (left.id !== '[' || (
                name.id !== 'concat' && name.id !== 'forEach'
            )) &&
            (left.id !== '+' || name.id !== 'slice') &&
            (left.id !== '(regexp)' || (
                name.id !== 'exec' && name.id !== 'test'
            ))
        ) {
            left_check(left, the_token);
        }
        if (!name.identifier) {
            stop('expected_identifier_a');
        }
        advance();
        survey(name);

// The property name is not an expression.

        the_token.name = name;
        the_token.expression = left;
        return the_token;
    });
    infix('[', 170, function (left) {
        var the_token = token,
            the_subscript = expression(0);
        if (
            the_subscript.id === '(string)' &&
            rx_identifier.test(the_subscript.value)
        ) {
            warn('subscript_a', the_subscript);
            survey(the_subscript);
        } else if (the_subscript.id === '`') {
            warn('unexpected_a', the_subscript);
        }
        left_check(left, the_token);
        the_token.expression = [left, the_subscript];
        advance(']');
        return the_token;
    });
    infix('=>', 170, function (left) {
        return stop('expected_a_before_b', left, '(', artifact(left));
    });

    function do_tick() {
        var the_tick = token;
        if (!option.es6) {
            warn('es6', the_tick);
        }
        the_tick.value = [];
        the_tick.expression = [];
        if (next_token.id !== '`') {
            (function part() {
                advance('(string)');
                the_tick.value.push(token);
                if (next_token.id === '${') {
                    advance('${');
                    the_tick.expression.push(expression(0));
                    advance('}');
                    return part();
                }
            }());
        }
        advance('`');
        return the_tick;
    }

    infix('`', 160, function (left) {
        var the_tick = do_tick();
        left_check(left, the_tick);
        the_tick.expression = [left].concat(the_tick.expression);
        return the_tick;
    });

    post('++');
    post('--');
    pre('++');
    pre('--');

    prefix('+');
    prefix('-');
    prefix('~');
    prefix('!');
    prefix('!!');
    prefix('[', function () {
        var the_token = token;
        the_token.expression = [];
        if (next_token.id !== ']') {
            (function next() {
                var element,
                    ellipsis = false;
                if (next_token.id === '...') {
                    ellipsis = true;
                    if (!option.es6) {
                        warn('es6');
                    }
                    advance('...');
                }
                element = expression(10);
                if (ellipsis) {
                    element.ellipsis = true;
                }
                the_token.expression.push(element);
                if (next_token.id === ',') {
                    advance(',');
                    return next();
                }
            }());
        }
        advance(']');
        return the_token;
    });
    prefix('/=', function () {
        stop('expected_a_b', token, '/\\=', '/=');
    });
    prefix('=>', function () {
        return stop('expected_a_before_b', token, '()', '=>');
    });
    prefix('new', function () {
        var the_new = token;
        next_token.new = true;
        the_new.expression = expression(150);
        if (the_new.expression.id !== '(') {
            warn('expected_a_before_b', next_token, '()', artifact(next_token));
        }
        return the_new;
    });
    prefix('typeof');
    prefix('void', function () {
        var the_void = token;
        warn('unexpected_a', the_void);
        the_void.expression = expression(0);
        return the_void;
    });

    function parameter(list, signature) {
        var ellipsis = false,
            param;
        if (next_token.id === '{') {
            if (!option.es6) {
                warn('es6');
            }
            param = next_token;
            param.names = [];
            advance('{');
            signature.push('{');
            (function subparameter() {
                var subparam = next_token;
                if (!subparam.identifier) {
                    return stop('expected_identifier_a');
                }
                survey(subparam);
                advance();
                signature.push(subparam.id);
                if (next_token.id === ':') {
                    advance(':');
                    advance();
                    token.label = subparam;
                    subparam = token;
                    if (!subparam.identifier) {
                        return stop('expected_identifier_a');
                    }
                }
                param.names.push(subparam);
                if (next_token.id === ',') {
                    advance(',');
                    signature.push(", ");
                    return subparameter();
                }
            }());
            list.push(param);
            advance('}');
            signature.push('}');
            if (next_token.id === ',') {
                advance(',');
                signature.push(", ");
                return parameter(list, signature);
            }
        } else if (next_token.id === '[') {
            if (!option.es6) {
                warn('es6');
            }
            param = next_token;
            param.names = [];
            advance('[');
            signature.push("[]");
            (function subparameter() {
                var subparam = next_token;
                if (!subparam.identifier) {
                    return stop('expected_identifier_a');
                }
                advance();
                param.names.push(subparam);
                if (next_token.id === ',') {
                    advance(',');
                    return subparameter();
                }
            }());
            list.push(param);
            advance(']');
            if (next_token.id === ',') {
                advance(',');
                signature.push(", ");
                return parameter(list, signature);
            }
        } else {
            if (next_token.id === '...') {
                if (!option.es6) {
                    warn('es6');
                }
                ellipsis = true;
                signature.push("...");
                advance('...');
            }
            if (!next_token.identifier) {
                return stop('expected_identifier_a');
            }
            param = next_token;
            list.push(param);
            advance();
            signature.push(param.id);
            if (ellipsis) {
                param.ellipsis = true;
            } else {
                if (next_token.id === '=') {
                    if (!option.es6) {
                        warn('es6');
                    }
                    advance('=');
                    param.expression = expression(0);
                }
                if (next_token.id === ',') {
                    advance(',');
                    signature.push(", ");
                    return parameter(list, signature);
                }
            }
        }
    }

    function parameter_list() {
        var list = [], signature = ['('];
        if (next_token.id !== ')' && next_token.id !== '(end)') {
            parameter(list, signature);
        }
        advance(')');
        signature.push(')');
        return [list, signature.join('')];
    }

    function do_function(the_function) {
        var name;
        if (the_function === undefined) {
            the_function = token;

// A function statement must have a name that will be in the parent's scope.

            if (the_function.arity === 'statement') {
                if (!next_token.identifier) {
                    return stop('expected_identifier_a', next_token);
                }
                name = next_token;
                enroll(name, 'variable', true);
                the_function.name = name;
                name.init = true;
                name.calls = empty();
                advance();
            } else if (name === undefined) {

// A function expression may have an optional name.

                if (next_token.identifier) {
                    name = next_token;
                    the_function.name = name;
                    advance();
                } else {
                    the_function.name = anon;
                }
            }
        } else {
            name = the_function.name;
        }
        the_function.level = functionage.level + 1;
        if (mega_mode) {
            warn('unexpected_a', the_function);
        }

// Don't make functions in loops. It is inefficient, and it can lead to scoping
// errors.

        if (functionage.loop > 0) {
            warn('function_in_loop', the_function);
        }

// Give the function properties for storing its names and for observing the
// depth of loops and switches.

        the_function.context = empty();
        the_function.loop = 0;
        the_function.switch = 0;

// Push the current function context and establish a new one.

        stack.push(functionage);
        functions.push(the_function);
        functionage = the_function;
        if (the_function.arity !== 'statement' && name) {
            enroll(name, 'function', true);
            name.dead = false;
            name.init = true;
            name.used = 1;
        }

// Parse the parameter list.

        advance('(');
        token.free = false;
        token.arity = 'function';
        var pl = parameter_list();
        functionage.parameters = pl[0];
        functionage.signature = pl[1];
        functionage.parameters.forEach(function enroll_parameter(name) {
            if (name.identifier) {
                enroll(name, 'parameter', false);
            } else {
                name.names.forEach(enroll_parameter);
            }
        });

// The function's body is a block.

        the_function.block = block('body');
        if (the_function.arity === 'statement' && next_token.line === token.line) {
            return stop('unexpected_a', next_token);
        }
        if (next_token.id === '.' || next_token.id === '[') {
            warn('unexpected_a');
        }

// Restore the previous context.

        functionage = stack.pop();
        return the_function;
    }

    prefix('function', do_function);

    function fart(pl) {
        if (next_token.id === ';') {
            stop('wrap_assignment', token);
        }
        advance('=>');
        var the_arrow = token;
        the_arrow.arity = 'binary';
        the_arrow.name = "=>";
        the_arrow.level = functionage.level + 1;
        functions.push(the_arrow);
        if (functionage.loop > 0) {
            warn('function_in_loop', the_arrow);
        }

// Give the function properties storing its names and for observing the depth
// of loops and switches.

        the_arrow.context = empty();
        the_arrow.loop = 0;
        the_arrow.switch = 0;

// Push the current function context and establish a new one.

        stack.push(functionage);
        functionage = the_arrow;
        the_arrow.parameters = pl[0];
        the_arrow.signature = pl[1];
        the_arrow.parameters.forEach(function (name) {
            enroll(name, 'parameter', true);
        });
        if (!option.es6) {
            warn('es6', the_arrow);
        }
        if (next_token.id === '{') {
            warn('expected_a_b', the_arrow, "function", "=>");
            the_arrow.block = block('body');
        } else {
            the_arrow.expression = expression(0);
        }
        functionage = stack.pop();
        return the_arrow;
    }

    prefix('(', function () {
        var the_paren = token,
            the_value,
            cadet = lookahead().id;

// We can distinguish between a parameter list for => and a wrapped expression
// with one token of lookahead.

        if (
            next_token.id === ')' ||
            next_token.id === '...' ||
            (next_token.identifier && (cadet === ',' || cadet === '='))
        ) {
            the_paren.free = false;
            return fart(parameter_list());
        }
        the_paren.free = true;
        the_value = expression(0);
        if (the_value.wrapped === true) {
            warn('unexpected_a', the_paren);
        }
        the_value.wrapped = true;
        advance(')', the_paren);
        if (next_token.id === "=>") {
            if (the_value.arity !== 'variable') {
                return stop('expected_identifier_a', the_value);
            }
            the_paren.expression = [the_value];
            return fart([the_paren.expression, "(" + the_value.id + ")"]);
        }
        return the_value;
    });
    prefix('`', do_tick);
    prefix('{', function () {
        var the_brace = token,
            seen = empty();
        the_brace.expression = [];
        if (next_token.id !== '}') {
            (function member() {
                var extra = true,
                    id,
                    name = next_token,
                    value;
                advance();
                if (
                    (name.id === 'get' || name.id === 'set') &&
                    next_token.identifier
                ) {
                    extra = name.id;
                    name = next_token;
                    advance();
                }
                id = survey(name);
                if (seen[id] === true) {
                    warn('duplicate_a', name);
                } else if (seen[id] === 'get' && extra !== 'set') {
                    warn('expected_a_before_b', name, 'set', artifact(name));
                }
                seen[id] = (extra === 'get')
                    ? 'get'
                    : true;
                if (name.identifier) {
                    switch (next_token.id) {
                    case '}':
                    case ',':
                        if (!option.es6) {
                            warn('es6');
                        } else if (extra !== true) {
                            advance(':');
                        }
                        value = expression(Infinity, true);
                        break;
                    case '(':
                        if (!option.es6 && typeof extra !== 'string') {
                            warn('es6');
                        }
                        value = do_function({
                            arity: 'unary',
                            from: name.from,
                            id: 'function',
                            line: name.line,
                            name: name,
                            thru: name.from
                        }, name);
                        break;
                    default:
                        advance(':');
                        value = expression(0);
                    }
                    value.label = name;
                    if (typeof extra === 'string') {
                        value.extra = extra;
                    }
                    the_brace.expression.push(value);
                } else {
                    advance(':');
                    value = expression(0);
                    value.label = name;
                    the_brace.expression.push(value);
                }
                if (next_token.id === ',') {
                    advance(',');
                    return member();
                }
            }());
        }
        advance('}');
        return the_brace;
    });

    stmt(';', function () {
        warn('unexpected_a', token);
        return token;
    });
    stmt('{', function () {
        warn('naked_block', token);
        return block('naked');
    });
    stmt('break', function () {
        var the_break = token,
            the_label;
        if (functionage.loop < 1 && functionage.switch < 1) {
            warn('unexpected_a', the_break);
        }
        the_break.disrupt = true;
        if (next_token.identifier && token.line === next_token.line) {
            the_label = functionage.context[next_token.id];
            if (
                the_label === undefined ||
                the_label.role !== 'label' ||
                the_label.dead
            ) {
                warn((the_label !== undefined && the_label.dead)
                    ? 'out_of_scope_a'
                    : 'not_label_a');
            } else {
                the_label.used += 1;
            }
            the_break.label = next_token;
            advance();
        }
        advance(';');
        return the_break;
    });

    function do_var() {
        var the_statement = token,
            is_const = the_statement.id === 'const';
        the_statement.names = [];

// A program may use var or let, but not both, and let and const require
// option.es6.

        if (is_const) {
            if (!option.es6) {
                warn('es6', the_statement);
            }
        } else if (var_mode === undefined) {
            var_mode = the_statement.id;
            if (!option.es6 && var_mode !== 'var') {
                warn('es6', the_statement);
            }
        } else if (the_statement.id !== var_mode) {
            warn(
                'expected_a_b',
                the_statement,
                var_mode,
                the_statement.id
            );
        }

// We don't expect to see variables created in switch statements.

        if (functionage.switch > 0) {
            warn('var_switch', the_statement);
        }
        if (functionage.loop > 0 && the_statement.id === 'var') {
            warn('var_loop', the_statement);
        }
        (function next() {
            if (next_token.id === '{' && the_statement.id !== 'var') {
                var the_brace = next_token;
                the_brace.names = [];
                advance('{');
                (function pair() {
                    if (!next_token.identifier) {
                        return stop('expected_identifier_a', next_token);
                    }
                    var name = next_token;
                    survey(name);
                    advance();
                    if (next_token.id === ':') {
                        advance(':');
                        if (!next_token.identifier) {
                            return stop('expected_identifier_a', next_token);
                        }
                        next_token.label = name;
                        the_brace.names.push(next_token);
                        enroll(next_token, 'variable', is_const);
                        advance();
                    } else {
                        the_brace.names.push(name);
                        enroll(name, 'variable', is_const);
                    }
                    if (next_token.id === ',') {
                        advance(',');
                        return pair();
                    }
                }());
                advance('}');
                advance('=');
                the_brace.expression = expression(0);
                the_statement.names.push(the_brace);
            } else if (next_token.id === '[' && the_statement.id !== 'var') {
                var the_bracket = next_token;
                the_bracket.names = [];
                advance('[');
                (function element() {
                    var ellipsis;
                    if (next_token.id === '...') {
                        ellipsis = true;
                        advance('...');
                    }
                    if (!next_token.identifier) {
                        return stop('expected_identifier_a', next_token);
                    }
                    var name = next_token;
                    advance();
                    the_bracket.names.push(name);
                    enroll(name, 'variable', the_statement.id === 'const');
                    if (ellipsis) {
                        name.ellipsis = true;
                    } else if (next_token.id === ',') {
                        advance(',');
                        return element();
                    }
                }());
                advance(']');
                advance('=');
                the_bracket.expression = expression(0);
                the_statement.names.push(the_bracket);
            } else if (next_token.identifier) {
                var name = next_token;
                advance();
                if (name.id === 'ignore') {
                    warn('unexpected_a', name);
                }
                enroll(name, 'variable', is_const);
                if (next_token.id === '=' || is_const) {
                    advance('=');
                    name.expression = expression(0);
                    name.init = true;
                }
                the_statement.names.push(name);
            } else {
                return stop('expected_identifier_a', next_token);
            }
            if (next_token.id === ',') {
                advance(',');
                return next();
            }
        }());
        the_statement.open =
                the_statement.names.length > 1 &&
                the_statement.line !== the_statement.names[1].line;
        semicolon();
        return the_statement;
    }

    stmt('const', do_var);
    stmt('continue', function () {
        var the_continue = token;
        if (functionage.loop < 1) {
            warn('unexpected_a', the_continue);
        }
        not_top_level(the_continue);
        the_continue.disrupt = true;
        warn('unexpected_a', the_continue);
        advance(';');
        return the_continue;
    });
    stmt('debugger', function () {
        var the_debug = token;
        if (!option.devel) {
            warn('unexpected_a', the_debug);
        }
        semicolon();
        return the_debug;
    });
    stmt('delete', function () {
        var the_token = token,
            the_value = expression(0);
        if (
            (the_value.id !== '.' && the_value.id !== '[') ||
            the_value.arity !== 'binary'
        ) {
            stop('expected_a_b', the_value, '.', artifact(the_value));
        }
        the_token.expression = the_value;
        semicolon();
        return the_token;
    });
    stmt('do', function () {
        var the_do = token;
        not_top_level(the_do);
        functionage.loop += 1;
        the_do.block = block();
        advance('while');
        the_do.expression = condition();
        semicolon();
        if (the_do.block.disrupt === true) {
            warn('weird_loop', the_do);
        }
        functionage.loop -= 1;
        return the_do;
    });
    stmt('export', function () {
        var the_export = token;
        if (!option.es6) {
            warn('es6', the_export);
        }
        if (typeof module_mode === 'object') {
            warn('unexpected_directive_a', module_mode, module_mode.directive);
        }
        advance('default');
        if (export_mode) {
            warn('duplicate_a', token);
        }
        module_mode = true;
        export_mode = true;
        the_export.expression = expression(0);
        semicolon();
        return the_export;
    });
    stmt('for', function () {
        var first,
            the_for = token;
        if (!option.for) {
            warn('unexpected_a', the_for);
        }
        not_top_level(the_for);
        functionage.loop += 1;
        advance('(');
        token.free = true;
        if (next_token.id === ';') {
            return stop('expected_a_b', the_for, 'while (', 'for (;');
        }
        if (
            next_token.id === 'var' ||
            next_token.id === 'let' ||
            next_token.id === 'const'
        ) {
            return stop('unexpected_a');
        }
        first = expression(0);
        if (first.id === 'in') {
            if (first.expression[0].arity !== 'variable') {
                warn('bad_assignment_a', first.expression[0]);
            }
            the_for.name = first.expression[0];
            the_for.expression = first.expression[1];
            warn('expected_a_b', the_for, 'Object.keys', 'for in');
        } else {
            the_for.initial = first;
            advance(';');
            the_for.expression = expression(0);
            advance(';');
            the_for.inc = expression(0);
            if (the_for.inc.id === '++') {
                warn('expected_a_b', the_for.inc, '+= 1', '++');
            }
        }
        advance(')');
        the_for.block = block();
        if (the_for.block.disrupt === true) {
            warn('weird_loop', the_for);
        }
        functionage.loop -= 1;
        return the_for;
    });
    stmt('function', do_function);
    stmt('if', function () {
        var the_else,
            the_if = token;
        the_if.expression = condition();
        the_if.block = block();
        if (next_token.id === 'else') {
            advance('else');
            the_else = token;
            the_if.else = (next_token.id === 'if')
                ? statement()
                : block();
            if (the_if.block.disrupt === true) {
                if (the_if.else.disrupt === true) {
                    the_if.disrupt = true;
                } else {
                    warn('unexpected_a', the_else);
                }
            }
        }
        return the_if;
    });
    stmt('import', function () {
        var the_import = token;
        if (!option.es6) {
            warn('es6', the_import);
        } else if (typeof module_mode === 'object') {
            warn('unexpected_directive_a', module_mode, module_mode.directive);
        }
        module_mode = true;
        if (!next_token.identifier) {
            return stop('expected_identifier_a');
        }
        var name = next_token;
        advance();
        if (name.id === 'ignore') {
            warn('unexpected_a', name);
        }
        enroll(name, 'variable', true);
        advance('from');
        advance('(string)');
        the_import.import = token;
        the_import.name = name;
        if (!rx_identifier.test(token.value)) {
            warn('bad_module_name_a', token);
        }
        imports.push(token.value);
        semicolon();
        return the_import;
    });
    stmt('let', do_var);
    stmt('return', function () {
        var the_return = token;
        not_top_level(the_return);
        the_return.disrupt = true;
        if (next_token.id !== ';' && the_return.line === next_token.line) {
            the_return.expression = expression(10);
        }
        advance(';');
        return the_return;
    });
    stmt('switch', function () {
        var dups = [],
            last,
            stmts,
            the_cases = [],
            the_disrupt = true,
            the_switch = token;
        not_top_level(the_switch);
        functionage.switch += 1;
        advance('(');
        token.free = true;
        the_switch.expression = expression(0);
        the_switch.block = the_cases;
        advance(')');
        advance('{');
        (function major() {
            var the_case = next_token;
            the_case.arity = 'statement';
            the_case.expression = [];
            (function minor() {
                advance('case');
                token.switch = true;
                var exp = expression(0);
                if (dups.some(function (thing) {
                    return are_similar(thing, exp);
                })) {
                    warn('unexpected_a', exp);
                }
                dups.push(exp);
                the_case.expression.push(exp);
                advance(':');
                if (next_token.id === 'case') {
                    return minor();
                }
            }());
            stmts = statements();
            if (stmts.length < 1) {
                warn('expected_statements_a');
                return;
            }
            the_case.block = stmts;
            the_cases.push(the_case);
            last = stmts[stmts.length - 1];
            if (last.disrupt) {
                if (last.id === 'break' && last.label === undefined) {
                    the_disrupt = false;
                }
            } else {
                warn(
                    'expected_a_before_b',
                    next_token,
                    'break;',
                    artifact(next_token)
                );
            }
            if (next_token.id === 'case') {
                return major();
            }
        }());
        dups = undefined;
        if (next_token.id === 'default') {
            advance('default');
            token.switch = true;
            advance(':');
            the_switch.else = statements();
            if (the_switch.else.length < 1) {
                warn('expected_statements_a');
                the_disrupt = false;
            } else {
                the_disrupt =
                        the_disrupt &&
                        the_switch.else[the_switch.else.length - 1].disrupt;
            }
        } else {
            the_disrupt = false;
        }
        advance('}', the_switch);
        functionage.switch -= 1;
        the_switch.disrupt = the_disrupt;
        return the_switch;
    });
    stmt('throw', function () {
        var the_throw = token;
        the_throw.disrupt = true;
        the_throw.expression = expression(10);
        semicolon();
        return the_throw;
    });
    stmt('try', function () {
        var clause = false,
            the_catch,
            the_disrupt,
            the_try = token;
        the_try.block = block();
        the_disrupt = the_try.block.disrupt;
        if (next_token.id === 'catch') {
            var ignored = 'ignore';
            clause = true;
            the_catch = next_token;
            the_try.catch = the_catch;
            advance('catch');
            advance('(');
            if (!next_token.identifier) {
                return stop('expected_identifier_a', next_token);
            }
            if (next_token.id !== 'ignore') {
                ignored = undefined;
                the_catch.name = next_token;
                enroll(next_token, 'exception', true);
            }
            advance();
            advance(')');
            the_catch.block = block(ignored);
            if (the_catch.block.disrupt !== true) {
                the_disrupt = false;
            }
        }
        if (next_token.id === 'finally') {
            clause = true;
            advance('finally');
            the_try.else = block();
            the_disrupt = the_try.else.disrupt;
        }
        the_try.disrupt = the_disrupt;
        if (!clause) {
            warn('expected_a_before_b', next_token, 'catch', artifact(next_token));
        }
        return the_try;
    });
    stmt('var', do_var);
    stmt('while', function () {
        var the_while = token;
        not_top_level(the_while);
        functionage.loop += 1;
        the_while.expression = condition();
        the_while.block = block();
        if (the_while.block.disrupt === true) {
            warn('weird_loop', the_while);
        }
        functionage.loop -= 1;
        return the_while;
    });
    stmt('with', function () {
        stop('unexpected_a', token);
    });

    ternary('?', ':');

// Ambulation of the parse tree.

    function action(when) {

// Produce a function that will register task functions that will be called as
// the tree is traversed.

        return function (arity, id, task) {
            var a_set = when[arity],
                i_set;

// The id parameter is optional. If excluded, the task will be applied to all
// ids.

            if (typeof id !== 'string') {
                task = id;
                id = '(all)';
            }

// If this arity has no registrations yet, then create a set object to hold
// them.

            if (a_set === undefined) {
                a_set = empty();
                when[arity] = a_set;
            }

// If this id has no registrations yet, then create a set array to hold them.

            i_set = a_set[id];
            if (i_set === undefined) {
                i_set = [];
                a_set[id] = i_set;
            }

// Register the task with the arity and the id.

            i_set.push(task);
        };
    }

    function amble(when) {

// Produce a function that will act on the tasks registered by an action
// function while walking the tree.

        return function (the_token) {

// Given a task set that was built by an action function, run all of the
// relevant tasks on the token.

            var a_set = when[the_token.arity],
                i_set;

// If there are tasks associated with the token's arity...

            if (a_set !== undefined) {

// If there are tasks associated with the token's id...

                i_set = a_set[the_token.id];
                if (i_set !== undefined) {
                    i_set.forEach(function (task) {
                        return task(the_token);
                    });
                }

// If there are tasks for all ids.

                i_set = a_set['(all)'];
                if (i_set !== undefined) {
                    i_set.forEach(function (task) {
                        return task(the_token);
                    });
                }
            }
        };
    }

    var posts = empty(),
        pres = empty(),
        preaction = action(pres),
        postaction = action(posts),
        preamble = amble(pres),
        postamble = amble(posts);

    function walk_expression(thing) {
        if (thing) {
            if (Array.isArray(thing)) {
                thing.forEach(walk_expression);
            } else {
                preamble(thing);
                walk_expression(thing.expression);
                if (thing.id === 'function') {
                    walk_statement(thing.block);
                }
                switch (thing.arity) {
                case 'post':
                case 'pre':
                    warn('unexpected_a', thing);
                    break;
                case 'statement':
                case 'assignment':
                    warn('unexpected_statement_a', thing);
                    break;
                }
                postamble(thing);
            }
        }
    }

    function walk_statement(thing) {
        if (thing) {
            if (Array.isArray(thing)) {
                thing.forEach(walk_statement);
            } else {
                preamble(thing);
                walk_expression(thing.expression);
                switch (thing.arity) {
                case 'statement':
                case 'assignment':
                    break;
                case 'binary':
                    if (thing.id !== '(') {
                        warn('unexpected_expression_a', thing);
                    }
                    break;
                default:
                    warn('unexpected_expression_a', thing);
                }
                walk_statement(thing.block);
                walk_statement(thing.else);
                postamble(thing);
            }
        }
    }

    function lookup(thing) {
        if (thing.arity === 'variable') {

// Look up the variable in the current context.

            var the_variable = functionage.context[thing.id];

// If it isn't local, search all the other contexts. If there are name
// collisions, take the most recent.

            if (the_variable === undefined) {
                stack.forEach(function (outer) {
                    var a_variable = outer.context[thing.id];
                    if (
                        a_variable !== undefined &&
                        a_variable.role !== 'label'
                    ) {
                        the_variable = a_variable;
                    }
                });

// If it isn't in any of those either, perhaps it is a predefined global.
// If so, add it to the global context.

                if (the_variable === undefined) {
                    if (declared_globals[thing.id] === undefined) {
                        warn('undeclared_a', thing);
                        return;
                    }
                    the_variable = {
                        dead: false,
                        function: global,
                        id: thing.id,
                        init: true,
                        role: 'variable',
                        used: 0,
                        writable: false
                    };
                    global.context[thing.id] = the_variable;
                }
                the_variable.closure = true;
                functionage.context[thing.id] = the_variable;
            } else if (the_variable.role === 'label') {
                warn('label_a', thing);
            }
            if (the_variable.dead) {
                warn('out_of_scope_a', thing);
            }
            return the_variable;
        }
    }

    function subactivate(name) {
        name.init = true;
        name.dead = false;
        blockage.live.push(name);
    }

    function preaction_function(thing) {
        if (thing.arity === 'statement' && blockage.body !== true) {
            warn('unexpected_a', thing);
        }
        stack.push(functionage);
        block_stack.push(blockage);
        functionage = thing;
        blockage = thing;
        thing.live = [];
        if (typeof thing.name === 'object') {
            thing.name.dead = false;
            thing.name.init = true;
        }
        switch (thing.extra) {
        case 'get':
            if (thing.parameters.length !== 0) {
                warn('bad_get', thing);
            }
            break;
        case 'set':
            if (thing.parameters.length !== 1) {
                warn('bad_set', thing);
            }
            break;
        }
        thing.parameters.forEach(function (name) {
            walk_expression(name.expression);
            if (name.id === '{' || name.id === '[') {
                name.names.forEach(subactivate);
            } else {
                name.dead = false;
                name.init = true;
            }
        });
    }

    function bitwise_check(thing) {
        if (!option.bitwise && bitwiseop[thing.id] === true) {
            warn('unexpected_a', thing);
        }
        if (
            thing.id !== '(' &&
            thing.id !== '&&' &&
            thing.id !== '||' &&
            thing.id !== '=' &&
            Array.isArray(thing.expression) &&
            thing.expression.length === 2 && (
                relationop[thing.expression[0].id] === true ||
                relationop[thing.expression[1].id] === true
            )
        ) {
            warn('unexpected_a', thing);
        }
    }

    function pop_block() {
        blockage.live.forEach(function (name) {
            name.dead = true;
        });
        delete blockage.live;
        blockage = block_stack.pop();
    }

    function activate(name) {
        if (name.expression !== undefined) {
            walk_expression(name.expression);
            if (name.id === '{' || name.id === '[') {
                name.names.forEach(subactivate);
            } else {
                name.init = true;
            }
        }
        name.dead = false;
        blockage.live.push(name);
    }

    function action_var(thing) {
        thing.names.forEach(activate);
    }

    preaction('assignment', bitwise_check);
    preaction('binary', bitwise_check);
    preaction('binary', function (thing) {
        if (relationop[thing.id] === true) {
            var left = thing.expression[0],
                right = thing.expression[1];
            if (left.id === 'NaN' || right.id === 'NaN') {
                warn('isNaN', thing);
            } else if (left.id === 'typeof') {
                if (right.id !== '(string)') {
                    if (right.id !== 'typeof') {
                        warn('expected_string_a', right);
                    }
                } else {
                    var value = right.value;
                    if (value === 'symbol') {
                        if (!option.es6) {
                            warn('es6', right, value);
                        }
                    } else if (value === 'null' || value === 'undefined') {
                        warn('unexpected_typeof_a', right, value);
                    } else if (
                        value !== 'boolean' &&
                        value !== 'function' &&
                        value !== 'number' &&
                        value !== 'object' &&
                        value !== 'string'
                    ) {
                        warn('expected_type_string_a', right, value);
                    }
                }
            }
        }
    });
    preaction('binary', '==', function (thing) {
        warn('expected_a_b', thing, '===', '==');
    });
    preaction('binary', '!=', function (thing) {
        warn('expected_a_b', thing, '!==', '!=');
    });
    preaction('binary', '=>', preaction_function);
    preaction('binary', '||', function (thing) {
        thing.expression.forEach(function (thang) {
            if (thang.id === '&&' && !thang.wrapped) {
                warn('and', thang);
            }
        });
    });
    preaction('binary', '(', function (thing) {
        var left = thing.expression[0];
        if (
            left.identifier &&
            functionage.context[left.id] === undefined &&
            typeof functionage.name === 'object'
        ) {
            var parent = functionage.name.function;
            if (parent) {
                var left_variable = parent.context[left.id];
                if (
                    left_variable !== undefined &&
                    left_variable.dead &&
                    left_variable.function === parent &&
                    left_variable.calls !== undefined &&
                    left_variable.calls[functionage.name.id] !== undefined
                ) {
                    left_variable.dead = false;
                }
            }
        }
    });
    preaction('binary', 'in', function (thing) {
        warn('infix_in', thing);
    });
    preaction('binary', 'instanceof', function (thing) {
        warn('unexpected_a', thing);
    });
    preaction('statement', '{', function (thing) {
        block_stack.push(blockage);
        blockage = thing;
        thing.live = [];
    });
    preaction('statement', 'for', function (thing) {
        if (thing.name !== undefined) {
            var the_variable = lookup(thing.name);
            if (the_variable !== undefined) {
                the_variable.init = true;
                if (!the_variable.writable) {
                    warn('bad_assignment_a', thing.name);
                }
            }
        }
        walk_statement(thing.initial);
    });
    preaction('statement', 'function', preaction_function);
    preaction('unary', '~', bitwise_check);
    preaction('unary', 'function', preaction_function);
    preaction('variable', function (thing) {
        var the_variable = lookup(thing);
        if (the_variable !== undefined) {
            thing.variable = the_variable;
            the_variable.used += 1;
        }
    });

    function init_variable(name) {
        var the_variable = lookup(name);
        if (the_variable !== undefined) {
            if (the_variable.writable) {
                the_variable.init = true;
                return;
            }
        }
        warn('bad_assignment_a', name);
    }

    postaction('assignment', function (thing) {

// Assignment using = sets the init property of a variable. No other assignment
// operator can do this. A = token keeps that variable (or array of variables
// in case of destructuring) in its name property.

        if (thing.id === '=') {
            if (thing.names !== undefined) {
                if (Array.isArray(thing.names)) {
                    thing.names.forEach(init_variable);
                } else {
                    init_variable(thing.names);
                }
            }
        } else {
            var lvalue = thing.expression[0];
            if (lvalue.arity === 'variable') {
                if (!lvalue.variable || lvalue.variable.writable !== true) {
                    warn('bad_assignment_a', lvalue);
                }
            }
        }
    });

    function postaction_function(thing) {
        delete functionage.loop;
        delete functionage.switch;
        functionage = stack.pop();
        if (thing.wrapped) {
            warn('unexpected_parens', thing);
        }
        return pop_block();
    }

    postaction('binary', function (thing) {
        var right;
        if (relationop[thing.id]) {
            if (
                is_weird(thing.expression[0]) ||
                is_weird(thing.expression[1]) ||
                are_similar(thing.expression[0], thing.expression[1]) ||
                (
                    thing.expression[0].constant === true &&
                    thing.expression[1].constant === true
                )
            ) {
                warn('weird_relation_a', thing);
            }
        }
        switch (thing.id) {
        case '+':
        case '-':
            right = thing.expression[1];
            if (
                right.id === thing.id &&
                right.arity === 'unary' &&
                !right.wrapped
            ) {
                warn('wrap_unary', right);
            }
            break;
        case '=>':
        case '(':
            break;
        case '.':
            if (thing.expression.id === 'RegExp') {
                warn('weird_expression_a', thing);
            }
            break;
        default:
            if (
                thing.expression[0].constant === true &&
                thing.expression[1].constant === true
            ) {
                thing.constant = true;
            }
        }
    });
    postaction('binary', '&&', function (thing) {
        if (
            is_weird(thing.expression[0]) ||
            are_similar(thing.expression[0], thing.expression[1]) ||
            thing.expression[0].constant === true ||
            thing.expression[1].constant === true
        ) {
            warn('weird_condition_a', thing);
        }
    });
    postaction('binary', '||', function (thing) {
        if (
            is_weird(thing.expression[0]) ||
            are_similar(thing.expression[0], thing.expression[1]) ||
            thing.expression[0].constant === true
        ) {
            warn('weird_condition_a', thing);
        }
    });
    postaction('binary', '=>', postaction_function);
    postaction('binary', '(', function (thing) {
        if (!thing.wrapped && thing.expression[0].id === 'function') {
            warn('wrap_immediate', thing);
        }
    });
    postaction('binary', '[', function (thing) {
        if (thing.expression[0].id === 'RegExp') {
            warn('weird_expression_a', thing);
        }
        if (is_weird(thing.expression[1])) {
            warn('weird_expression_a', thing.expression[1]);
        }
    });
    postaction('statement', '{', pop_block);
    postaction('statement', 'const', action_var);
    postaction('statement', 'export', top_level_only);
    postaction('statement', 'for', function (thing) {
        walk_statement(thing.inc);
    });
    postaction('statement', 'function', postaction_function);
    postaction('statement', 'import', function (the_thing) {
        var name = the_thing.name;
        name.init = true;
        name.dead = false;
        blockage.live.push(name);
        return top_level_only(the_thing);
    });
    postaction('statement', 'let', action_var);
    postaction('statement', 'try', function (thing) {
        if (thing.catch !== undefined) {
            var the_name = thing.catch.name;
            if (the_name !== undefined) {
                var the_variable = functionage.context[the_name.id];
                the_variable.dead = false;
                the_variable.init = true;
            }
            walk_statement(thing.catch.block);
        }
    });
    postaction('statement', 'var', action_var);
    postaction('ternary', function (thing) {
        if (
            is_weird(thing.expression[0]) ||
            thing.expression[0].constant === true ||
            are_similar(thing.expression[1], thing.expression[2])
        ) {
            warn('unexpected_a', thing);
        } else if (are_similar(thing.expression[0], thing.expression[1])) {
            warn('expected_a_b', thing, '||', '?');
        } else if (are_similar(thing.expression[0], thing.expression[2])) {
            warn('expected_a_b', thing, '&&', '?');
        } else if (
            thing.expression[1].id === 'true' &&
            thing.expression[2].id === 'false'
        ) {
            warn('expected_a_b', thing, '!!', '?');
        } else if (
            thing.expression[1].id === 'false' &&
            thing.expression[2].id === 'true'
        ) {
            warn('expected_a_b', thing, '!', '?');
        } else if (thing.expression[0].wrapped !== true && (
            thing.expression[0].id === '||' ||
            thing.expression[0].id === '&&'
        )) {
            warn('wrap_condition', thing.expression[0]);
        }
    });
    postaction('unary', function (thing) {
        switch (thing.id) {
        case '[':
        case '{':
        case 'function':
        case 'new':
            break;
        case '`':
            if (thing.expression.every(function (thing) {
                return thing.constant;
            })) {
                thing.constant = true;
            }
            break;
        default:
            if (thing.expression.constant === true) {
                thing.constant = true;
            }
        }
    });
    postaction('unary', 'function', postaction_function);

    function delve(the_function) {
        Object.keys(the_function.context).forEach(function (id) {
            if (id !== 'ignore') {
                var name = the_function.context[id];
                if (name.function === the_function) {
                    if (name.used === 0) {
                        warn('unused_a', name);
                    } else if (!name.init) {
                        warn('uninitialized_a', name);
                    }
                }
            }
        });
    }

    function uninitialized_and_unused() {

// Delve into the functions looking for variables that were not initialized
// or used. If the file imports or exports, then its global object is also
// delved.

        if (module_mode === true || option.node) {
            delve(global);
        }
        functions.forEach(delve);
    }

// Go through the token list, looking at usage of whitespace.

    function whitage() {
        var closer = '(end)',
            free = false,
            left = global,
            margin = 0,
            nr_comments_skipped = 0,
            open = true,
            qmark = '',
            result,
            right;

        function expected_at(at) {
            warn(
                'expected_a_at_b_c',
                right,
                artifact(right),
                fudge + at,
                artifact_column(right)
            );
        }

        function at_margin(fit) {
            var at = margin + fit;
            if (right.from !== at) {
                return expected_at(at);
            }
        }

        function no_space_only() {
            if (left.line !== right.line || left.thru !== right.from) {
                warn(
                    'unexpected_space_a_b',
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        }

        function no_space() {
            if (left.line === right.line) {
                if (left.thru !== right.from && nr_comments_skipped === 0) {
                    warn(
                        'unexpected_space_a_b',
                        right,
                        artifact(left),
                        artifact(right)
                    );
                }
            } else {
                if (open) {
                    var at = (free)
                        ? margin
                        : margin + 8;
                    if (right.from < at) {
                        expected_at(at);
                    }
                } else {
                    if (right.from !== margin + 8) {
                        expected_at(margin + 8);
                    }
                }
            }
        }

        function one_space_only() {
            if (left.line !== right.line || left.thru + 1 !== right.from) {
                warn(
                    'expected_space_a_b',
                    right,
                    artifact(left),
                    artifact(right)
                );
            }
        }

        function one_space() {
            if (left.line === right.line) {
                if (left.thru + 1 !== right.from && nr_comments_skipped === 0) {
                    warn(
                        'expected_space_a_b',
                        right,
                        artifact(left),
                        artifact(right)
                    );
                }
            } else {
                if (free) {
                    if (right.from < margin) {
                        expected_at(margin);
                    }
                } else {
                    if (right.from !== margin + 8) {
                        expected_at(margin + 8);
                    }
                }
            }
        }

        function unqmark() {

// Undo the effects of dangling nested ternary operators.

            var level = qmark.length;
            if (level > 0) {
                margin -= level * 4;
            }
            qmark = '';
        }

        stack = [];
        tokens.forEach(function (the_token) {
            right = the_token;
            if (right.id === '(comment)' || right.id === '(end)') {
                nr_comments_skipped += 1;
            } else {

// If left is an opener and right is not the closer, then push the previous
// state. If the token following the opener is on the next line, then this is
// an open form. If the tokens are on different lines, then it is a closed for.
// Open form is more readable, with each item (statement, argument, parameter,
// etc) starting on its own line. Closed form is more compact. Statement blocks
// are always in open form.

                var new_closer = opener[left.id];
                if (typeof new_closer === 'string') {
                    if (new_closer !== right.id) {
                        stack.push({
                            closer: closer,
                            free: free,
                            margin: margin,
                            open: open,
                            qmark: qmark
                        });
                        qmark = '';
                        closer = new_closer;
                        if (left.line !== right.line) {
                            free = closer === ')' && left.free;
                            open = true;
                            margin += 4;
                            if (right.role === 'label') {
                                if (right.from !== 0) {
                                    expected_at(0);
                                }
                            } else if (right.switch) {
                                unqmark();
                                at_margin(-4);
                            } else {
                                at_margin(0);
                            }
                        } else {
                            if (right.statement || right.role === 'label') {
                                warn(
                                    'expected_line_break_a_b',
                                    right,
                                    artifact(left),
                                    artifact(right)
                                );
                            }
                            free = false;
                            open = false;
                            no_space_only();
                        }
                    } else {

// If left and right are opener and closer, then the placement of right depends
// on the openness. Illegal pairs (like {]) have already been detected.

                        if (left.line === right.line) {
                            no_space();
                        } else {
                            at_margin(0);
                        }
                    }
                } else {

// If right is a closer, then pop the previous state,

                    if (right.id === closer) {
                        var previous = stack.pop();
                        margin = previous.margin;
                        if (open && right.id !== ';') {
                            at_margin(0);
                        } else {
                            no_space_only();
                        }
                        closer = previous.closer;
                        free = previous.free;
                        open = previous.open;
                        qmark = previous.qmark;
                    } else {

// Left is not an opener, and right is not a closer. The nature of left and
// right will determine the space between them.

// If left is , or ; or right is a statement then if open, right must go at the
// margin, or if closed, a space before.


                        if (right.switch) {
                            unqmark();
                            at_margin(-4);
                        } else if (right.role === 'label') {
                            if (right.from !== 0) {
                                expected_at(0);
                            }
                        } else if (left.id === ',') {
                            unqmark();
                            if (!open || (
                                (free || closer === ']') &&
                                left.line === right.line
                            )) {
                                one_space();
                            } else {
                                at_margin(0);
                            }

// If right is a ternary operator, line it up on the margin. Use qmark to
// deal with nested ternary operators.

                        } else if (right.arity === 'ternary') {
                            if (right.id === '?') {
                                margin += 4;
                                qmark += '?';
                            } else {
                                result = qmark.match(rx_colons);
                                qmark = result[1] + ':';
                                margin -= 4 * result[2].length;
                            }
                            at_margin(0);
                        } else if (right.arity === 'binary' && right.id === '(' && free) {
                            no_space();
                        } else if (
                            left.id === '.' ||
                            left.id === '...' ||
                            right.id === ',' ||
                            right.id === ';' ||
                            right.id === ':' ||
                            (right.arity === 'binary' && (
                                right.id === '(' ||
                                right.id === '['
                            )) ||
                            (right.arity === 'function' && left.id !== 'function')
                        ) {
                            no_space_only();
                        } else if (right.id === '.') {
                            if (left.line === right.line) {
                                no_space();
                            } else {
                                if (!rx_dot.test(qmark)) {
                                    qmark += '.';
                                    margin += 4;
                                }
                                at_margin(0);
                            }
                        } else if (left.id === ';') {
                            unqmark();
                            if (open) {
                                at_margin(0);
                            } else {
                                one_space();
                            }
                        } else if (
                            left.arity === 'ternary' ||
                            left.id === 'case' ||
                            left.id === 'catch' ||
                            left.id === 'else' ||
                            left.id === 'finally' ||
                            left.id === 'while' ||
                            right.id === 'catch' ||
                            right.id === 'else' ||
                            right.id === 'finally' ||
                            (right.id === 'while' && !right.statement) ||
                            (left.id === ')' && right.id === '{')
                        ) {
                            one_space_only();
                        } else if (right.statement === true) {
                            if (open) {
                                at_margin(0);
                            } else {
                                one_space();
                            }
                        } else if (
                            left.id === 'var' ||
                            left.id === 'const' ||
                            left.id === 'let'
                        ) {
                            stack.push({
                                closer: closer,
                                free: free,
                                margin: margin,
                                open: open,
                                qmark: qmark
                            });
                            closer = ';';
                            free = false;
                            open = left.open;
                            qmark = '';
                            if (open) {
                                margin = margin + 4;
                                at_margin(0);
                            } else {
                                one_space_only();
                            }
                        } else if (

// There is a space between left and right.

                            spaceop[left.id] === true ||
                            spaceop[right.id] === true ||
                            (
                                left.arity === 'binary' &&
                                (left.id === '+' || left.id === '-')
                            ) ||
                            (
                                right.arity === 'binary' &&
                                (right.id === '+' || right.id === '-')
                            ) ||
                            left.id === 'function' ||
                            left.id === ':' ||
                            (
                                (
                                    left.identifier ||
                                    left.id === '(string)' ||
                                    left.id === '(number)'
                                ) &&
                                (
                                    right.identifier ||
                                    right.id === '(string)' ||
                                    right.id === '(number)'
                                )
                            ) ||
                            (left.arity === 'statement' && right.id !== ';')
                        ) {
                            one_space();
                        } else if (left.arity === 'unary') {
                            no_space_only();
                        }
                    }
                }
                nr_comments_skipped = 0;
                delete left.calls;
                delete left.dead;
                delete left.free;
                delete left.init;
                delete left.open;
                delete left.used;
                left = right;
            }
        });
    }

// The jslint function itself.

    return function (source, option_object, global_array) {
        try {
            warnings = [];
            option = option_object || empty();
            anon = "anonymous";
            block_stack = [];
            declared_globals = empty();
            directive_mode = true;
            directives = [];
            early_stop = true;
            export_mode = false;
            fudge = (option.fudge)
                ? 1
                : 0;
            functions = [];
            global = {
                id: '(global)',
                body: true,
                context: empty(),
                from: 0,
                level: 0,
                line: 0,
                live: [],
                loop: 0,
                switch: 0,
                thru: 0
            };
            blockage = global;
            functionage = global;
            imports = [];
            json_mode = false;
            mega_mode = false;
            module_mode = false;
            next_token = global;
            property = empty();
            stack = [];
            tenure = undefined;
            token = global;
            token_nr = 0;
            var_mode = undefined;
            populate(declared_globals, standard, false);
            if (global_array !== undefined) {
                populate(declared_globals, global_array, false);
            }
            Object.keys(option).forEach(function (name) {
                if (option[name] === true) {
                    var allowed = allowed_option[name];
                    if (Array.isArray(allowed)) {
                        populate(declared_globals, allowed, false);
                    }
                }
            });
            tokenize(source);
            advance();
            if (tokens[0].id === '{' || tokens[0].id === '[') {
                json_mode = true;
                tree = json_value();
                advance('(end)');
            } else {

// Because browsers encourage combining of script files, the first token might
// be a semicolon to defend against a missing semicolon in the preceding file.

                if (option.browser) {
                    if (next_token.id === ';') {
                        advance(';');
                    }
                } else {

// If we are not in a browser, then the file form of strict pragma may be used.

                    if (
                        next_token.id === '(string)' &&
                        next_token.value === 'use strict'
                    ) {
                        advance('(string)');
                        advance(';');
                        global.strict = true;
                    }
                }
                tree = statements();
                advance('(end)');
                functionage = global;
                walk_statement(tree);
                uninitialized_and_unused();
                if (!option.white) {
                    whitage();
                }
            }
            if (!option.browser) {
                directives.forEach(function (comment) {
                    if (comment.directive === 'global') {
                        warn('missing_browser', comment);
                    }
                });
            }
            early_stop = false;
        } catch (e) {
            if (e.name !== 'JSLintError') {
                warnings.push(e);
            }
        }
        return {
            directives: directives,
            edition: "2015-12-26",
            functions: functions,
            global: global,
            id: "(JSLint)",
            imports: imports,
            json: json_mode,
            lines: lines,
            module: module_mode === true,
            ok: warnings.length === 0 && !early_stop,
            option: option,
            property: property,
            stop: early_stop,
            tokens: tokens,
            tree: tree,
            warnings: warnings.sort(function (a, b) {
                return a.line - b.line || a.column - b.column;
            })
        };
    };
}());

/*node module.exports = jslint;*/
