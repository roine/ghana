
Meteor.Router.add({
  '/': 'homepage',
  '/:userId': {
    to: 'user_profile',
    and: function(userId) {
      Session.set('userId', userId);
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
  userExists: function(page) {
    if( user_exists() ){
      return page;
    }
    else{
      Session.set('type', 'User');
      return 'not_found';
    }
  },
  loggedIn: function(page){
    if(Meteor.user()){
      return page;
    }
    else{
      return 'sign_in';
    }
  }
});

Meteor.Router.filter('userExists', { only: 'user_profile' });
