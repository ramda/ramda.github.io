let R = require('ramda');

// :: [Number] -> [a] -> [a]
var pickIndexes = R.compose(R.values, R.pickAll);
pickIndexes([0, 2], ['a', 'b', 'c']);