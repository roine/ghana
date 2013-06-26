'use strict';
// add this in front to make it global
this.user_exists = function(userId) {
  userId = userId || Session.get('userId');
  // !![] would return true so it's converted to string then to boolean
  return !!Meteor.users.find({'_id': userId}).fetch().join('');
}

this.get_user = function(userId) {
  userId = userId || Session.get('userId');
  return Meteor.users.find({'_id': userId}).fetch();
}

Template.notification.events({
  'click .close': function(event) {
    closeAlert();
    return false;
  }
})
Template.loggedInBar.events({
  'click navbar a': function(event){
    var self = event.currentTarget;
    $(self).addClass('active')
  }
});

this.hasEmptyValue = function(obj) {
  for(var i in obj){
    if(obj[i] === '') return true;
  }
  return false;
}

// obj = {message, title, type, lifetime}, lifetime is in second
this.openAlert = function(obj) {
  $('.alert').find('.alert-heading').html(obj.title).end()
  .find('.message')
  .html(obj.message).end()
  .removeClass('slideUp hide alert-error alert-success alert-info')
  .addClass('magictime puffIn alert-'+obj.type);

  if(obj.lifetime){
    setTimeout(closeAlert, obj.lifetime*1000)
  }
}

this.closeAlert = function() {
  var $alert = $('.alert .close').closest('.alert')
  $alert.removeClass('puffIn').addClass('slideUp');
  // 600ms is  the speed of the sliding animation cf: magic.css
  setTimeout(function(){$alert.addClass('hide')},600);
}

this.pluralize = function(count, word) {
  if(count > 1){
    return count+' '+word+'s';
  }
  else{
    return count+' '+word;
  }
}



