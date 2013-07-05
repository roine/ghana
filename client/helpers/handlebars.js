Handlebars.registerHelper('dateToString', function(date, pattern){
  // from millisecond to second
  if(typeof pattern === "string"){
   return moment.unix(Meteor.users.findOne().profile.createdAt/1000).format(pattern);
 }
 return moment.unix(Meteor.users.findOne().profile.createdAt/1000).fromNow();

});

Handlebars.registerHelper('isEditingMode', function(data){
  if($('.view-user_profile_edit').length) return true;
  console.log(data)
  if(data) return true;

  if(typeof data === 'object') return false;
  return false;
});

Handlebars.registerHelper('url', function(url){
  if(!url) return;
  if(!~url.indexOf('://')){
    return 'http://'+url;
  }
});

Handlebars.registerHelper('textarea', function(text){
  text = text.toString();
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(text);
})