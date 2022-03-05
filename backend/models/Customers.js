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
		unique:true
	},
	phone:{
		type:Number,
		required:true,
		min: 9, max: 111111111111
	},
	date: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('customers', CustomerSchema);