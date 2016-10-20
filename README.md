# ramda.github.io

To generate the various files required by the website, run the following
command (using the actual version number in place of `X.Y.Z`):

```console
$ VERSION=X.Y.Z make
```


## Start local server

This repo contains all the prebuilt files used on the site.
It also contains a static file server (available after `npm i`):

	npm run server

Once this is running, visit [localhost:8080](http://localhost:8080/) to view the docs.
In the event that `:8080` is in use, you can change the port like so:

	npm run server -- -p 8081

For more details on configuring the server, see [http-server docs][http-server].

[http-server]: https://github.com/indexzero/http-server#available-options


## What to do on a new release

1. Update [package.json](./package.json) to latest version of `ramda`.

2. Install packages: `npm i`

3. `npm run make_release`


## Development

### Building docs

To rebuild the [docs](./docs/index.html) page:

	npm run jsdoc


### Building styles

Styles for the site are written with [Less](http://lesscss.org/), using the
[Bootstrap](https://getbootstrap.com/) package.

To rebuild the main [style.css](./style.css):

	npm run less
