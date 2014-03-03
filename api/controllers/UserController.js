/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	me: function(req, res) {
		User.findOne(req.user.id).then(function(user) {
			return res.json(user);
		});
	}
};
