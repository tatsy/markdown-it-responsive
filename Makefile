converage:
	rm -rf coverage
	istanbul cover node_modules/.bin/_mocha

lint:
	eslint --reset .

publish:
	webpack ./
	uglifyjs dist/markdown-it-responsive.js > dist/markdown-it-responsive.min.js
	bower register markdown-it-responsive https://github.com/tatsy/markdown-it-responsive.git

test: lint
	mocha

test-ci: lint
	istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- -R spec && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

.PHONY:	lint coverage
.SILENT: lint
