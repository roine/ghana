Template.notification.events({
  'click .close': function(event) {
    closeAlert();
    return false;
  }
});
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