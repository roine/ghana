
Meteor.Router.add({
  '/': function(){
    addClass('homepage');
    return 'homepage';
  },
  '/:userId': {
    to: 'user_profile',
    and: function(slug) {
      Session.set('slug', slug);
      addClass('user_profile');
      return 'user_profile';
    }
  },
  '/:userId/edit':  function(slug){
    if(Meteor.users.findOne({'profile.front_name':slug})._id === Meteor.userId()){
      Session.set('slug', slug);
      addClass('user_profile_edit');
      return 'user_profile_edit';
    }
    else if(!Meteor.users.findOne({'profile.front_name':slug})){
      return 'not_found';
    }
    else{
      addClass('no_right');
      return 'no_right';
    }

  },
  'sign_in': function(){
    addClass('sign_in');
    return 'sign_in';
  },
  //  not found at the end
  '*': function(){
    Session.set('type', 'Page');
    addClass('no_found');
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


