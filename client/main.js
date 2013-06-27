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
  },
  'click .logout': function(){
    Meteor.logout();
    Meteor.Router.to('/');
    openAlert({
      title:'Au revoir',
      message:'You have been logged out!'
    });
  }
});
Template.loggedInBar.rendered = function () {
  $('.nav li').removeClass('active');
  $('.nav [data-view='+Meteor.Router._page+']').addClass('active');
};

this.hasEmptyValue = function(obj) {
  for(var i in obj){
    if(obj[i] === '') return true;
  }
  return false;
}

// obj = {message, title, type, lifetime}, lifetime is in second
this.openAlert = function(obj) {
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



