var cache = {};

var get_key = function(args) {
   return args.map(function(el) { return el.toString() }).join('__');
}

var get = function(fn, args) {
  var key    = fn.toString(),
      subkey = get_key(args);

  if (cache[key] && cache[key][subkey]) {

    if (!cache[key][subkey].valid_until || cache[key][subkey].valid_until > Date.now())
      return cache[key][subkey].result;
    else
      delete cache[key][subkey];
  }
};

var set = function(fn, args, result, expires_in) {
  if (typeof result !== 'object') 
    throw('Result should be an object.');

  var key    = fn.toString(),
      subkey = get_key(args);

  cache[key] = {};

  if (!cache[key])
    cache[key] = {};

  cache[key][subkey] = {};
  cache[key][subkey].result = result;

  if (expires_in)
    cache[key][subkey].valid_until = (Date.now() + expires_in);
}

var reset = function(fn) {
  var key = fn.toString();
  delete cache[key];
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

    var handler = function() {
      var result = arguments;
      if (!(result[0] instanceof Error)) {
        set(fn, args, result, expires_in);
      }

      cb.apply(null, result);
    }

    fn.apply(null, args.concat(handler));
  }

  memorized.reset = function() {
    reset(fn);
  }

  return memorized;
}
