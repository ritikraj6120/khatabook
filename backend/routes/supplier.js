const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Suppliers = require('../models/Suppliers');
const singleSupplierTransaction = require('../models/singleSupplierTransaction')
const { body, validationResult } = require('express-validator');

// Route 0" Get single suppliers using : get "/api/supplier/getSingleSupplier". login required
router.get('/getSingleSupplierTransactions/:id', fetchuser, async (req, res) => {
	try {

		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		const getSingleSupplier = await singleSupplierTransaction.find({ supplier: req.params.id });
		res.status(200).json(getSingleSupplier);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



// ROUTE 1: Get All the Suppliers using: GET "/api/supplier/getsupplier". Login required
router.get('/getsuppliers', fetchuser, async (req, res) => {
	try {
		const suppliers = await Suppliers.find({ user: req.user.id });
		res.json(suppliers)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 2: Add a new Customer using: GET "/api/supplier/addcustomers". Login required

router.post('/addsupplier', fetchuser, async (req, res) => {
	try {
		const { title, name, payment, purchase } = req.body;
		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
		const supplier = new Suppliers({
			title, name, payment, purchase, user: req.user.id
		})
		const rep = await Suppliers.findOne({ name });
		if (!rep) {
			const savedsupplier = await supplier.save()
			res.status(200).json(savedsupplier)
		}
		else {
			res.status(409).json({ "danger": "Customer already exist" })
		}

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 3: Update an existing customer using: PUT "/api/supplier/updatesupplier". Login required

router.put('/updatesupplier/:id', fetchuser, async (req, res) => {
	const { title, name, payment, purchase } = req.body;
	try {
		// Create a newNote object
		const newsupplier = {};
		if (title) { newsupplier.title = title };
		if (name) { newsupplier.name = name };
		if (payment) { newsupplier.payment = payment };
		if (purchase) { newsupplier.purchase = purchase };

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



// ROUTE 4: Delete an existing Note using: DELETE "/api/supplier/deletecustomers". Login required
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

// Route 5:add a transaction  using: post "/api/supplier/addSupplierTransaction/". Login required
router.post('/addSupplierTransaction/:id', fetchuser, async (req, res) => {
	try {
		console.log(req.params.id);
		console.log(typeof req.params.id)
		let supplier = await Suppliers.findById(req.params.id);

		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		const { purchase_singleSupplier, payment_singleSupplier } = req.body;

		const suppliertransaction = new singleSupplierTransaction({
			purchase_singleSupplier, payment_singleSupplier, supplier: req.params.id
		})

		const newsuppliertransaction = await suppliertransaction.save()
		res.status(200).json(newsuppliertransaction);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



module.exports = router
