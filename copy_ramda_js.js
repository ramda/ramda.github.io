var fs = require('fs')

var get_ramda_file = require('./get_ramda_file')

var path = require('path')

get_ramda_file(path.join('dist', 'ramda.js'))
.catch((err) => console.error(err))
.then((ramda_js) => {
  fs.writeFileSync(path.join('docs', 'dist', 'ramda.js'), ramda_js, {encoding: 'utf8'})
})
