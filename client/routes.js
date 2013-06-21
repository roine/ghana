
Meteor.Router.add({
  '/': 'homepage',
  '/:userId': {
    to: 'user_profile',
    and: function(slug) {
      Session.set('slug', slug);
      return 'user_profile';
    }
  },
  'sign_in': 'sign_in',
  //  not found at the end
  '*': function(){
    Session.set('type', 'Page');
    return 'not_found';
  },
});

Meteor.Router.filters({
  'checkLoggedIn': function(page) {
    if (Meteor.loggingIn()) {
      return 'loading';
    } else if (Meteor.user()) {
      return page;
    } else {
      return 'authTabs';
    }
  }
});

Meteor.Router.filter('checkLoggedIn', {only: 'homepage'});
