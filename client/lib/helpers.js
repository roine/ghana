// obj = {message, title, type, lifetime}, lifetime is in second
openAlert = function(obj) {
  var opt = {
    title:'',
    message:'',
    type:'info',
    lifetime:3
  };
  $.extend(opt, obj);
  $('.alert').find('.alert-heading').html(opt.title).end()
  .find('.message')
  .html(opt.message).end()
  .removeClass('slideUp hide alert-error alert-success alert-info')
  .addClass('magictime puffIn alert-'+opt.type);
  setTimeout(closeAlert, opt.lifetime*1000)

};

closeAlert = function() {
  var $alert = $('.alert .close').closest('.alert')
  $alert.removeClass('puffIn').addClass('slideUp');
  // 600ms is  the speed of the sliding animation cf: magic.css
  setTimeout(function(){$alert.addClass('hide')},600);
};