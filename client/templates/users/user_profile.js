Template.user_profile.helpers({
  user:function() {
    var user = Meteor.users.find({'profile.front_name':Session.get('slug')}).fetch();
    // is an empty array
    if(!isFinite(user))
     return user[0];
  },
  isCurrentUser: function() {
    if(!Template.user_profile._tmpl_data.helpers.user()) return false;
    return Template.user_profile._tmpl_data.helpers.user()._id === Meteor.userId();
  }
});