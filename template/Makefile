name = $(shell cat package.json | grep '"name"' | awk -F'"' '{print $$4}')
version = $(shell cat package.json | grep '"version"' | awk -F'"' '{print $$4}')
seajs_version = $(shell cat package.json | grep '"seajs"' | awk -F'"' '{print $$4}')
markline_version = $(shell cat package.json | grep '"markline"' | awk -F'"' '{print $$4}')

install:
	@spm install

build: clear
	@spm build --with-deps
	@mkdir -p ./assets/seajs/$(seajs_version)
	@cp ./spm_modules/seajs/$(seajs_version)/dist/* ./assets/seajs/$(seajs_version)
	@sed 's/markline\/[0-9\.]\{1,\}/markline\/$(markline_version)/g' index.html > index-tmp.html
	@rm -rf index.html
	@mv index-tmp.html index.html

clear:
	@rm -rf assets
