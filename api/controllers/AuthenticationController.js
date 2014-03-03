/**
 * AuthenticationController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
 var hat = require('hat');

module.exports = {
	token: function(req, res) {
		User.findOne(req.user.id).done(function(err, user) {
			var tokenObject = {
				access_token: hat(256),
				token_type: 'bearer',
				expires_in: 3600,
				refresh_token: hat(256)
			}
			user.accessToken = tokenObject.access_token;
			user.refreshToken = tokenObject.refresh_token;

			user.save(function(err) {
		    	// value has been saved
		    	res.json(tokenObject);
			});
		});
	}
};
