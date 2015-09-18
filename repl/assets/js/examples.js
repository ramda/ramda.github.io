(function () {

    var config = {
        arrays: [
            {
                title: "map",
                body: function () {
                    /*
R.map(x => x + 1, [10, 20, 30]);
                     */
                }
            },
            {
                title: 'filter',
                body: function() {
                    /*
R.filter(x => x > 10, [10, 20, 3, 100, 33, 1]);
                     */
                }
            },
            {
                title: 'reduce',
                body: function() {
                    /*
R.reduce((acc, x) => acc + x, 0, [10, 20, 30, 40]);
                     */
                }
            },
            {
                title: 'reduceRight',
                body: function() {
                    /*
R.reduceRight((acc, x) => acc + x, '', ['s', 'd', 'r', 'a', 'w', 'k', 'c', 'a', 'b']);
                     */
                }
            },
            {
                title: 'transduce',
                body: function() {
                    /*
var priceOrZero = R.compose(R.defaultTo(0), R.prop('price'));
var purchases = [
  {price: 30},
  {price: 0},
  {notPrice: 'cow'},
  {price: 10},
  {price: 6},
  {}
];
R.transduce(R.map(priceOrZero), R.add, 0, purchases);
                     */
                }
            }
        ],
        functions: [
            {
                title: "curry",
                body: function () {
                    /*
var f = R.curry((a, b, c) => b + a * c);
f(2)(3)(4);
                    */
                }
            },
            {
                title: "compose",
                body: function () {
                    /*
var composeEx = R.compose(
            R.map(x => x * x),
            R.filter(x => x > 4)
            );
composeEx([2, 3, 4, 5]);
                     */
                }
            },
            {
                title: "pipe",
                body: function () {
                    /*
var pipeEx = R.pipe(
            R.map(x => x * x),
            R.filter(x => x > 4)
            );
pipeEx([2, 3, 4, 5]);
                     */
                }
            },
            {
                title: 'useWith',
                body: function() {
                    /*
var sum = () => R.reduce((acc, x) => acc + x, 0, arguments);

var useWithEx = R.useWith(
    sum,
    y => y * 2,
    x => x * x
);
useWithEx(2, 3, 4);
                     */
                }
            },
            {
                title: 'converge',
                body: function() {
                    /*
var add = (a, b) => a + b;
var multiply = (a, b) => a * b;
var subtract = (a, b) => a - b;
var convergeEx = R.converge(multiply, add, subtract)
convergeEx(2, 4);
                     */
                }
            }
        ],
        objects: [
            {
                title: "prop",
                body: function () {
                    /*
var propEx = R.prop('x');
propEx({w: 'WWW', x: 'XXX', z: 'ZZZ'});
                    */
                }
            }
        ]
    };

    var lists = Object.keys(config);
    var examples = document.getElementById("examples");
    var elms = {};
    var cache = {};

    //build lists
    lists.forEach(function (name) {
        elms[name] = document.getElementById( name );
        config[name].forEach(function (e, i) {
            var str = e.body
                .toString()
                .replace(/[^\*]+\*/m, "")
                .split("*/")[0]
                .split("\n")
                .filter(function (s) {
                    return !!s && !s.match(/^\s+$/);
                })
                .join("\n");

            cache[e.title] = str;
            $('<li><a href="#">' + e.title + '</a></li>' ).appendTo(elms[name]);
        });
    });

    //add handlers
    $("button[type=reset]" ).on("click", function () {
        window.location.href = window.location.href.split("#")[0];
    });

    $(examples).on("click", function (e) {
        // here's that nasty global var:
        cm.setValue( cache[e.target.textContent] );
        e.preventDefault();
    });

}());

