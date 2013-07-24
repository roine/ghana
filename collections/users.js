Meteor.users.allow({
  insert: function() {
    return true;
  },
  update: canI,
  remove: canI
});
