Handlebars.registerHelper('dateToString', function(date, pattern){
  // from millisecond to second
  if(typeof pattern === "string"){
    return moment.unix(date/1000).format(pattern);
  }
  return moment.unix(date/1000).fromNow();

});

Handlebars.registerHelper('isEditingMode', function(data){
  if(Meteor.Router.page() === 'user_profile_edit') return true;

  if(typeof data === 'object') return false;

  if(data) return true;

  return false;
});

Handlebars.registerHelper('aOrAn', function(data){
  if(!data) return;

  if(~'a e i o u'.split(' ').indexOf(data[0])){
    if(data[1] === ' ' || (data[2] === 'n' && data[3] === ' ')){
      return data;
    }
    return 'an '+data;
  }

  return 'a '+data
});

Handlebars.registerHelper('url', function(url){
  if(!url) return;
  if(!~url.indexOf('://')){
    return 'http://'+url;
  }
});

Handlebars.registerHelper('textarea', function(text){
  if(!text) return;
  text = text.toString();
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(text);
});

Handlebars.registerHelper('test', function(){
  if(typeof mocha === 'undefined')
    return false;
  return true;
})