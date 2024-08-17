var pug = require('pug')

var version = require('./package.json').devDependencies.ramda
var versions = require('./versions.json')
var cur_version = versions[0]


var make_html = pug.compileFile('repl/index.pug')

var html = make_html({
  html_class: 'repl-page',
  page: 'repl',
  version: version,
  cur_version: cur_version,
})

console.log(html)
