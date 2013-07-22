=======
ghana
=====
##Resources

 - https://github.com/paulkinzett/toolbar (A tooltip style toolbar jQuery plugin)
 - http://vitalets.github.io/x-editable/ (in-place editing with Twitter Bootstrap, jQuery UI or pure jQuery)
 - https://github.com/mad-eye/meteor-mocha-web (testing with mocha and meteor + chai)
 - https://github.com/tmeasday/meteor-router (routes)

##Maybe Resources

 - https://github.com/jakiestfu/Snap.js
 - https://github.com/viljamis/responsive-nav.js
 - https://github.com/lokesh/color-thief
 - https://github.com/webpop/jquery.pin
 - https://github.com/damirfoy/iCheck
 - http://sandglaz.github.io/bootstrap-tagautocomplete/
 - https://github.com/usablica/intro.js
 - https://github.com/miniMAC/magic (CSS3 Animations with special effects)
 - https://github.com/madrobby/keymaster (A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.)


##Roadmap

[trello](https://trello.com/board/ghana/51c429250f27db512d0024cd)

## DOC


    var option = {
      title:'',
      message:'',
      type:'info', // error, success, warning, info
      lifetime:3 // time in second before to collapse the alert
    }
    openAlert(options);


###Handlebarsjs helpers

####dateToString


Arguments | Type | Required | Default | Note
------|-----|-----|-----|----
Timestamp | String/Integer | Yes |  | The timestamp must be in millisecond (13 chars)
Date format | String | No | Will return a length date between now and the defined date | see [doc](http://momentjs.com/docs/)
Example:

    {{dateToString user.created_at}} // 6 days ago
    {{dateToString user.created_at 'YYYY'}} // 2013