Referential Transparency
========================

Referential Transparency is a simple notion: we should be free to
substitute an expresion's vaulue for that expression without changing
the behavior of our program.

There are several advantages to referetial transparent code.  It
simplifies analysis, and lets us -- or perhaps a compiler -- optimize
parts that might otherwise be too difficult to do.  But perhaps the
greatest benefit is that it entirely removes the notion of _sequencing_,
of time, from the analysis of our program.  It doesn't matter which
expressions are evaluated first; the answer will always be the same.

This sample is **not** referentially transparent:

```js
var counter = 0;
var incrBy = function(n) {
  counter = counter + n;
  return counter;
}
```

This function will return different values when called again with the
same parameters.  It will also updates a global variable that might
be used by other parts of the program.  Both of these facts make it
non-referentially transparent.

There are two basic characteristics of referentially transparent
functions:  they must be _pure_, where the output is based only on the
parameters supplied, and they must have no side effects.  All of Ramda's
functions are designed this way.


Purity
------

The function above was not pure because it depended not only upon the
input parameter, `n`, but also upon the global variable, `counter`.  That
variable could change because of something else in the program unrelated
to our own code.  No Ramda functions do this.



