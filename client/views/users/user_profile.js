'use strict';

var helpers = {
  user:function(){
    var user = Meteor.users.find({'profile.front_name':Session.get('slug')}).fetch();
    // is not an empty array
    if(!isFinite(user)){
      return user[0];
    }
  },
  isCurrentUser: function(){
    if(!Template.user_profile._tmpl_data.helpers.user()) return false;
    return Template.user_profile._tmpl_data.helpers.user()._id === Meteor.userId();
  }
}

Template.user_profile.helpers(helpers);
Template.user_profile_edit.helpers(helpers);

var events = {
  'load img': function(){
    $('.edit').show();
  },
  'mouseover .personal_info': function() {
    if(Template.user_profile._tmpl_data.helpers.isCurrentUser()){
      $('.edit').css('top', 0);
    }
  },
  'mouseout .personal_info': function() {
    $('.edit').css('top', -$('.edit').outerHeight());
  },
  'hidden [data-type=wysihtml5]': function(e) {
    $('.left-sidebar').toggleClass('span3 span4');
    $('.content').toggleClass('span9 span9')
  }
};
var events_view = $.extend({}, {
  'click .edit': function(){
    Meteor.Router.to('/'+Meteor.user().profile.front_name+'/edit');
  }
},events);

var events_edit = $.extend({}, {
  'click .edit': function(){
    Meteor.Router.to('/'+Meteor.user().profile.front_name);
  }
}, events)
Template.user_profile.events(events_view);
Template.user_profile_edit.events(events_edit);

// Handlebars.registerPartial("profile_partial", $("#profile_partial").html());
Template.user_profile.rendered =  function () {
  $('.edit').css('top', -$('.edit').outerHeight());
};

Template.user_profile_edit.rendered = function(){
  Meteor.subscribe('adjectives');

  $('.edit').css('top', -$('.edit').outerHeight());
  $('.editable').tooltip({
    placement:'top'
  })
  $('#feelings').editable({
    success:updateProfile,
    placement:'right',
    source: function(){
      var adj = new Meteor.Collection("adjectives");
      return adj.findOne().text;
    }
  });
  $('.editable').editable({success:updateProfile, placement:'right'});
  $('.editable.url').editable('option', 'validate', isValidURL);


}

function updateProfile(e, newValue){
  var name = $(this).data('name');
  var update = {};
  update[name] = newValue;

  // uniqueField is set in lib/collections.js
  if(~$.inArray(name, uniqueField.users)){

    if(Meteor.users.find(update).count()){
      openAlert({
        title: 'Error',
        message: 'User already exists!',
        type: 'error'
      });
      return false;
    }
  }
  Meteor.users.update(Meteor.userId(), {$set:update}, user_updated);
  return newValue;
}

function user_updated(error, result){
  if(error){
    openAlert({
      title: 'Error ',
      message: error.reason,
      type: 'error',
      lifetime:10
    });
  }
  else{
    openAlert({
      title: 'Success',
      message: 'You successfuly updated your profile!',
      type: 'success'
    });
  }

  Meteor.Router.to('/'+Meteor.user().profile.front_name+'/edit');
}

function isValidURL(url){
  // also allow no url
  if(!url) return;
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(url)) return 'please enter a valid URL';
}
