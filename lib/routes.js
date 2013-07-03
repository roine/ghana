addClass = function(view){
  $('body').removeClass(function(index, classes){
    var regex = /\bview-\w+/gi;
    return classes.match(regex) && classes.match(regex).join(' ');
  })
  .addClass('view-'+view);
  addActive(view)
}

addActive = function(view){
  $('.nav li').removeClass('active');
  $('.nav [data-view='+view+']').addClass('active');
}