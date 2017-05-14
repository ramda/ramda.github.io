var fs = require('fs')

var pug = require('pug')

var version = require('./package.json').devDependencies.ramda


var make_html = pug.compileFile('repl/index.pug')

var html = make_html({
  html_class: 'repl-page',
  page: 'repl',
  version: version
})

fs.writeFileSync('repl/index.html', html, {encoding: 'utf8'})
