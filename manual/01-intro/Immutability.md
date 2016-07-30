Immutability
============

Often in Javascript we pair field accessors and field mutators for our
data structures.  We might see

```js
person.setName('Fred');
person.getName(); //=> "Fred"
```

This is done in many different ways.  Of course fields themselves are
most commonly both readable and writable:

```js
person.name = 'Fred';
person.name; //=> "Fred"
```

And there are more convoluted means involving [`Object.defineProperty`][dp].
In each of these techniques, there is a straightforward pairing.  Those
things you can _read_ from an object, you can also _write_ to it.

In functional programming, such mutable state is considered extremely
dangerous, making programs hard to reason about, difficult to debug,
and almost impossible to grow correctly into large, consistent systems.

Ramda helps avoid this by refusing to ever mutate input data.  We have
equivalents of the accessors above:

```js
var getName = R.prop('name');
getName(person); //=> "Fred"
// or 
R.prop('name', person); //=> "Fred"
```

But the closest equivalents we have to mutators are functions like 
[`assoc`][as].  And they're not all that close.  `assoc` creates a
copy of your object with a new value associated with a field name:

```js
var barney = {name: "Barney", age: 27}
var fred = {name: "Fred", age: 29}
barney.bestFriend = fred;
fred.bestFriend = barney;

var fred2 = R.assoc('age', 30, fred);

fred2.age; //=> 30
fred.age; //> 29
fred2.bestFriend === barney; //=> true
```

Note that `assoc` retuns a new object, but note also the last line; the
returned structure shares as much of its internals with the original as
possible.  This is not a deep clone of the original object.

This is true across all of Ramda.  Nothing you pass to Ramda will be 
altered.  If a function acts like a mutator, it instead creates a copy
of the structure with the changes applied:

For example, the native [`sort`][so] and [`reverse`][rv] methods on
[`Array.prototype`][ap] mutate the underlying object.  Ramda's
equivalent [`reverse`][rs] function just return new lists:

```js
var a1 = [1, 2, 3];
var b1 = a1.reverse(); //=> [3, 2, 1]
a1; //=> [3, 2, 1]

var a2 = [1, 2, 3];
var b2 = R.reverse(a2); //=> [3, 2, 1]
a2; //=> [1, 2, 3]
```

And there's similar behavior for Ramda's [`sort`][st] function.

We won't discuss in depth all the reasons that immutability is desirable.
That's easily available [on the web][go].  But there are many important
reasons having to do with how well anyone can understand our code, how
well it stands up to parallelization, how many fewer ways in which it can
actually fail.

We also will not talk about how you might make more of our own data
immutable (although in [Chapter 10][im], we do discuss how Ramda will
integrate with some immutable data libraries but not others.)  But we do
want to stress that _none_ of Ramda's functions mutate user data.

For those used to functional programming, we should point out that this 
is not done through deeply recursive algorithms.  We have plenty of 
internal mutation.  But at our function boundaries, everything can be 
seen as immutable.

The basic point is simple: Don't expect Ramda to mutate your data for
you:

```js
var numbers = [8, 6, 7, 5, 3, 0];
var jenny = R.append(9, numbers);
numbers; //=> [8, 6, 7, 5, 3, 0]
jenny; //=> [8, 6, 7, 5, 3, 0, 9]
```

Ramda does not take any special pains to prevent you from mutating
your own data when using its functions.  For intance you could build 
up an output object by continually mutating the accumulator passed to
[`reduce`][re].  Ramda would not prevent you:

```js
var states = [
    {symbol: 'CT', name: 'Connecticut', pop: 3574097},
    {symbol: 'ME', name: 'Maine', pop: 1328361},
    {symbol: 'MA', name: 'Massachusetts', pop: 6547629},
    {symbol: 'NH', name: 'New Hampshire', pop: 1316470},
    {symbol: 'RI', name: 'Rhode Island', pop: 1052567},
    {symbol: 'VT', name: 'Vermont', pop: 623741},
];

var notSmall = (state) => state.pop >= 2000000;

R.reduce((accum, state) => {
    if (notSmall(state)) {
        accum[state.symbol] = state.pop;
    }
    return accum;
}, {}, states); //=> {"CT": 3574097, "MA": 6547629}
```

Notice the continual mutation of the accumulator in this sample.  This
is not in any way prohibited by Ramda.  But it is perhaps not the most
idiomatic way to use Ramda.  The `assoc` we used earlier would cover 
the same case without introducing such continual mutation:

```js
R.reduce((accum, state) => notSmall(state) ? 
                           R.assoc(state.symbol, state.pop, accum) : 
                           accum,
{}, states);  //=> {"CT": 3574097, "MA": 6547629}
```

And, unless it caused performance concerns, many Ramda users would
prefer to do this by piping the data through a few simpler 
transformations:

```js
R.pipe(
    R.filter(notSmall), 
    R.map(R.props(['symbol', 'pop'])),
    R.fromPairs)(states) //=> {"CT": 3574097, "MA": 6547629}
```

In the section on [Transducers][tr] we'll examine how to make such
multi-step transformations more efficient.  But for many users, for
most cases, such code as listed above is ideal, as it's cleanly
readable, involves no mutation, and is performant enough.

Finally, in a later section, we'll look at [Lenses][le], a powerful
tool that will allow you to abstract many common data access and
pseudo-mutation functions provided by Ramda into a single framework.


  [ap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  [as]: http://ramdajs.com/docs/#assoc
  [dp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  [go]: https://www.google.com/search?q=Immutability+fp
  [im]: ../10-others/Immutable.md
  [le]: ../09-advanced/Lenses.md
  [re]: http://ramdajs.com/docs/#reduce
  [rs]: http://ramdajs.com/docs/#reverse
  [rv]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
  [so]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  [st]: http://ramdajs.com/docs/#sort
  [tr]: ../09-advanced/Tranducers.md
