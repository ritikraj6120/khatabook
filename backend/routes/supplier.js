const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Suppliers = require('../models/Suppliers');
const singleSupplierTransaction = require('../models/singleSupplierTransaction')
const supplierNetBalance = require('../models/SupplierNetBalance');
const { body, validationResult } = require('express-validator');

// Route 1" Get single suppliers using : GET "/api/supplier/getSingleSupplier". login required
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



// ROUTE 1: Get All the Suppliers using: GET "/api/supplier/getsuppliers". Login required
router.get('/getsuppliers', fetchuser, async (req, res) => {
	try {
		const suppliers = await Suppliers.find({ user: req.user.id }).select('-user -date');;
		res.json(suppliers)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 2: Add a new Supplier using: GET "/api/supplier/addsuppliers". Login required

router.post('/addsupplier', fetchuser, async (req, res) => {
	try {
		const { title, name, phone } = req.body;
		// If there are errors, return Bad request and the errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ errors: errors.array() });
		// }
		const supplier = new Suppliers({
			title, name, phone, user: req.user.id
		})
		const rep = await Suppliers.findOne({ name });
		if (!rep) {
			const savedsupplier = await supplier.save()
			res.status(200).json(savedsupplier)
		}
		else {
			res.status(409).json({ "danger": "supplier already exist" })
		}

	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// ROUTE 3: Update an existing supplier using: PUT "/api/supplier/updatesupplier". Login required

router.put('/updatesupplier/:id', fetchuser, async (req, res) => {
	const { title, name, phone } = req.body;
	try {
		// Create a newNote object
		const newsupplier = {};
		if (title) { newsupplier.title = title };
		if (name) { newsupplier.name = name };
		if (phone) { newsupplier.phone = phone };

		// Find the note to be updated and update it
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		const updatesupplier = await Suppliers.findByIdAndUpdate(req.params.id, { $set: newsupplier }, { new: true })
		res.status(200).json(updatesupplier).select('-user -date');
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



// ROUTE 4: Delete an existing Note using: DELETE "/api/supplier/deletesuppliers". Login required
router.delete('/deletesupplier/:id', fetchuser, async (req, res) => {
	try {
		// Find the supplier to be delete and delete it
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		// Allow deletion only if user owns this supplier
		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		let deletedsupplier = await Suppliers.findByIdAndDelete(req.params.id)
		res.json({ "Success": "supplier has been deleted", supplier: deletedsupplier });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// Route 5 Get single supplier using : get "/api/supplier/getSinglesupplier". login required
router.get('/getSingleSupplierDetail/:id', fetchuser, async (req, res) => {
	try {
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		const getSingleSupplier = supplier;
		res.status(200).json(getSingleSupplier);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// Route 6:fetch transaction  using: get "/api/supplier/getSupplierTransactions/". Login required
router.get('/getsupplierTransactions/:id', fetchuser, async (req, res) => {
	try {
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not much Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		let supplierTransactions = await singleSupplierTransaction.find({ supplier: req.params.id });
		return res.status(200).json(supplierTransactions);

	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


// Route 7:add a transaction  using: post "/api/supplier/addSupplierTransaction/". Login required
router.post('/addSupplierTransaction/:id', fetchuser, async (req, res) => {
	try {

		let supplier = await Suppliers.findById(req.params.id);

		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}



	/////gddigskgdkadgkjakakfkfgk
	const { purchase_singleSupplier, payment_singleSupplier } = req.body;
	//////////////////////////////////////////hello
	try {

		let amounttoget = 0, amounttogive = 0;
		if (payment_singleSupplier > 0) {
			amounttoget = amounttoget + payment_singleSupplier;
		}
		else {
			amounttogive = amounttogive + purchase_singleSupplier;
		}


		
		
		const newSupplierNetBalance = new supplierNetBalance({
			amounttoget, amounttogive, supplier: req.params.id
		})
		const rep = await supplierNetBalance.findOne({ supplier: req.params.id });
		if (!rep) {
			let doc = await newSupplierNetBalance.save();
		}
		else {
			let ans=await supplierNetBalance.findOne({supplier: req.params.id});
			amounttoget += ans.amounttoget;
			amounttogive += ans.amounttogive;
			let doc = await supplierNetBalance.findOneAndUpdate({ supplier: req.params.id }, {$set: {amounttoget:amounttoget,amounttogive:amounttogive}}, { new: true });
		}
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
	///////////////////////////////////////////////////////////////////////////
	let newSuppliertransaction = new singleSupplierTransaction({
		payment_singleSupplier, purchase_singleSupplier, supplier: req.params.id
	})

	try {
		let doc = await newSuppliertransaction.save();
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
})

// // ROUTE 8: Update an existing supplierTransaction  using: PUT "/api/supplier/updatetransactions". Login required

router.put('/updatetransactions/:id', fetchuser, async (req, res) => {
	const { title, name, lendamount, takeamount } = req.body;
	try {
		// Create a newNote object
		const newSupplier = {};
		if (title) { newSupplier.title = title };
		if (name) { newSupplier.name = name };
		if (lendamount) { newSupplier.lendamount = lendamount };
		if (takeamount) { newSupplier.takeamount = takeamount };
		console.log(title, name, lendamount, takeamount);
		// Find the note to be updated and update it
		let supplier = await Suppliers.findById(req.params.id);
		if (!supplier) { return res.status(404).send("Not Found") }

		if (supplier.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		const updateSupplier = await Suppliers.findByIdAndUpdate(req.params.id, { $set: newSupplier }, { new: true });
		res.status(200).json(updateSupplier).select('-user -date');
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})
// Route 9 fetch balance of each customer

router.get('/getSupplierBalance', fetchuser, async (req, res) => {
	try {
		let doc = await supplierNetBalance.find();
		return res.status(200).json(doc);
	}
	catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports = router