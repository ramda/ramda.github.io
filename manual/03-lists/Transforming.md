# List to list transformations

TODO: `map`, `pluck`, `filter`, `aperture`, `uniq`, `zip`, `partition`

## Many times we loop over lists for...


### Transforming

 
```js
const libs = ["Ramda", "Lodash", "Pramda", "Underscore"]
const html = []
for(var i = 0; i < libs.length; i++){
  html[i] = "<li>"+libs[i]+"</li>"
}
console.log(html)

```
Above code is too verbose and we are prone to making mistakes. Ramda provides a `map` function to achieve
  
```js
const libs = ["Ramda", "Lodash", "Pramda", "Underscore"]
R.map((lib)=>"<li>"+lib+"</li>", libs)
```

Much more concise. We could refactor this code further by writing a reusable wrapTag function.
```js
const wrapTag = R.curry((tag, str) => `<${tag}>${str}</${tag}>`)
R.map(wrapTag("li"), libs)
```
Now we can use wrapTag for any tag, and our usage map function became even more readable. In all fairness, we could have used wrapTag in for loop example but it would be a minor improvement in readability.   

TODO: map over objects


### Filtering

```js
const libs = ["Ramda", "Lodash", "Pramda", "Underscore"]
const amdas = []
for(var i = 0; i < libs.length; i++){
  if(/amda/i.test(libs[i])){
    amdas.push(libs[i])
  }
}
console.log(amdas)
```
TODO: write ramda example.
