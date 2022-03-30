const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierNetBalanceSchema = new Schema({
	supplier: {
		type: Schema.Types.ObjectId,
		ref: 'suppliers'
	},
	payment:{
		type:Number,
		default:0
	},
	purchase:{
		type:Number,
		default:0
	}
});

module.exports = mongoose.model('supplierNetBalance', supplierNetBalanceSchema);