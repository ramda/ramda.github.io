Core Features
=============

Ramda does not try to be everything to everyone.  Although there are some
[Advanced][09] features, for the most part Ramda focuses on some simple ideas,
and leaves it to the user to decide how to put them together.  These features
are not everything that one would want in a functional language, but they do
constitute a solid functional programming core.

In the section on [Small Functions on common structures][sf], we discuss how
having a large number of common functions that will run consistently against
simple resuable data structures -- an idea very much at odds with Object
Oriented programming's notion of having many data structures, each with a small
number of custom functions -- how this idea makes thinking about our systems
significantly easier.

Javascript does little to help us work with immutable data.  It's all too easy
to write functions that maintain reference equality but alter the actual
contents of user objects beyond recognition.  Ramda helps by guaranteeing that
its functions never mutate any input data.  We consider the implications of this
in [Immutability of user data][im].

Another core functional programming concern is for functions to be
[referentially transparent][rt].  While Ramda, does not try to enforce this for
you, its functions themselves have no side-effects, and very few Ramda functions
are written with side-effects in mind.  We investigate this more fully in
[Referential Transparancy][tr].

In [Composing functions][co] we hit the core of Ramda's strength: how to chain
together multiple functions to make increasingly sophisticated systems out of
simple parts, analyzing a number of different forms of functional composition
supported by Ramda.

In order to effectively compomse functions, it will help a great deal to be able
to easily change one function into another by partially applying some of its
parameters.  We will discuss more sophisticated ways to do this in [Chapter 2:
Functions][02], but in [Currying everywhere][cu] we evaluate the most common
mechanism for this in Ramda, the simple `curry` function.

Finally, in [Dispatching][di] we examine how Ramda wraps certain other APIs in
a functional façade, to allow you to more easily integrate into a functional
programming workflow.




  [02]: ../02-functions
  [09]: ../09-advanced
  [co]: Compostion.md
  [cu]: Currying.md
  [di]: Dispatching.md
  [im]: Immutability.md
  [rt]: https://en.wikipedia.org/wiki/Referential_transparency_%28computer_science%29
  [sf]: SmallFunctions.md
  [tr]: ReferentialTransparency.md
