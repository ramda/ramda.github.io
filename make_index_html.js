var fs = require('fs')

var get_ramda_file = require('./get_ramda_file')

var handlebars = require('handlebars')

var marked = require('marked')

var version = require('./package.json').devDependencies.ramda

get_ramda_file('README.md')
.catch((err) => console.error(err))
.then((readme_md) => {
  var readme_html = marked(readme_md)

  var template = fs.readFileSync('index.html.handlebars', {encoding: 'utf8'})

  var html = handlebars.compile(template)({
    readme: new handlebars.SafeString(readme_html),
    version: version
  })

  fs.writeFileSync('index.html', html, {encoding: 'utf8'})
})
