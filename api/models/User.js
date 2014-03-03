/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {
		firstName: {
			type: 'STRING'
		},
		lastName: {
			type: 'STRING'
		},
		email: {
			type: 'STRING'
		},
		password: {
			type: 'STRING'
		},
		accessToken: {
			type: 'STRING'
		},
		refreshToken: {
			type: 'STRING'
		}
	}

};
