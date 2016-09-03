var fs = require('fs')

var handlebars = require('handlebars')

var R = require('ramda')

var semver_compare = require('semver-compare')

var version = require('./package.json').devDependencies.ramda

var template = fs.readFileSync('releases.html.handlebars', {encoding: 'utf8'})

var version_folder_re = /\d+\.\d+(\.\d+)?/

fs.readdir('./', (err, files) => {
  var version_folders = R.filter(R.bind(version_folder_re.test, version_folder_re), files).sort(semver_compare)

  var html = handlebars.compile(template)({
    releases: version_folders,
    version: version
  })

  fs.writeFileSync('releases.html', html, {encoding: 'utf8'})
})
