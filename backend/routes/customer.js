const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Customers = require('../models/Customers');
const CustomerTransactions = require('../models/CustomerTransactions')
const customerNetBalance = require('../models/CustomerNetBalance');
const { body, validationResult } = require('express-validator');


// ROUTE 1: Get All the Customers using: GET "/api/customer/getcustomers". Login required
router.get('/getcustomers', fetchuser, async (req, res) => {
	try {
		const customers = await Customers.find({ user: req.user.id }).select('-user -date');
		res.json(customers)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// ROUTE 2: Add a new Customer using: GET "/api/customer/addcustomers". Login required
router.post('/addcustomer', fetchuser, async (req, res) => {
	try {
		let { title, name, phone } = req.body;

		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
		const customer = new Customers({
			title, name, phone, user: req.user.id
		})
		const rep = await Customers.findOne({ name });
		console.log(rep)
		if (!rep) {
			let savedCustomer = await customer.save();
			console.log(savedCustomer);
			res.status(200).json(savedCustomer);
		}
		else {
			res.status(409).json({ "danger": "Customer already exist" })
		}


	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 3: Update an existing customer using: PUT "/api/customer/updatecustomers". Login required
router.put('/updatecustomer/:id', fetchuser, async (req, res) => {
	const { title, name, phone } = req.body;
	try {
		// Create a newNote object
		const newCustomer = {};
		if (title) { newCustomer.title = title };
		if (name) { newCustomer.name = name };
		if (phone) { newCustomer.phone = phone };
		console.log(title, name, phone);
		// Find the note to be updated and update it
		let customer = await Customers.findById(req.params.id);
		if (!customer) { return res.status(404).send("Not Found") }

		if (customer.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		const updateCustomer = await Customers.findByIdAndUpdate(req.params.id, { $set: newCustomer }, { new: true })
		res.status(200).json(updateCustomer);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// ROUTE 4: Delete an existing Customer using: DELETE "/api/customer/deletecustomers". Login required
router.delete('/deletecustomer/:id', fetchuser, async (req, res) => {
	try {
		let id=req.params.id;
		// Find the customer to be delete and delete it
		let customer = await Customers.findById(id);

		if (!customer) { return res.status(404).send("Not Found") }

		// Allow deletion only if user owns this customer
		if (customer.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		
		let deletedcustomer = await Customers.findByIdAndDelete(id);
		await CustomerTransactions.deleteMany({ customer:id });
		await customerNetBalance.deleteMany({ customer: id });
		res.json({ "Success": "customer has been deleted", customer: deletedcustomer });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// Route 5 Get single customer using : get "/api/customer/getSingleCustomer". login required
router.get('/getSingleCustomerDetail/:id', fetchuser, async (req, res) => {
	try {
		let customer = await Customers.findById(req.params.id);
		if (!customer) { return res.status(404).send("Not Found") }

		if (customer.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		const getSingleCustomer = customer;
		res.status(200).json(getSingleCustomer);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// Route 6:fetch transaction  using: get "/api/customer/getCustomerTransactions/". Login required
router.get('/getCustomerTransactions/:id', fetchuser, async (req, res) => {
	try {
		let customer = await Customers.findById(req.params.id);
		if (!customer) { return res.status(404).send("Not much Found") }

		if (customer.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		let customerTransactions = await CustomerTransactions.find({ customer: req.params.id });
		return res.status(200).json(customerTransactions);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// Route 7: add a transaction  using: post "/api/customer/addCustomerTransaction/". Login required
router.post('/addCustomerTransaction/:id', fetchuser, async (req, res) => {
	try {
		let customer = await Customers.findById(req.params.id);

		if (!customer) { return res.status(404).send("Customer Not Found") }

		if (customer.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		const { lendamount_singleCustomer, takeamount_singleCustomer } = req.body;

		try {

			let amounttoget = 0, amounttogive = 0;
			if (lendamount_singleCustomer > 0) {
				amounttoget = amounttoget + lendamount_singleCustomer;
			}
			else {
				amounttogive = amounttogive + takeamount_singleCustomer;
			}


			
			
			const newCustomerNetBalance = new customerNetBalance({
				amounttoget, amounttogive, customer: req.params.id
			})
			const rep = await customerNetBalance.findOne({ customer: req.params.id });
			if (!rep) {
				let doc = await newCustomerNetBalance.save();
			}
			else {
				let ans=await customerNetBalance.findOne({customer: req.params.id});
				amounttoget= amounttoget + ans.amounttoget;
				amounttogive += ans.amounttogive;
				let doc = await customerNetBalance.findOneAndUpdate({ customer: req.params.id }, {$set: {amounttoget:amounttoget,amounttogive:amounttogive}}, { new: true });
			}
		}
		catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
		///////////////////////////////////////////////////////////////////////////
		let newCustomertransaction = new CustomerTransactions({
			lendamount_singleCustomer, takeamount_singleCustomer, customer: req.params.id
		})

		try {
			let doc = await newCustomertransaction.save();
			res.status(200).json(doc);

		}
		catch (error) {
			console.error(error.message);
			res.status(500).send("Internal Server Error");
		}
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
});

// ROUTE 8: Update an existing customerTransaction  using: PUT "/api/customer/updatetransactions". Login required

router.put('/updateCustomerTransaction/:id', fetchuser, async (req, res) => {
	const { title, name, lendamount, takeamount } = req.body;
	try {
		// Create a newNote object
		const newCustomer = {};
		if (title) { newCustomer.title = title };
		if (name) { newCustomer.name = name };
		if (lendamount) { newCustomer.lendamount = lendamount };
		if (takeamount) { newCustomer.takeamount = takeamount };
		console.log(title, name, lendamount, takeamount);
		// Find the note to be updated and update it
		let customer = await Customers.findById(req.params.id);
		if (!customer) { return res.status(404).send("Not Found") }

		if (customer.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		const updateCustomer = await Customers.findByIdAndUpdate(req.params.id, { $set: newCustomer }, { new: true })
		res.status(200).json(updateCustomer).select('-user -date');;
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// Route 9 fetch balance of each customer

router.get('/getCustomerBalance', fetchuser, async (req, res) => {
	try {
		let doc = await customerNetBalance.find();
		return res.status(200).json(doc);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})
module.exports = router;
