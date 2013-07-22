// arguments[0] should be either an ID or a user
isAdmin = function() {
  if(arguments[0] === undefined || !arguments[0]) return false;

  if(typeof arguments[0] === 'string') {
    return !!Meteor.users.findOne({_id:arguments[0]}) && !!Meteor.users.findOne({_id:arguments[0]}).isAdmin;
  }
  return arguments[0].isAdmin;
}

