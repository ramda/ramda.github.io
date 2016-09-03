var fs = require('fs')

var path = require('path')

var version = require('./package.json').devDependencies.ramda

var walk = require('walk')

var copy_file = (source, destination) => new Promise((resolve, reject) => {
  fs.createReadStream(source)
  .pipe(fs.createWriteStream(destination))
  .on('close', resolve)
  .on('error', reject)
})

fs.mkdir(version, (err) => {
  walk.walk('./docs')
  .on('end', () => {
    console.log('Copying docs folder done.')

    copy_file('index.html', path.join(version, 'index.html'))
    .then(copy_file('style.css', path.join(version, 'style.css')))
    .then(copy_file('package.json', path.join(version, 'package.json')))
    .then((result) => console.log('Copied files.'))
    .catch((err) => console.error(err))
  })
  .on('errors', (root, node_stats_array, next) => {
    console.error('Error copying files.')
  })
  .on('file', (root, file_stats, next) => {
    fs.mkdir(path.join(version, root), (err) => {
      copy_file(path.join(root, file_stats.name), path.join(version, root, file_stats.name))
      .catch((err) => console.error(err))
      .then((result) => {
        next()
      })
    })
  })
})
