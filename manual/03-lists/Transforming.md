# List to list transformations

TODO: `map`, `pluck`, `filter`, `aperture`, `uniq`, `zip`, `partition`

`for`/`while` loops are mainly used for

* Transforming
* Filtering
* Side effect
* TODO: what else?

Where the iteration of the list is simply boilerplate. Iterating over lists using `for` obfuscates the intent of the core logic. By abstracting the iteration boilerplate into intent revealing functions, we can increase the over all readability of our code.

### Example: Task Management System <sup>[1]</sup>

Let's consider a scenario where: on client side when we make a ajax request to fetch list of tasks, and receive the following json, with tasks and their attributes.

```js
const data = {
    result: "SUCCESS",
    interfaceVersion: "1.0.3",
    requested: "10/17/2013 15:31:20",
    lastUpdated: "10/16/2013 10:52:39",
    tasks: [
        {id: 104, complete: false,            priority: "high",
                  dueDate: "11/29/2013",      member: "Scott",
                  title: "Do something",      created: "9/22/2013"},
        {id: 105, complete: false,            priority: "medium",
                  dueDate: "11/22/2013",      member: "Lena",
                  title: "Do something else", created: "9/22/2013"},
        {id: 107, complete: true,             priority: "high",
                  dueDate: "11/22/2013",      member: "Mike",
                  title: "Fix the foo",       created: "9/22/2013"},
        {id: 108, complete: false,            priority: "low",
                  dueDate: "11/15/2013",      member: "Punam",
                  title: "Adjust the bar",    created: "9/25/2013"},
        {id: 110, complete: false,            priority: "medium",
                  dueDate: "11/15/2013",      member: "Scott",
                  title: "Rename everything", created: "10/2/2013"},
        {id: 112, complete: true,             priority: "high",
                  dueDate: "11/27/2013",      member: "Lena",
                  title: "Alter all quuxes",  created: "10/5/2013"}
    ]
}

const tasks = data.tasks

```

## Transforming

Let's say we want to display a table of tasks with only specific properties, viz. title, completed, dueDate, and member. Following is an example of an iterative approach, where we pick these properties from each task. And store the result in `table` array.
 
```js
const table = []
for(var i = 0; i < tasks.length; i++){
  const task = tasks[i]
  table.push({
    title:task.title, 
    completed:task.completed, 
    dueDate:task.dueDate, 
    member:task.member  
  })
}
```
Above code duplicates the iteration boiler plate, is too verbose thereby obfuscating its intent. We can abstract the boilerplate using the [`map`][ma] function.
```js
const transformTask = (task)=>({  
                             title:task.title, 
                             completed:task.completed, 
                             dueDate:task.dueDate, 
                             member:task.member  
                           }) 
const table = R.map(transformTask, tasks)
```
Usage of `map` function makes it clear that we are performing a transformation (mapping) on each element in the task list. 

But, we are not done yet, the transformTask function is simply picking some properties from a task. This is a perfect use case for [`pick`][pi] function.
  ```js
const table = R.map(R.pick(["title", "completed", "dueDate", "member"]), tasks)
```
Finally, our code clearly communicates its intent.


TODO: map over objects

  [1]: https://github.com/CrossEye/FuncProgTalk

  [FuncProgTalk]: https://github.com/CrossEye/FuncProgTalk
  [ma]: http://ramdajs.com/docs/#map
  [pi]: http://ramdajs.com/docs/#pick
