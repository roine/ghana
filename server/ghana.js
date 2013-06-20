Meteor.methods({
  user_exists: function(){
    userId = userId || Session.get('userId');
    // !![] would return true so it's converted to string then to boolean
    return !!Meteor.users.find({'_id': userId}).fetch().join('');
  }
})