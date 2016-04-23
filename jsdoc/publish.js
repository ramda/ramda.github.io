var fs = require('fs');
var path = require('path');

var handlebars = require('handlebars');
var hljs = require('highlight.js');
var helper = require('jsdoc/util/templateHelper');
var marked = require('marked');


if (!Object.prototype.hasOwnProperty.call(process.env, 'VERSION')) {
  throw new Error('No environment variable named "VERSION"');
}
var VERSION = process.env.VERSION;


var headOr = function(x, xs) {
  return xs.length === 0 ? x : xs[0];
};

var chain = function(f, xs) {
  var result = [];
  for (var idx = 0; idx < xs.length; idx += 1) {
    result = result.concat(f(xs[idx]));
  }
  return result;
};

var valuesForTitle = function(title, xs) {
  var result = [];
  for (var idx = 0; idx < xs.length; idx += 1) {
    if (xs[idx].title === title) {
      result.push(xs[idx].value);
    }
  }
  return result;
};

var prettifySig = function(s) {
  return s.replace(/[.][.][.]/g, '\u2026').replace(/->/g, '\u2192');
};

var prettifyCode = function(s) {
  return hljs.highlight('javascript', s.join('\n').replace(/^[ ]{5}/gm, '')).value;
};

//  simplifySee :: [String] -> [String]
//
//  Handles any combination of comma-separated and multi-line @see annotations.
var simplifySee = function(xs) {
  var result = [];
  xs.forEach(function(x) {
    x.split(/\s*,\s*/).forEach(function(s) {
      result.push(s.replace(/^R[.]/, ''));
    });
  });
  return result;
};

var simplifyData = function(d) {
  return {
    aka: chain(function(s) { return s.split(/,\s*/); }, valuesForTitle('aka', d.tags)),
    category: headOr('', valuesForTitle('category', d.tags)),
    deprecated: d.deprecated == null ? '' : d.deprecated,
    description: d.description == null ? '' : marked(d.description),
    example: d.examples == null ? [] : prettifyCode(d.examples),
    name: d.name == null ? '' : d.name,
    params: d.params == null ? [] : d.params.map(function(p) {
      return {
        type: p.type.names[0] || '',
        description: marked(p.description || ''),
        name: p.name || ''
      };
    }),
    returns: {
      type:
        d.returns != null &&
        d.returns[0] != null &&
        d.returns[0].type != null &&
        d.returns[0].type.names != null &&
        d.returns[0].type.names[0] != null ?
          d.returns[0].type.names[0] :
          '',
      description:
        d.returns != null &&
        d.returns[0] != null &&
        d.returns[0].description != null ?
          marked(d.returns[0].description) :
          '',
    },
    see: d.see == null ? [] : simplifySee(d.see),
    sigs: valuesForTitle('sig', d.tags).map(prettifySig),
    since: d.since == null ? '' : d.since,
    typedefns: valuesForTitle('typedefn', d.tags).map(prettifySig),
  };
};

var readFile = function(filename) {
  return fs.readFileSync(filename, {encoding: 'utf8'});
};

var render = function(templateFile, outputFile, context) {
  fs.writeFileSync(outputFile,
                   handlebars.compile(readFile(templateFile))(context),
                   {encoding: 'utf8'});
};

exports.publish = function(data, opts) {
  var context = {
    docs: helper.prune(data)()
          .order('name, version, since')
          .filter({kind: ['function', 'constant']})
          .get()
          .filter(function(x) { return x.access !== 'private'; })
          .map(simplifyData),
    readme: new handlebars.SafeString(marked(readFile(VERSION + '/tmp/README.md'))),
    version: require('../' + VERSION + '/tmp/package.json').version,
  };

  render('jsdoc/templates/index.html.handlebars',
         path.resolve(opts.destination, 'index.html'),
         context);

  render('docs/index.html.handlebars',
         path.resolve(opts.destination, 'docs/index.html'),
         context);

  render('repl/index.html.handlebars',
         path.resolve('./repl/index.html'),
         context);

  render('cookbook/index.html.handlebars',
         path.resolve('./cookbook/index.html'),
         context);

};
