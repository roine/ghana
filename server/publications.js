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

Meteor.users.allow({
  remove:function(userId, doc) { return userId === doc._id }
});
