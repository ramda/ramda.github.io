var fs = require('fs')

var pug = require('pug')

var R = require('ramda')

var semver_compare = require('semver-compare')

var version = require('./package.json').devDependencies.ramda


var make_html = pug.compileFile('releases.pug')

var version_folder_re = /^\d+\.\d+(\.\d+)?$/

fs.readdir('./', (err, files) => {
  var version_folders = R.filter(R.bind(version_folder_re.test, version_folder_re), files).sort(semver_compare)

  var html = make_html({
    releases: version_folders,
    version: version
  })

  fs.writeFileSync('releases.html', html, {encoding: 'utf8'})
})
