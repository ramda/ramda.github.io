# ramda.github.io

This repo contains all the prebuilt files used on the site.

## Setup

	npm i

## Start local server

	npm start

Once this is running, visit [localhost:8080](http://localhost:8080/) to view the docs.
In the event that `:8080` is in use, you can change the port like so:

	npm start -- -p 8081

For more details on configuring the server, see [http-server docs][http-server].

[http-server]: https://github.com/indexzero/http-server#available-options

## What to do on a new release?

1. Update [package.json](./package.json) to latest version of `ramda`.

2. Build the documentation. Simply run `make`.
## Development

### Node version

Node 6 or above is required in order to build jsdoc.

If you are using [nvm](https://github.com/creationix/nvm#nvmrc), simply run:

	nvm install && nvm use

### Building docs

To rebuild the [docs](./docs/index.html) page:

	make docs/index.html


### Building styles

Styles for the site are written with [Less](http://lesscss.org/), using the
[Bootstrap](https://getbootstrap.com/) package.

To rebuild the main [style.css](./style.css):

	make style.css
