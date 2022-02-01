const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Customers = require('../models/Customers');
const Suppliers = require('../models/Suppliers');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Customers using: GET "/api/khatabok/getcustomers". Login required
router.get('/getcustomers', fetchuser, async (req, res) => {
	try {
		const customers = await Customers.find({ user: req.user.id });
		res.json(customers)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// ROUTE 2: Add a new Customer using: GET "/api/khatabok/addcustomers". Login required

router.post('/addcustomer', fetchuser, async (req, res) => {
	try {
		const { title, name, amount } = req.body;
		console.log(title);
		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
		const customer = new Customers({
			title, name, amount, user: req.user.id
		})
		const savedCustomer = await customer.save()

		res.status(200).json(savedCustomer)

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 3: Update an existing customer using: PUT "/api/khatabok/updatecustomers". Login required

router.put('/updatecustomer/:id', fetchuser, async (req, res) => {
	const { title, name, amount } = req.body;
	try {
		// Create a newNote object
		const newCustomer = {};
		if (title) { newCustomer.title = title };
		if (name) { newCustomer.name = name };
		if (amount) { newCustomer.amount = amount };
		console.log(title,name,amount);
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



// ROUTE 4: Delete an existing Note using: DELETE "/api/khatabok/deletecustomers". Login required
router.delete('/deletecustomer/:id', fetchuser, async (req, res) => {
	try {
		// Find the customer to be delete and delete it
		let customer = await Customers.findById(req.params.id);
		if (!customer) { return res.status(404).send("Not Found") }

		// Allow deletion only if user owns this Note
		if (customer.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		let deletedcustomer = await Customers.findByIdAndDelete(req.params.id)
		res.json({ "Success": "customer has been deleted", customer: deletedcustomer });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// ROUTE 1: Get All the Customers using: GET "/api/khatabok/getsupplier". Login required
router.get('/getsuppliers', fetchuser, async (req, res) => {
	try {
		const suppliers = await Suppliers.find({ user: req.user.id });
		res.json(suppliers)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// ROUTE 2: Add a new Customer using: GET "/api/khatabok/addcustomers". Login required

router.post('/addsupplier', fetchuser, async (req, res) => {
	try {
		const { title, name, amount } = req.body;

		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
		const supplier = new Suppliers({
			title, name, amount, user: req.user.id
		})
		const savedsupplier = await supplier.save()

		res.json(savedsupplier)

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 3: Update an existing customer using: PUT "/api/khatabok/updatesupplier". Login required

router.put('/updatesupplier/:id', fetchuser, async (req, res) => {
	const { title, name, amount } = req.body;
	try {
		// Create a newNote object
		const newsupplier = {};
		if (title) { newsupplier.title = title };
		if (name) { newsupplier.name = name };
		if (amount) { newsupplier.amount = amount };

		// Find the note to be updated and update it
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		const updatesupplier = await Suppliers.findByIdAndUpdate(req.params.id, { $set: newsupplier }, { new: true })
		res.status(200).json(updatesupplier);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



// ROUTE 4: Delete an existing Note using: DELETE "/api/khatabok/deletecustomers". Login required
router.delete('/deletesupplier/:id', fetchuser, async (req, res) => {
	try {
		// Find the customer to be delete and delete it
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		// Allow deletion only if user owns this Note
		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		let deletedsupplier = await Suppliers.findByIdAndDelete(req.params.id)
		res.json({ "Success": "customer has been deleted", customer: deletedsupplier });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports = router
