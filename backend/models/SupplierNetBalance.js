const mongoose = require('mongoose');
const { Schema } = mongoose;

const supplierNetBalanceSchema = new Schema({
customer: {
	type: Schema.Types.ObjectId,
	ref: 'customer'
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