// arguments[0] should be either an ID or a user
isAdmin = function() {
  if(arguments[0] === undefined || !arguments[0]) return false;

  if(typeof arguments[0] === 'string') {
    return !!Meteor.users.findOne({_id:arguments[0]}) && !!Meteor.users.findOne({_id:arguments[0]}).isAdmin;
  }
  return arguments[0].isAdmin;
}
// either the user is admin OR the doc is own by the user OR it's testing mode
canI = function(userId, doc) {
  return isAdmin(userId) || doc._id && doc._id === userId || mocha;
}