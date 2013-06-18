
Meteor.Router.add({
  '/user/:userId': 'user_profile',
  '*': 'not_found'
});
Meteor.user_profile.helper({
  email:function(){
    return Meteor.user().emails[0].address;
  }
})
Meteor.user();