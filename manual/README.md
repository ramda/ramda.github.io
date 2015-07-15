Ramda
=====

Ramda is a "practical functional library for Javascript programmers."

It is designed to bring many of the usual techniques of functional programming
to the world of Javascript.  Its goals are modest: to make it easy to work with
small, standard functions against consistent data types such as lists, to make it
easy to work with immutable data, to make it easy to compose applications
function-by-function, composing simpler functions into more sophisticated workflows.

Ramda also has a few more advanced techniques up its sleeve.  Its delegation
mechanism allows us to turn many OO-style APIs into more functional versions,
its lenses allow us to simply focus attention on some specific part of a data
structure, and its transducers allow us to combine many operations on every element
of a list of data into a single operation per element.

But at its heart, Ramda is a simple library.  It is not a framework that dictates
how we build our applications.  Instead it is a low-level toolkit that offers a
collection of functional tools we believe to be helpful.


Installation
------------

To use with node:

```bash
$ npm install ramda
```

Then in the console:

```javascript
var R = require('ramda');
```

Or use any individual functions via

```javascript
var map = require('ramda')/src/map;
```

Note that internal dependencies will be resolved for you here.


To use directly in the browser:

```html
<script src="path/to/yourCopyOf/ramda.js"></script>
```

or the minified version:

```html
<script src="path/to/yourCopyOf/ramda.min.js"></script>
```

or from a CDN, either cdnjs:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/ramda/0.16.0/ramda.min.js"></script>
```

or one of the below links from [jsDelivr][js]:

```html
<script src="//cdn.jsdelivr.net/ramda/0.16.0/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/0.16/ramda.min.js"></script>
<script src="//cdn.jsdelivr.net/ramda/latest/ramda.min.js"></script>
```

(note that using `latest` is taking a significant risk that ramda API changes could break
your code.)

These script tags add the variable `ramda` on the browser's global scope.

Or you can inject ramda into virtually any unsuspecting website using [the bookmarklet](bk).

### Build ###

* on Unix-based platforms, `npm run build` updates __dist/ramda.js__ and __dist/ramda.min.js__
* on Windows, write the output of `scripts/build --complete` to a temporary file, then rename the temporary file __dist/ramda.js__.

#### Partial Builds ####

It is possible to build Ramda with a subset of the functionality to reduce its file size.
Ramda's build system supports this with command line flags. For example if you're using
`R.compose`, `R.reduce`, and `R.filter` you can create a partial build with:

```bash
./scripts/build -- src/compose.js src/reduce.js src/filter.js > dist/ramda.custom.js
```

This requires having Node/io.js installed.

### A Note on Signatures ###

TODO
  [bk]: https://github.com/ramda/ramda/blob/master/BOOKMARKLET.md
  [js]: http://jsdelivr.com
