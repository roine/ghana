Accounts.config({
  sendVerificationEmail: false
});

function hookGithub(options, user) {

  try {
    // restructure the object user
    userEdit = {
      username: user.services.github.username.toLowerCase(),
      emails: [{
        address: user.services.github.email,
        verified: true
      }],
      profile:{
        real_name: options.profile.name,
        front_name: options.profile.name.split(' ').join('_')
      },
      extra:{
        // create a capital version to avoid copy, since searching against a regex is slow
        front_name_cap: options.profile.name.split(' ').join('_').toUpperCase()
      }
    };
    _.extend(user, userEdit);
  } catch (e) {}
  return user;
}

function hookLinkedin(options, user) {
  try {
    // makes things shorter
    var name = options.profile.firstName + ' ' + options.profile.lastName;

    userEdit = {
      username: options.profile.firstName.toLowerCase(),
      emails: [{
        address: options.profile.emailAddress,
        verified: true
      }],
      profile: {
        real_name: name,
        front_name: name.split(' ').join('_'),
        picture: options.profile.pictureUrl,
        website: options.profile.publicProfileUrl,
        location: options.profile.location.name
      },
      extra: {
        languages: take.each('language.name').from(options.profile.languages.values),
        skills: take.each('skill.name').from(options.profile.skills.values),
        front_name_cap: name.split(' ').join('_').toUpperCase()
      }
    }
    _.extend(user, userEdit);
  } catch (e) {console.log(e)}


  return user;
}

Accounts.onCreateUser(function(options, user) {
  user.points = 0;
  // external service login
  if (user.services.github) {
    return hookGithub(options, user);
  }
  if (user.services.linkedin) {
    return hookLinkedin(options, user);
  }
  user.profile = options.profile || {};

  userEdit = {
    username: options.username.split(' ').join('_'),
    profile:{
      front_name: options.username.split(' ').join('_'),
    },
    extra:{
      front_name_cap: options.username.split(' ').join('_').toUpperCase(),
    }
  };
  _.extend(user, userEdit);

  // // set admin for first user
  if (!Meteor.users.findOne()) {
    user.isAdmin = true;
  }
  return user;
});

Accounts.validateNewUser(function(user){
  return checkUniqueFields(user);
});

function checkUniqueFields(user){
  var find = {};
  for(i in uniqueField.users){
    field = uniqueField.users[i];
    value = take.a(field).from(user);
    find[field] = value;
    if(Meteor.users.findOne(find)){
      throw new Meteor.Error(1, "An account with the same name already exists, you might already have an account");
    }
  }
  return true;
}