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
    for(var i in datas){
      newObj[datas[i].name] = datas[i].value;
    }

    if(hasEmptyValue(newObj)) {
      openAlert({
        title:'Error mate!',
        message:'You didn\'t fill the form correctly, one or more fields are empty!',
        type:'error',
        lifetime:5
      })
      return;
    }

    Accounts.createUser({
      username: newObj.username,
      email: newObj.email,
      password: newObj.password
    }, function(error){
      if(error){
        alert(error.reason)
      }
      else{
        openAlert({
          title:'You successfuly subscribed!',
          message:'We also have logged you in, isn\'t it wonderful?! Took us '+pluralize(Math.round(Math.random()*10), 'engineer'),
          type:'success',
          lifetime:10
        })
      }
    })
  }
});

Template.sign_in.events({
  'submit #sign_in_form': function() {

    var self = event.currentTarget;
    var datas = $(self).serializeArray(),
    newObj = {};
    event.preventDefault();
    for(var i in datas){
      newObj[datas[i].name] = datas[i].value;
    }
    Meteor.loginWithPassword(newObj.id, newObj.password, function(e){
      if(e){
        alert(e.message)
      }
      else{
        Meteor.Router.to('/'+Meteor.user().profile.front_name);
      }
    })
  }
})