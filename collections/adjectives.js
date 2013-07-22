Adjectives = new Meteor.Collection("adjectives");

Adjectives.allow({
  insert:function(){return false;},
  update:function(){return false;},
  remove:function(){return false;}
});


