# ramda.github.io

To generate the various files required by the website:

```console
npm install
npm run make_release
```

## Start local server

This repo contains all the prebuilt files used on the site. To start a local
server:

	npm run server

Once this is running, visit [localhost:8080](http://localhost:8080/) to view
the docs. In the event that `:8080` is in use, you can change the port like so:

	npm run server -- -p 8081

For more details on configuring the server, see [http-server
docs](https://github.com/indexzero/http-server#available-options).


## What to do on a new release

1. Update [package.json](./package.json) to latest version of `ramda`.
2. Install packages: `npm i`
3. `npm run make_release`

## Development

Node 6 or above is required.

The scripts defined in package.json are:

* `jsdoc` - extracts documentation from the source files
* `less` - builds the css
* `gitbook` - builds the gitbook manual, viewable at
  [localhost:8080/manual/_book/](localhost:8080/manual/_book/).
* `make_release` - runs the other build scripts, builds index.html,
  and prepares the documentation for release.
* `server` - starts a local HTTP server


### Building docs

To rebuild the [docs](./docs/index.html) page:

	npm run jsdoc


### Building styles

Styles for the site are written with [Less](http://lesscss.org/), using the
[Bootstrap](https://getbootstrap.com/) package.

To rebuild the main [style.css](./style.css):

	npm run less
