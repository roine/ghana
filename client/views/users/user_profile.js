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
  },
  clean: function(data) {
    return data.split('_').join(" ");
  }
};

Template.user_profile.helpers(helpers);
Template.user_profile_edit.helpers(helpers);

var events = {
  'load img': function(){
    $('.edit').show();
  },
  'mouseover .personal_info': function() {
    if(Template.user_profile._tmpl_data.helpers.isCurrentUser() || isAdmin(Meteor.userId())){
      $('.edit').css('top', 0);
    }
  },
  'mouseout .personal_info': function() {
    $('.edit').css('top', -$('.edit').outerHeight());
  },
  'hidden [data-type=wysihtml5]': function(e) {
    $('.left-sidebar').toggleClass('span3 span4');
    $('.content').toggleClass('span9 span9');
  }
};
var events_view = $.extend({}, {
  'click .edit': function(){
    Meteor.Router.to(Meteor.Router.userProfileEditPath(Meteor.users.find(Session.get('id')).fetch()[0].profile.front_name));
  }
},events);

var events_edit = $.extend({}, {
  'click .edit': function(){
    Meteor.Router.to(Meteor.Router.userProfilePath(Meteor.users.find(Session.get('id')).fetch()[0].profile.front_name));
  },
  'click #removeAccount': function(){
    openAlert({
      title:"You are going to remove your account",
      message:"Wait!!! If you remove your account everything will be lost forever!<br /><a href='#' class='btn closeAlert'>Do nothing</a> <a class='btn btn-danger deleteAccount' href='#'>Delete my account</a>",
      lifetime:30000
    });
  }
}, events);
Template.user_profile.events(events_view);
Template.user_profile_edit.events(events_edit);

// Handlebars.registerPartial("profile_partial", $("#profile_partial").html());
Template.user_profile.rendered =  function () {
  $('.edit').css('top', -$('.edit').outerHeight());
};

Template.user_profile_edit.rendered = function(){
  // nothing worked for live dom event
  $('body').on('click', '.closeAlert', function(){
    closeAlert();
    return false;
  });
  $('body').on('click', '.deleteAccount', function(){
    Meteor.users.remove(Session.get('id'), function(error){
      if(error) {
        openAlert({
          title:'Error',
          message: 'Could not delete your account due to error #'+error.error+': '+error.message,
          lifetime:10
        });
        return false;
      }
      closeAlert();
      Meteor.logout();
      Meteor.Router.to(Meteor.Router.homepagePath());
      openAlert({
        title:'Adios Amigo',
        message:'You successfuly left us all alone, Congrats!',
        lifetime:5
      });
    });
    return false;
  });

  $('.edit').css('top', -$('.edit').outerHeight());

  $('.editable').tooltip({
    placement:'top'
  });
  $('#feelings').editable({
    success:updateProfile,
    placement:'right',
    source: function(){
      if(!Adjectives.findOne()) return;
      return Adjectives.findOne().text;
    }
  });
  $('.editable').editable({success:updateProfile, placement:'right'});
  $('.editable.url').editable('option', 'validate', isValidURL);
};

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
  Meteor.users.update(Session.get('id'), {$set:update}, user_updated);
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
  Meteor.Router.to(Meteor.Router.userProfileEditPath(Meteor.users.findOne(Session.get('id')).profile.front_name));
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
