Small functions on common structures
====================================

> It is better to have 100 functions operate on one data structure than 10
> functions on 10 data structures. _-- Alan J. Perlis_

Functional programming is best paired with a few consistent data structures.
The largest set of Ramda's functions operate on _lists_.  We'll discuss lists
in much more detail in [Chapter 3][03], but at the moment, we can just think
about simple dense arrays.  Let's start with this data:

```js
var lineItems = [
  {
    productId: "783490",
    description: "Rubik's Cube, 3x3x3",
    price: 12.99,
    quantity: 1
  },
  {
    productId: "134672",
    description: "Sudoku Book",
    price: 6.50,
    quantity: 3
  },
  {
    productId: "162075",
    description: "Sam Lloyd's 15 puzzle",
    price: 3.25,
    quantity: 5
  },

];
```

We can run various functions against this structure:

```js
R.pluck('description')(lineItems);
//=> ["Rubik's Cube 3x3x3", "Sudoku Book", "Sam Lloyd's 15 puzzle"]

R.map(item => item.quantity * item.price)(lineItems);
//=> [12.99, 19.50, 16.25]

R.reduce((total, item) => total + item.price * item.quantity, 0)(lineItems);
//=> 48.74

R.filter(item => item.price < 10.00, lineItems);
//=> [
//     {"description": "Sudoku Book", "price": 6.5,
//        "productId": "134672", "quantity": 3},
//     {"description": "Sam Lloyd's 15 puzzle", "price": 3.25,
//        "productId": "162075", "quantity": 5}
// ]

R.compose(R.reduce(R.add, 0), R.pluck('quantity'))(lineItems);
//=> 9

R.project(['productId', 'quantity'])(lineItems);
//=> [
//    {productId: "783490", quantity: 1},
//    {productId: "134672", quantity: 3},
//    {productId: "162075", quantity: 5}
// ]
```

But we can also make reusable functions out of these:

```js
// descriptions :: [LineItem] -> [String]
const descriptions = R.pluck('description');

// lineItemTotals :: [LineItem] -> [Number]
const lineItemTotals = R.map(item => item.quantity * item.price);

// invoiceTotal :: [LineItem] -> Number
const invoiceTotal = reduce((total, item) => total + item.price * item.quantity, 0)

// inexpensive :: [LineItem] -> [LineItem]
const inexpensive = R.filter(item => item.price < 10.00);

// totalItems :: [LineItem] -> Number
const totalItems = R.compose(R.reduce(R.add, 0), R.pluck('quantity'));

// warehoustPickList :: [LineItem] -> [{productId, quantity}]
const warehousePickList = R.project(['productId', 'quantity'])
```

(If these Haskell-style signatures are confusing, we have a [short primer][si]
available.)

Now we can use these functions to work with _any_ list of `LineItem`s.  Some,
such as `inexpensive` even further return new lists of `LineItem`s.  Many others
return different sorts of lists, such as lists of descriptions, of item totals,
or of simplified versions of a `LineItem`, as displayed by `warehousePickList`.

Working with common structures like this make it very easy to build complex
systems through combinations of simple tools.  Let's take another look at
our totaling fuctions.  These functions are not too complicated, but they really
combine several steps into one.  We might be better off breaking them down:

```js
// itemTotal :: LineItem -> Number
const itemTotal = (item) => item.price * item.quantity;

// lineItemTotals :: [LineItem] -> [Number]
const lineItemTotals = R.map(itemTotal);

// invoiceTotal :: [LineItem] -> Number
const invoiceTotal = R.pipe(lineItemTotals, R.sum);
```
Now we're getting to a set of very easily reusable functions with clear
purposes.  And although each one operates on either a `LineItem` or a list of
`LineItem`s, the Ramda functions they use (`map` and `sum`) operate on lists.
(We'll see more about `pipe` in the section on [Composition][co].)  Because
we keep getting lists back from intermediate functions, we can continue to
use familiar functions to operate on them.

The largest set of Ramda functions operate on lists of elements.  But there
are others for Strings, for plain Objects, for Functions, and some for logical
combinations.  The main point is that Ramda tries to create many useful functions
for these few types, generally returning another element from one of these
types.  These common interfaces is how functional systems are pieced together.



  [03]: ../03-lists
  [co]: Composition.md
  [si]: ../README.md#a-note-on-signatures
