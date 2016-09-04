# ramda.github.io

To generate the various files required by the website, run the following
command (using the actual version number in place of `X.Y.Z`):

```console
$ VERSION=X.Y.Z make
```


## Start local server

	npm run server

Once this is running, visit [localhost:8080](http://localhost:8080/) to view the docs.
In the event that `:8080` is in use, you can change the port like so:

	npm run server -- -p 8081

For more details on configuring the server, see [http-server (0.8.x)][http-server].

[http-server]: https://github.com/indexzero/http-server/tree/0.8.5#available-options


## What to do on a new release

1. Update [package.json](./package.json) to latest version of `ramda`.

2. Install packages: `npm i`

3. `npm run make_release`
