Handlebars.registerHelper('dateToString', function(date, pattern){
  // from millisecond to second
  if(typeof pattern === "string"){
   return moment.unix(Meteor.users.findOne().profile.createdAt/1000).format(pattern);
 }
 return moment.unix(Meteor.users.findOne().profile.createdAt/1000).fromNow();

});

Handlebars.registerHelper('isEditingMode', function(data){
  return $('.view-user_profile_edit').length || data
});

Handlebars.registerHelper('url', function(url){
  if(!url) return;
  if(!~url.indexOf('://')){
    return 'http://'+url;
  }
})