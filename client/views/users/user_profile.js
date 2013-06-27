
function updateProfile(response, newValue){


}

Template.user_profile.helpers({
  user:function() {
    var user = Meteor.users.find({'profile.front_name':Session.get('slug')}).fetch();
    // is an empty array
    if(!isFinite(user))
     return user[0];
 },
 isCurrentUser: function() {
  if(!Template.user_profile._tmpl_data.helpers.user()) return false;
  return Template.user_profile._tmpl_data.helpers.user()._id === Meteor.userId();
}
});

Template.user_profile.events({
  'mouseover .personal_info': function() {
    if(Template.user_profile._tmpl_data.helpers.isCurrentUser()){
      $('.edit').css('top', 0);
    }
  },
  'mouseout .personal_info': function() {
    var h = $('.edit').outerHeight();
    $('.edit').css('top', -h);
  },
  'click .edit': function(event) {
    /* edit mode */
    if($('.view-user_profile_edit').length){
      $(event.currentTarget).text('Edit Profile');
      Meteor.Router.to('/'+Meteor.user().profile.front_name);
      $('.editable').editable('disable', true);
    }
    /* read mode */
    else{
      $(event.currentTarget).text('Finish Editing');
      Meteor.Router.to('/'+Meteor.user().profile.front_name+'/edit');
      $('.editable').editable('enable',true).editable({success: updateProfile});
    }


  },
  // make sure the edit button does not appear on image loading
  'load img': function(){
    $('.edit').show();
  }
});

Template.user_profile.rendered = function () {
  var h = $('.edit').outerHeight();
  $('.edit').css('top', -h);

  if($('.view-user_profile_edit').length){
    $('.edit').text('Finish Editing');
    $('.editable').editable({success:updateProfile});
  }
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
  Meteor.users.update(Meteor.userId(), {$set:update}, function(){
    openAlert({
        title: 'Success',
        message: 'You successfuly updated your profile!',
        type: 'success'
      });
    Meteor.Router.to('/'+newValue+'/edit')
  })
}

