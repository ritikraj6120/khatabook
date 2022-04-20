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
		unique:true
	},
	phone:{
		type:Number,
		required:true,
		min: 100, max: 99999999999
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('suppliers', SupplierSchema);