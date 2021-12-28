.PHONY: all
all: docs/dist/ramda.js docs/index.html repl/index.html style.css index.html

docs/dist/ramda.js: node_modules/ramda/dist/ramda.js
	cp -f $< $@

docs/index.html: publish.js docs/index.html.handlebars
	npx jsdoc -c .jsdoc.config.json --destination ./$(@D) --template . node_modules/ramda/src

index.html: make_index_html.js index.pug layout.pug
	node $< >$@

repl/index.html: make_repl_index_html.js repl/index.pug
	node $< >$@

style.css: $(shell find less -name "*.less")
	npx lessc --autoprefix --clean-css ./less/ramda.less >$@
