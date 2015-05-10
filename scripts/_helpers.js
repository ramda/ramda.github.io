var R = require('ramda');
var head = R.head;
var assoc = R.assoc;
var rx = /\D/g;
var outDir = './tmp';
var opts = {
  url: 'https://api.github.com/repos/ramda/ramda/tags',
  headers: {'user-agent': 'node.js'}
};

function byName(a, b) { 
  return versionToNum(b.name) - versionToNum(a.name);
}

function fetchOpts(tags) {
  var tag = head(JSON.parse(tags).sort(byName));
  return assoc('url', tag.tarball_url, opts)
}

// String -> String
function zeroPad(n) {
  return n.length === 3 ? n : zeroPad('0' + n); 
}

// String -> Number
var versionToNum = R.pipe(
  R.split('.'),
  R.map(R.replace(rx, '')),
  R.map(zeroPad),
  R.join(''),
  parseInt
);

module.exports = {
  opts: opts,
  outDir: outDir,
  fetchOpts: fetchOpts
};
