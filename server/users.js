Accounts.config({
  sendVerificationEmail: false
});

function hookGithub(options, user) {
  user.profile = {};
  try {
    user.username = user.services.github.username;
    user.emails = [];
    user.emails.push({
      address: user.services.github.email,
      verified: true
    });
    user.profile.real_name = options.profile.name;
    user.profile.front_name = options.profile.name.split(' ').join('_');
  } catch (e) {}
  checkUniqueFields(user);
  return user;
}

function hookLinkedin(options, user) {
  try {
    user = {
      username: options.profile.firstName.toLowerCase(),
      emails: [{
        address: options.profile.emailAddress,
        verified: true
      }],
      profile: {
        real_name: options.profile.firstName + ' ' + options.profile.lastName,
        front_name: options.profile.firstName + '_' + options.profile.lastName.split(' ').join('_'),
        picture: options.profile.pictureUrl,
        website: options.profile.publicProfileUrl,
        location: options.profile.location.name
      },
      extra: {
        languages: take.each('language.name').from(options.profile.languages.values),
        skills: take.each('skill.name').from(options.profile.skills.values)
      }
    }
  } catch (e) {console.log(e)}
  checkUniqueFields(user);

  return user;
}

function checkUniqueFields(user){
  console.log(uniqueField)
  for(i in uniqueField.users){
    field = uniqueField.users[i];
    value = take.a(field).from(user);
    console.log(field)
    console.log(value)
  }
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
  user.profile.points = 0;

  if (!options.username)
    options.username = options.profile.name
  if (options.username && !user.profile.front_name) {
    // http://stackoverflow.com/questions/441018/replacing-spaces-with-underscores-in-javascript
    user.profile.front_name = options.username.split(' ').join('_');
  }

  // // set admin for first user
  if (!Meteor.users.findOne()) {
    user.isAdmin = true;
  }
  return user;
});