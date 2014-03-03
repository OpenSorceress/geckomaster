var passport = require('passport')
  , BearerStrategy = require('passport-http-bearer').Strategy
  , ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;

/**
 * OAuth2 Bearer
 **/
passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ accessToken: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: '*' });
    });
  }
));

/**
 * OAuth2 Client-Password
 **/
passport.use(new ClientPasswordStrategy(
  function(clientId, clientSecret, done) {
    User.findOne({ email: clientId }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != clientSecret) { return done(null, false); }
      return done(null, user);
    });
  }
));