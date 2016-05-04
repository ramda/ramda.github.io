# ramda.github.io

To generate the various files required by the website, run the following
command (using the actual version number in place of `X.Y.Z`):

```console
$ VERSION=X.Y.Z make
```


## Start local server

	npm run server

Then visit [localhost:8080](http://localhost:8080/) to view the docs.


## Cookbook

To add an example to the cookbook, simply add a `yaml` file in the `examples/code` folder, run `make` and issue a PR.

Here's an example yaml file:

```yaml
title: Pick List Values by Index
name: Pick List by Index
description: "This example shows you how to specify multiple indexes of an array to retrieve multiple values from the array." 
source: |
      let R = require('ramda');

      // :: [Number] -> [a] -> [a]
      var pickIndexes = R.compose(R.values, R.pickAll);
      pickIndexes([0, 2], ['a', 'b', 'c']);
```

**title** will be displayed on the page when the example is selected.

**name** will be the text displayed in the left-hand menu.

**description** is optional and will be displayed below the title if it is supplied.

**source** is the code for the cookbook. In order for it to run in `Tonic`, please require all libraries used, including Ramda.