version = $(shell cat package.json | grep version | awk -F'"' '{print $$4}')

install:
	@spm install

build:
	@spm build

publish: publish-doc
	@spm publish
	@npm publish
	@git tag $(version)
	@git push origin $(version)

build-doc: clean
	@spm doc build

publish-doc: clean
	@spm doc publish

watch:
	@spm doc watch

clean:
	@rm -fr _site


runner = _site/tests/runner.html

test:
	@spm test


.PHONY: build-doc publish-doc server clean test coverage
