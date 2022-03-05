const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerNetBalanceSchema = new Schema({
customer: {
	type: Schema.Types.ObjectId,
	ref: 'customer'
},
amounttoget:{
	type:Number,
	default:0
},
amounttogive:{
	type:Number,
	default:0
}
});

module.exports = mongoose.model('customerNetBalance', customerNetBalanceSchema);