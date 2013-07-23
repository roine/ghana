Accounts.config({
  sendVerificationEmail:false
});
function hookWithGithub(options, user) {
  user.profile = {}
  try{
    user.username = user.services.github.username;
  }catch(e) {}
  try{
    user.emails = [];
    user.emails.push({address:user.services.github.email, verified:true})
  }catch(e) {}
  try{
    user.profile.real_name = options.profile.name;
    user.profile.front_name = options.profile.name.split(' ').join('_');
  }catch(e) {}
  return user;
}

function hookWithPassword() {

}
Accounts.onCreateUser(function(options, user) {
  user.points = 0;
  // external service login
  if(user.services.github) {
    return hookWithGithub(options, user);
  }
  user.profile = options.profile || {};
  user.profile.points = 0;

  if(!options.username)
    options.username = options.profile.name
  if(options.username && !user.profile.front_name) {
    // http://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
    user.profile.front_name = options.username.split(' ').join('_');
  }

  // // using +(new Date) will convert the date into integer
  // // to put it back to string ''+(new Date)
  // user.profile.createdAt = +(new Date);
  // // set admin for first user
  if(!Meteor.users.findOne()){
    user.isAdmin = true;
  }
  return user;
});
