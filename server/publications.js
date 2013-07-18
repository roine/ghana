Meteor.publish("adjectives", function () {
  return Adjectives.find({});
});

Meteor.startup(function(){
  Adjectives.allow({
    insert:function(){return false;},
    update:function(){return false;},
    remove:function(){return false;}
  });
})


Meteor.publish('allUsersButAdmin', function(){
  return Meteor.users.find({isAdmin:{$ne:true}});
});
Meteor.publish('allAdmin', function(){
  return Meteor.users.find({isAdmin:true});
})
Meteor.users.allow({
  remove:function(userId, doc) { return userId === doc._id }
});
