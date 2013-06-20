
// To make the function global either add this in front of the function reference or just dont add var
// this.create or create
user_exists = function(userId) {
  userId = userId || Session.get('userId');
  // !![] would return true so it's converted to string then to boolean
  return !!Meteor.users.find({'_id': userId}).fetch().join('');
}

get_user = function(userId) {
  userId = userId || Session.get('userId');
  return Meteor.users.find({'_id': userId}).fetch();
}
Template.authTabs.events({
  'click #authTab a': function(event) {
    var self = event.currentTarget;
    event.preventDefault();
    $(self).tab('show');
  }
})
Template.notification.events({
  'click .close': function(event) {
    var self = event.currentTarget;
    $(self).closest('.alert').removeClass('puffIn').addClass('puffOut');
    return false;
  }
})
Template.sign_up.events({
  'submit #sign_up_form': function(event) {
    var self = event.currentTarget;
    var datas = $(self).serializeArray(),
    newObj = {};
    event.preventDefault();
    for(i in datas){
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
        message:'We also have logged you in, isn\'t it wonderful?!',
        type:'success',
        lifetime:10
      })
      }
    })
  }
});

hasEmptyValue = function(obj){
  for(i in obj){
    if(obj[i] === '') return true;
  }
  return false;
}

// obj = {message, title, type, lifetime}, lifetime is in second
openAlert = function(obj){
  $('.alert').find('.alert-heading').html(obj.title).end()
  .find('.message')
  .html(obj.message).end()
  .removeClass('puffOut hide alert-error alert-success alert-info')
  .addClass('magictime puffIn alert-'+obj.type);

  if(obj.lifetime){
    setTimeout(closeAlert, obj.lifetime*1000)
  }
}

closeAlert = function(){
  $('.alert .close').closest('.alert').removeClass('puffIn').addClass('puffOut');
}

