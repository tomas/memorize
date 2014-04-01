var cache = {};
var default_expires = 5000;

var get = function(key) {

  if (cache[key]) {
    if (cache[key].valid_until == 0 || cache[key].valid_until > Date.now())
      return cache[key].value;
    else
      delete cache[key];
  }

};

var set = function(key, val, expires_in) {
  if (!val) throw('No value passed');

  cache[key] = {};
  cache[key].value = val;
  cache[key].valid_until = (Date.now() + (expires_in || default_expires));
}

module.exports = function(fn, expires_in) {

  var memorized = function(cb){
    var res = get(fn);
    if (res) {
      return cb.apply(null, res);
    }

    fn(function() {
      if (!(arguments[0] instanceof Error)) {
        set(fn, arguments, expires_in);
      }

      cb.apply(null, arguments);
    });
  }

  return memorized;
}
