

/*
 * Events
 *
 */

Template.authTabs.events({
  'click #authTab a': function(event) {
    var self = event.currentTarget;
    event.preventDefault();
    $(self).tab('show');
  }
});

Template.sign_up.events({
  'submit #sign_up_form': function(event) {
    var self = event.currentTarget;
    var datas = $(self).serializeArray(),
      newObj = {};
    event.preventDefault();
    for (var i in datas) {
      newObj[datas[i].name] = datas[i].value;
    }

    if (hasEmptyValue(newObj)) {
      openAlert({
        title: 'Error mate!',
        message: 'You didn\'t fill the form correctly, one or more fields are empty!',
        type: 'error',
        lifetime: 5
      });
      return;
    }

    Accounts.createUser({
      username: newObj.username,
      email: newObj.email,
      password: newObj.password
    }, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        openAlert({
          title: 'You successfuly subscribed!',
          message: 'We also have logged you in, isn\'t it wonderful?! Took us ' + pluralize(Math.round(Math.random() * 10), 'engineer'),
          type: 'success',
          lifetime: 10
        });
        Meteor.Router.to(Meteor.Router.userProfilePath(Meteor.user().profile.front_name));
      }
    });
  }
});

Template.sign_in.events({
  'submit #sign_in_form': function() {

    var self = event.currentTarget;
    var datas = $(self).serializeArray(),
      newObj = {};
    event.preventDefault();
    for (var i in datas) {
      newObj[datas[i].name] = datas[i].value;
    }
    Meteor.loginWithPassword(newObj.id, newObj.password, function(e) {
      if (e) {
        openAlert({
          title: 'Error',
          message: e.message,
          type: 'error'
        });
      } else {
        Meteor.Router.to(Meteor.Router.userProfilePath(Meteor.user().profile.front_name));
        openAlert({
          title: 'Bonjour',
          message: 'Hey, welcome back ' + capitalize(Meteor.user().profile.front_name) + '!'
        });
      }
    });
  },
  'click .login-facebook': function() {
    Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, oAuthCallback);
  },
  'click .login-google': function() {
    Meteor.loginWithGoogle({}, oAuthCallback);
  },
  'click .login-github': function() {
    Meteor.loginWithGithub({
      requestPermissions: ['user:email']
    }, oAuthCallback);
  },
  "click .login-twitter": function() {
    Meteor.loginWithTwitter({}, oAuthCallback);
  },
  'click .login-linkedin': function() {
    Meteor.loginWithLinkedin({}, oAuthCallback);
  }
});
/*
 * Helpers
 *
 */
Template.explore.helpers({
  users: function() {
    return Meteor.users.find({}, {
      sort: {
        createdAt: -1
      }
    }).fetch();
  },
  hasUsers: function() {
    return !!Meteor.users.findOne();
  }
});

function oAuthCallback(err) {
  if (err) {
    Session.set('errorMessage', err.reason || 'Unknown error');
    openAlert({
      title: 'error',
      message: err.reason,
      type: 'error'
    });
  } else {
    Meteor.Router.to(Meteor.Router.userProfilePath(Meteor.user().profile.front_name));
  }
}