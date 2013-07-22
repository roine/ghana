Meteor.users.allow({
  insert:function(){return true;},
  update:function(userId, doc){
    return isAdmin(userId) || doc._id && doc._id === userId;
  },
  remove:function(userId, doc){
    return isAdmin(userId) || doc._id && doc._id === userId;
  }
});

