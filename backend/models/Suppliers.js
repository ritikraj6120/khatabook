const mongoose = require('mongoose');
const { Schema } = mongoose;

const SupplierSchema = new Schema({
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
	purchase: {
		type: Number,
		default: 0,
	},
	payment:{
		type: Number,
		default: 0,
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('suppliers', SupplierSchema);