Accounts.config({
  sendVerificationEmail:false
});

Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.points = 0;
  if(options.username && !user.profile.front_name) {
    user.profile.front_name = options.username;
  }

  // using +(new Date) will convert the date into integer
  // to put it back to string ''+(new Date)
  user.profile.createdAt = +(new Date);
  // set admin for first user
  if(!Meteor.users.findOne()){
    user.isAdmin = true;
  }
  return user;
});
