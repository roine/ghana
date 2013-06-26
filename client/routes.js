
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

function addClass(view){
  $('body').removeClass(function(index, classes){
    var regex = /\bview-\w+/gi;
    return classes.match(regex) && classes.match(regex).join(' ');
  })
  .addClass('view-'+view);
  addActive(view)
}

function addActive(view){
  $('.nav li').removeClass('active');
  $('.nav [data-view='+view+']').addClass('active');
}

