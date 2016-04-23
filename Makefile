GITBOOK = node_modules/.bin/gitbook
JSDOC = node_modules/.bin/jsdoc
LESS = node_modules/.bin/lessc
MARKDOWN = node_modules/.bin/markdown-html

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
	$(VERSION)/cookbook/index.html \
	gitbook \
	docs/dist/ramda.js \
	docs/index.html \
	docs/main.js \
	index.html \
	style.css \

$(VERSION)/tmp/%:
	mkdir -p '$(@D)'
	curl --silent 'https://raw.githubusercontent.com/ramda/ramda/v$(VERSION)/$(@F)' >'$@'

$(VERSION)/docs/dist/ramda.js:
	mkdir -p '$(@D)'
	curl --silent 'https://raw.githubusercontent.com/ramda/ramda/v$(VERSION)/dist/ramda.js' >'$@'

$(VERSION)/docs/index.html $(VERSION)/index.html $(VERSION)/cookbook/index.html: $(JSDOC_FILES)
	VERSION='$(VERSION)' $(JSDOC) \
	  --destination '$(VERSION)' \
	  --template '$(<D)' \
	  '$(VERSION)/docs/dist/ramda.js'

$(VERSION)/docs/main.js: main.js
	mkdir -p '$(@D)'
	cp '$<' '$@'

$(VERSION)/fonts/%: node_modules/bootstrap/fonts/%
	mkdir -p '$(@D)'
	cp '$<' '$@'

$(VERSION)/style.css: $(LESS_FILES)
	mkdir -p '$(@D)'
	$(LESS) less/ramda.less >'$@'
	
# $(VERSION)/cookbook/index.html: cookbook/index.html
# 	mkdir -p '$(@D)'
# 	cp '$<' '$@'

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
	mkdir -p '$(VERSION)/manual'
	$(GITBOOK) build manual '$(VERSION)/manual'
	find '$(VERSION)/manual' -name '*.html' -print0 \
	  | xargs -0 perl -p -i -e 's/ data-revision="[^"]*"//g'


.PHONY: setup
setup:
	npm install
