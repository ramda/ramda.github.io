GITBOOK = node_modules/.bin/gitbook
JSDOC = node_modules/.bin/jsdoc
LESS = node_modules/.bin/lessc

JSDOC_FILES := $(shell find jsdoc -type f | sort)
LESS_FILES := $(shell find less -name '*.less' | sort)


.PHONY: all
all: \
	check-version \
	$(VERSION)/tmp/README.md \
	$(VERSION)/tmp/package.json \
	$(VERSION)/docs/dist/ramda.js \
	$(VERSION)/docs/index.html \
	$(VERSION)/docs/main.js \
	$(VERSION)/index.html \
	$(VERSION)/fonts/glyphicons-halflings-regular.eot \
	$(VERSION)/fonts/glyphicons-halflings-regular.svg \
	$(VERSION)/fonts/glyphicons-halflings-regular.ttf \
	$(VERSION)/fonts/glyphicons-halflings-regular.woff \
	$(VERSION)/fonts/glyphicons-halflings-regular.woff2 \
	$(VERSION)/style.css \
	gitbook \
	docs/dist/ramda.js \
	docs/index.html \
	docs/main.js \
	index.html \
	style.css \

$(VERSION)/tmp/%:
	mkdir -p '$(@D)'
	curl --silent 'https://raw.githubusercontent.com/ramdacn/ramda/v$(VERSION)/$(@F)' >'$@'

$(VERSION)/docs/dist/ramda.js:
	mkdir -p '$(@D)'
	curl --silent 'https://raw.githubusercontent.com/ramdacn/ramda/v$(VERSION)/dist/ramda.js' >'$@'

$(VERSION)/docs/index.html $(VERSION)/index.html: $(JSDOC_FILES)
	VERSION='$(VERSION)' $(JSDOC) \
	  --destination '$(VERSION)' \
	  --template '$(<D)' \
	  '$(VERSION)/docs/dist/ramda.js'

$(VERSION)/fonts/%: node_modules/bootstrap/fonts/%
	mkdir -p '$(@D)'
	cp '$<' '$@'

$(VERSION)/style.css: $(LESS_FILES)
	mkdir -p '$(@D)'
	$(LESS) less/ramda.less --autoprefix --clean-css >'$@'

docs/%: $(VERSION)/docs/%
	mkdir -p '$(@D)'
	cp '$<' '$@'

.PHONY: index.html
index.html: check-version
	echo '<!DOCTYPE html><html><head><link rel="canonical" href="http://ramdajs.com/$(VERSION)/index.html" /><script>window.location = "$(VERSION)/index.html" + window.location.hash;</script></head><body></body></html>' >'$@'

%: $(VERSION)/%
	cp '$<' '$@'


.PHONY: check-version
check-version:
ifeq ($(origin VERSION),undefined)
	$(error VERSION not set)
endif


.PHONY: gitbook
gitbook: check-version
	$(GITBOOK) build manual './manual'
	find './manual' -name '*.html' -print0 \
	  | xargs -0 perl -p -i -e 's/ data-revision="[^"]*"//g'


.PHONY: setup
setup:
	npm install
