var memorize = require('./');

var foo = memorize(function(cb) {
  setTimeout(function() {
    cb('Foobar');
  }, 1000);
})

foo(function(res) {
  console.log(res);

  foo(function(res2) {
    console.log(res2);
  })
})
