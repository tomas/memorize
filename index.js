var cache = {};

var get_key = function(fn, args) {
   return fn.toString() + '__' + args.map(function(el) { return el.toString() }).join('__');
}

var get = function(fn, args) {
  var key = get_key(fn, args);

  if (cache[key]) {

    if (!cache[key].valid_until || cache[key].valid_until > Date.now())
      return cache[key].result;
    else
      delete cache[key];
  }
};

var set = function(fn, args, result, expires_in) {
  if (typeof result !== 'object') 
    throw('Result should be an object.');

  var key = get_key(fn, args);

  cache[key] = {};
  cache[key].result = result;

  if (expires_in)
    cache[key].valid_until = (Date.now() + expires_in);
}

module.exports = function(fn, expires_in) {

  var memorized = function() {
    var args = [].slice.call(arguments); // .sort();
    var cb = args.pop();

    var res = get(fn, args);
    if (res) {
      // console.log('Found cached result.')
      return cb.apply(null, res);
    }

    fn(args, function() {
      var result = arguments;
      if (!(result[0] instanceof Error)) {
        set(fn, args, result, expires_in);
      }

      cb.apply(null, result);
    });
  }

  return memorized;
}
