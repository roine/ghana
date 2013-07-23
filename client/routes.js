
Meteor.Router.add({
  '/': {
    as:'homepage',
    to: function(){
      addClass('homepage');
      return 'homepage';
    }
  },
  '/sign_in': function(){
    addClass('sign_in');
    return 'sign_in';
  },
  '/sign_up': function(){
    addClass('sign_up');
    return 'sign_up';
  },
  '/:userId': {
    as: 'userProfile',
    to: function(slug) {
      if(Meteor.users.findOne({'profile.front_name':slug})){
        Session.set('slug', slug);
        Session.set('id', Meteor.users.findOne({'profile.front_name':slug})._id)
        addClass('user_profile');
        return 'user_profile';
      }
      return 'not_found';

    }
  },
  '/:userId/edit': {
    as: 'userProfileEdit',
    to: function(slug){
      if(!Meteor.users.findOne({'profile.front_name':slug})){
        return 'not_found';
      }
      if(Meteor.users.findOne({'profile.front_name':slug})._id === Meteor.userId() || isAdmin(Meteor.userId())){
        Session.set('slug', slug);
        Session.set('id', Meteor.users.findOne({'profile.front_name':slug})._id)
        addClass('user_profile_edit');
        return 'user_profile_edit';
      }
      addClass('no_right');
      return 'no_right';
    }
  }
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
  },
  'checkLoggedOut': function(page){
    if(Meteor.user()){
      return 'not_found';
    }
    return page;
  }
});

Meteor.Router.filter('checkLoggedIn', {only: 'homepage'});
Meteor.Router.filter('checkLoggedOut', {only:['sign_in', 'sign_up']})


