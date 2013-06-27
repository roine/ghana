Handlebars.registerHelper('dateToString', function(date, pattern){
  // from millisecond to second
  if(typeof pattern === "string"){
     return moment.unix(Meteor.users.findOne().profile.createdAt/1000).format(pattern);
  }
   return moment.unix(Meteor.users.findOne().profile.createdAt/1000).fromNow();

})