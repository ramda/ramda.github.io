var fs = require('fs')

var path = require('path')

module.exports = (child_path) => new Promise ((resolve, reject) => {
  var ramda_folder = path.resolve('./node_modules/ramda');

  var file_path = path.join(ramda_folder, child_path)

  fs.readFile(file_path, 'utf8', (err, data) => {
    if (err)
      reject(err)
    else
      resolve(data)
  })
})
