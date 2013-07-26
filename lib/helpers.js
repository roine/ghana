capitalize = function(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
};

hasEmptyValue = function(obj) {
  for(var i in obj){
    if(obj[i] === '') return true;
  }
  return false;
};

pluralize = function(count, word) {
  if(count > 1){
    return count+' '+word+'s';
  }
  else{
    return count+' '+word;
  }
};
