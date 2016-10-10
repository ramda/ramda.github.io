var fs = require('fs');
var path = require('path');

var R = require('ramda');

var {defaultTo, map, pipe, prop} = R

var handlebars = require('handlebars');
var hljs = require('highlight.js');
var helper = require('jsdoc/util/templateHelper');
var marked = require('marked');

var version = require('./package.json').devDependencies.ramda


var prettifyCode = R.pipe(
  R.join('\n'),
  R.replace(/^[ ]{5}/gm, ''),
  R.flip(R.invoker(2, 'highlight')('javascript'))(hljs),
  R.prop('value')
)

var prettifySig = R.pipe(
  R.replace(/[.][.][.]/g, '\u2026'),
  R.replace(/->/g, '\u2192')
)

//  simplifySee :: [String] -> [String]
//
//  Handles any combination of comma-separated and multi-line @see annotations.
var simplifySee = R.pipe(
  R.map(
    R.pipe(
      R.split(/\s*,\s*/),
      R.map(R.replace(/^R[.]/, ''))
    )
  ),
  R.flatten
)

var titleFilter = pipe(R.propEq('title'), R.filter)

var valueProp = R.chain(prop('value'))

var simplifyData = R.applySpec({
    aka: pipe(
      prop('tags'),
      titleFilter('aka'),
      valueProp,
      R.chain(R.split(/,\s*/))
    ),
    category: pipe(
      prop('tags'),
      titleFilter('category'),
      valueProp,
      R.head,
      defaultTo('')
    ),
    deprecated: pipe(prop('deprecated'), defaultTo('')),
    description: pipe(
      prop('description'),
      R.defaultTo(''),
      marked
    ),
    example: pipe(
      prop('examples'),
      R.defaultTo(''),
      prettifyCode
    ),
    name: pipe(prop('name'), defaultTo('')),
    params: pipe(
      prop('params'),
      defaultTo([]),
      map(R.applySpec({
        description: pipe(
          prop('description'),
          defaultTo(''),
          marked
        ),
        name: pipe(prop('name'), defaultTo('')),
        type: pipe(R.path(['type', 'names', 0]), defaultTo(''))
      }))
    ),
    returns: {
      description: pipe(R.path(['returns', 0, 'description']), defaultTo('')),
      type: pipe(R.path(['returns', 0, 'type', 'names', 0]), defaultTo(''))
    },
    see: pipe(
      prop('see'),
      defaultTo(''),
      simplifySee
    ),
    sigs: pipe(
      prop('tags'),
      titleFilter('sig'),
      valueProp,
      map(prettifySig)
    ),
    since: pipe(prop('since'), defaultTo('')),
    typedefns: pipe(
      prop('tags'),
      titleFilter('typedefn'),
      valueProp,
      map(prettifySig)
    )
})

exports.publish = function(data, opts) {
  var templateFile = path.resolve(opts.destination, 'index.html.handlebars')

  var templateContent = fs.readFileSync(templateFile, {encoding: 'utf8'})

  var docs = helper.prune(data)()
    .order('name, version, since')
    .filter({kind: ['function', 'constant']})
    .get()
    .filter(function(x) { return x.access !== 'private' })
    .map(simplifyData)

  var context = {
    docs: docs,
    version: version
  }

  var outputContent = handlebars.compile(templateContent)(context)

  var outputFile = path.resolve(opts.destination, 'index.html')

  fs.writeFileSync(outputFile, outputContent, {encoding: 'utf8'});
}
