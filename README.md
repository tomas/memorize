Memorize
========

Like async's memoize. But without the rest.

    $ npm install memorize

Example
-------

    var memo = require('memorize');
    
    var foo = memo(function(cb) {
      setTimeout() {
        // this function takes long, long, long
        // but's only going to run once.
        cb('Foo!')
      }, 5000);
    })

    foo(function(msg) {
      console.log(msg); // should take 5 secs

      foo(function(other_message) {
        console.log(other_message); // immediate
      })
    })

You can also set an expiration time on memoization.

    var foo = memo(function(cb) { 
      // magic happens here, but it takes long
    }, 7000); // expire after 7 secs.
   
    foo(function(res) {
      // took a while

      foo(function(res) {
        // immediate
      })

      setTimeout(function() {
        foo(function(res) {
          // expiration passed, so function is re-run
        })
      }, 10000);
    })

That's it. For more info take a look at the examples.

About
-----

By Tomás Pollak.
(c) Fork, Ltd. MIT licensed.
