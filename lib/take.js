take = {
  each: function(keys){
    take.keys = keys;
    return this;
  },
  from: function(obj){
    if(!take.keys) return;
    arr = []
    _.each(obj, function(data){
      arr.push(take.keys.split('.').reduce(take.index, data));
    });
    return arr;
  },
  index: function(obj,i) {return obj[i]}
}