var get_ramda_file = require('./get_ramda_file')

var marked = require('marked')

var pug = require('pug')

var version = require('./package.json').devDependencies.ramda
var versions = require('./versions.json')
var cur_version = versions[0]


get_ramda_file('README.md')
  .catch((err) => console.error(err))
  .then((readme_md) => {
    var readme_html = marked.parse(readme_md)

    var make_html = pug.compileFile('index.pug')

    var html = make_html({
      html_class: 'home-page',
      page: 'home',
      readme: readme_html,
      version: version,
      cur_version: cur_version,
    })

    console.log(html)
  })
