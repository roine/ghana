Template.user_profile.helpers({
  email:function(){
    var user = get_user();
    console.log(get_user())
    return user[0].emails[0].address;
  },
  userId: function(){
    return Session.get('userId');
  }
});
Template.not_found.helpers({
  type:function(){
    return Session.get('type');
  }
});