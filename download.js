var fs = require('fs')

var request = require('request')

var version = require('./package.json').version;

var download_ramda_file = (version, file_name, out_path) => new Promise((resolve, reject) => {
  var url = 'https://raw.githubusercontent.com/ramda/ramda/v' + version + '/' + file_name

  console.log('Downloading ' + url)

  request(url)
  .on('error', reject)
  .pipe(fs.createWriteStream(out_path))
  .on('finish', resolve)
})

download_ramda_file(version, 'dist/ramda.js', 'docs/dist/ramda.js')
.then(result => console.log('Downloaded to `docs/dist/ramda.js`.'))
.catch(err => console.error('Error during download.'))
