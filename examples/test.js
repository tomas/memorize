var memo = require('..');

var foo = memo(function(msg, cb) {
  setTimeout(function() {
    cb(msg)
  }, 1000);
})

foo('one', 123, function(msg) {
  console.log(msg);

  // different arguments passed, so it shouldnt memoize
  foo('two', 321, function(msg) {
    console.log(msg)

    // this one should be fast, though.
    foo('two', 321, console.log); 
  });
})
