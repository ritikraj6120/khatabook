const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	title: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		default: 0,
	},
	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('customers', CustomerSchema);