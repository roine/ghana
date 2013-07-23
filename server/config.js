Accounts.loginServiceConfiguration.remove({service: "github"});
Accounts.loginServiceConfiguration.remove({service: "facebook"});
Accounts.loginServiceConfiguration.remove({service: "twitter"});
Accounts.loginServiceConfiguration.remove({service: "linkedin"});
Accounts.loginServiceConfiguration.remove({service: "google"});
Accounts.loginServiceConfiguration.insert({
  service: "github",
  clientId: "baf393d9ec3ac35f7a51",
  secret: "be5936cf92e45ca03a6b4e51268351d5c3cf04bd"
});

Accounts.loginServiceConfiguration.insert({
  service: "facebook",
  appId: "307093362761576",
  secret: "d557fd052d1d588a8f1e6ebaa3dbd33b"
});

Accounts.loginServiceConfiguration.insert({
  service: "twitter",
  consumerKey: "3VBen9hRvLNQBczHderqdQ",
  secret: "n7H00jY4CqFSDJXRn90loicdLNhPjZ6sjksu8zX0"
});

Accounts.loginServiceConfiguration.insert({
  service: "linkedin",
  clientId: "pnrqika220xl",
  secret: "fvEweCzdNypJ1C2I"
});

Accounts.loginServiceConfiguration.insert({
  service: "google",
  clientId: "761194929203.apps.googleusercontent.com",
  secret: "66RxQ_LnEnPh0jZfipDPkwEc"
});
