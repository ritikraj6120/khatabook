// const express = require('express');
// const router = express.Router();
// const fetchuser = require('../middleware/fetchuser');
// const Customers = require('../models/Customer');
// // const Reminder = require('../models/Reminder');
// const { body, validationResult } = require('express-validator');

// // ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
// router.get('/fetchCustomers', fetchuser, async (req, res) => {
// 	try {
// 		const customers = await Customers.find({ user: req.user.id });
// 		res.json(customers)
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send("Internal Server Error");
// 	}})

// 	router.post('/addCustomers',fetchuser,async (req,res)=>{
// 		try{
// 			const customers = await Note.find({ user: req.user.id });
// 			res.json(customers)
// 		}
// 	})
	
// 	router.post('/addnote', fetchuser, [
// 		body('title', 'Enter a valid title').isLength({ min: 3 }),
// 		body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
// 			try {
// 				const { title, description, tag } = req.body;
	
// 				// If there are errors, return Bad request and the errors
// 				const errors = validationResult(req);
// 				if (!errors.isEmpty()) {
// 					return res.status(400).json({ errors: errors.array() });
// 				}
// 				const note = new Note({
// 					title, description, tag, user: req.user.id
// 				})
// 				const savedNote = await note.save()
	
// 				res.json(savedNote)
	
// 			} catch (error) {
// 				console.error(error.message);
// 				res.status(500).send("Internal Server Error");
// 			}
// 		})
	