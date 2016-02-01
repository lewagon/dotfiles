BIN=bin/jslint.js
SOURCES=$(shell find bin lib -name '*.js' ! -name 'jslint*.js' -print)

install:
	npm i .

# omit 'test' because running all tests is side-effect of asking for coverage
prepublish: lint doc no-dos-endings check-coverage

lint:	$(SOURCES)
	node ./bin/jslint.js --edition=es6 --this --terse $(SOURCES); echo

test:
	./node_modules/.bin/mocha -u tdd

doc:	man/jslint.1 doc/jslint.html

man/jslint.1: doc/jslint.md
	mkdir -p man
	./node_modules/.bin/ronn -r $< > $@

doc/jslint.html: doc/jslint.md
	./node_modules/.bin/ronn -5 $< > $@

no-dos-endings:
	file $(SOURCES) | grep -v CRLF >/dev/null

cover: $(SOURCES)
	./node_modules/.bin/istanbul cover -x "lib/jslint-*.js" --print=both ./node_modules/mocha/bin/_mocha -- -u tdd

check-coverage: cover
	./node_modules/.bin/istanbul check-coverage --statements 90 --branches 90 --functions 90 --lines 90

.PHONY: install lint test doc no-dos-endings check-coverage
