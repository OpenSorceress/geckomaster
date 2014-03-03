/**
 * TransactionController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
 var _ = require('lodash');

module.exports = {
	find: function(req, res) {
		Transaction.find()
		.sort({ updatedAt: 'desc' })
		.populate('to')
		.populate('from')
		.exec(function(err, transactions) {
		  if(err) { return res.send(err); } // handle error
		  return res.json(transactions);
		});
	},

	update: function(req, res) {
		Transaction.findOne(req.params.id).then(function(currentTransaction) {
			var comment = {};

			comment.author    = req.user.id;
			comment.name      = req.user.firstName + ' ' + req.user.lastName;
			comment.comment   = req.body.comment;
			comment.createdAt = Date.now();

			if(!_.isArray(currentTransaction.conversation)) {
				currentTransaction.conversation = [];
			}

			currentTransaction.conversation.unshift(comment);

			currentTransaction.save(function(err, savedTransaction) {
				if (err) { return res.serverError(err); }
				
				Transaction.publishUpdate(savedTransaction.id, comment);
				console.log('Message should have been published');
				return res.json(savedTransaction);
			});
		});
	},

	subscribe: function(req, res) {
		console.log('You hit subscribe!!!');
		User.find()
		.where({ from: req.user.id })
		.where({ to: req.user.id })
		.exec(function(err, transactions) {
			if(err) { return res.send(err); } // handle error

			Transaction.subscribe(req, transactions);
			return res.json({message: 'something to return'});
		});
	}
};
