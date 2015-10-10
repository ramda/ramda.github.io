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


var valueForTitle = function(title, xs) {
  for (var idx = 0; idx < xs.length; idx += 1) {
    if (xs[idx].title === title) {
      return xs[idx].value;
    }
  }
  return '';
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
    aka: valueForTitle('aka', d.tags) === '' ? [] : valueForTitle('aka', d.tags).split(/,\s*/),
    category: valueForTitle('category', d.tags),
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
    sig: prettifySig(valueForTitle('sig', d.tags)),
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

  render('jsdoc/templates/docs/index.html.handlebars',
         path.resolve(opts.destination, 'docs/index.html'),
         context);
};
