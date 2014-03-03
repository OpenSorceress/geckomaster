/**
 * bearerAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to authenticate requests with OAuth2 access tokens
 *                 Assumes you have successfully hit the /token endpoint and are in possession of a valid access token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var passport = require('passport');

module.exports = function(req, res, next) {
	if (req.isSocket){
		User.findOne({ accessToken: req.socket.handshake.token }, function (err, user) {
	    	if (err) { return next(err); }
	    	if (user) {
	    		req.user = user;
	    		return next();
	    	}

	    	return res.send(403, {message: "You are not permitted to perform this action."});
	    });
	} else {
		passport.authenticate('bearer', {session: false}, function(err, user, info) {
	    	if (err) return next(err);
	    	if (user) {
	    		req.user = user;    		
	    		return next();
	    	}

	    	return res.send(403, {message: "You are not permitted to perform this action."});
		})(req, res);
	}
	
};
