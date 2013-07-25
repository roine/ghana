take = (function(){
  var each,
  from,
  a,
  _public = {};

  _public.each = function(keys){
    each = keys;
    if (from) {
      return get();
    }
    return this;
  }
  _public.a = function(keys){
    a = keys;
    if (from) {
      return getOne();
    }
    return this;
  };

  _public.from = function(obj){
    from = obj;
    if (a) {
      return getOne();
    }
    else if (each) {
      return get();
    }
    else {
      return this;
    }
  }

  function index(obj, i) {
    return obj[i];
  }

  function getOne() {
    var val = a.split('.').reduce(index, from);
    end();
    return val;
  }
  function get() {
    arr = [];
    _.each(from, function(data) {
      arr.push(each.split('.').reduce(index, data));
    });
    end();
    return arr;
  }
  function end(){
    a = from = each = undefined;
  }

  return _public;
})();

