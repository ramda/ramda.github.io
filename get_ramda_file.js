var fs = require('fs')

var path = require('path')

module.exports = (child_path) => new Promise ((resolve, reject) => {
  var ramda_module_path = require.resolve('ramda')

  var ramda_folder = path.normalize(path.join(ramda_module_path, '..', '..'))

  var file_path = path.join(ramda_folder, child_path)

  fs.readFile(file_path, 'utf8', (err, data) => {
    if (err)
      reject(err)
    else
      resolve(data)
  })
})
