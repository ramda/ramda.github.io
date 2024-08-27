const fs = require('fs');
const Path = require('path');

const {
  applySpec,
  chain,
  defaultTo,
  filter,
  head,
  join,
  map,
  path,
  pipe,
  prop,
  propEq,
  replace,
  split,
  __
} = require('ramda');

const handlebars = require('handlebars');
const hljs = require('highlight.js');
const helper = require('jsdoc/util/templateHelper');
const marked = require('marked');

const mardownToHtml = function(mdstr) {
  return marked.parse(mdstr);
}

const version = require('./package.json').devDependencies.ramda


const prettifyCode = pipe(
  join('\n'),
  replace(/^[ ]{5}/gm, ''),
  s => hljs.highlight('javascript', s).value
)

const prettifySig = pipe(
  replace(/[.][.][.]/g, '\u2026'),
  replace(/->/g, '\u2192')
)

//  simplifySee :: Array String -> Array String
//
//  Handles any combination of comma-separated and multi-line @see annotations.
const simplifySee = pipe(chain(split(/\s*,\s*/)), map(replace(/^R[.]/, '')))

const titleFilter = pipe(propEq(__, 'title'), filter)

const valueProp = chain(prop('value'))

const simplifyData = applySpec({
    aka: pipe(
      prop('tags'),
      titleFilter('aka'),
      valueProp,
      chain(split(/,\s*/))
    ),
    category: pipe(
      prop('tags'),
      titleFilter('category'),
      valueProp,
      head,
      defaultTo('')
    ),
    deprecated: pipe(prop('deprecated'), defaultTo('')),
    description: pipe(
      prop('description'),
      defaultTo(''),
      mardownToHtml
    ),
    example: pipe(
      prop('examples'),
      defaultTo(''),
      prettifyCode
    ),
    name: pipe(prop('name'), defaultTo('')),
    params: pipe(
      prop('params'),
      defaultTo([]),
      map(applySpec({
        description: pipe(
          prop('description'),
          defaultTo(''),
          mardownToHtml
        ),
        name: pipe(prop('name'), defaultTo('')),
        type: pipe(path(['type', 'names', 0]), defaultTo(''))
      }))
    ),
    returns: {
      description: pipe(path(['returns', 0, 'description']), defaultTo('')),
      type: pipe(path(['returns', 0, 'type', 'names', 0]), defaultTo(''))
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
    symb: pipe(
      prop('tags'),
      titleFilter('symb'),
      valueProp,
      map(pipe(
        R.split('='),
        map(R.trim()),
        R.applySpec({
          input: R.nth(0),
          output: R.nth(1)
        })
      ))
    ),
    typedefns: pipe(
      prop('tags'),
      titleFilter('typedefn'),
      valueProp,
      map(prettifySig)
    )
})

exports.publish = (data, opts) => {
  const templateFile = Path.resolve(opts.destination, 'index.html.handlebars')

  const templateContent = fs.readFileSync(templateFile, {encoding: 'utf8'})

  const docs = helper.prune(data)()
    .order('name, version, since')
    .filter({kind: ['function', 'constant']})
    .get()
    .filter(x => x.access !== 'private')
    .map(simplifyData)

  const context = {
    docs: docs,
    version: version
  }

  const outputContent = handlebars.compile(templateContent)(context)

  const outputFile = Path.resolve(opts.destination, 'index.html')

  fs.writeFileSync(outputFile, outputContent, {encoding: 'utf8'});
}
