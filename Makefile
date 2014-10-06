name = $(shell cat package.json | grep '"name"' | awk -F'"' '{print $$4}')
version = $(shell cat package.json | grep '"version"' | awk -F'"' '{print $$4}')
seajs_version = $(shell cat package.json | grep '"seajs"' | awk -F'"' '{print $$4}')

install:
	@spm install

build: clean install
	@rm -rf ./template/assets
	@spm build --with-deps -O ./template/assets/
	@mkdir -p ./template/assets/seajs/$(seajs_version)
	@cp ./spm_modules/seajs/$(seajs_version)/dist/* ./template/assets/seajs/$(seajs_version)
	@sed 's/markline\/[0-9\.]\{1,\}/markline\/$(version)/g' ./template/index.html > ./template/index-tmp.html
	@rm -rf ./template/index.html
	@mv ./template/index-tmp.html ./template/index.html

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
