const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET;

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/signup', [
	body('fname', 'Enter a valid name').isLength({ min: 1 }),
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
	
	// console.log(req);
	let isAuthenticated = false;
	// If there are errors, return Bad request and the errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ isAuthenticated, errors: errors.array() });
	}
	try {
		// Check whether the user with this email exists already
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).json({ isAuthenticated, error: "Sorry a user with this email already exists" })
		}
		const salt = await bcrypt.genSalt(10);
		const secPass = await bcrypt.hash(req.body.password, salt);

		// Create a new user
		user = await User.create({
			fname: req.body.fname,
			lname: req.body.lname,
			password: secPass,
			email: req.body.email,
		});
		console.log(user);

		const data = {
			user: {
				id: user.id
			}
		}
		const authtoken = jwt.sign(data, JWT_SECRET);


		// res.json(user)
		isAuthenticated = true;

		res.status(200).json({ isAuthenticated, authtoken, isadmin: user.isadmin })
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})



// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
	body('email', 'Enter a valid email').isEmail(),
	body('password', 'Password cannot be blank').exists(),
], 
async (req, res) => {
	let success = false;
	// If there are errors, return Bad request and the errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			success = false
			return res.status(400).json({ success, error: "Please try to login with correct credentials" });
		}

		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			success = false
			return res.status(400).json({ success, error: "Please try to login with correct credentials" });
		}
		// console.log(user._id);
		const data = {
			user: {
				id: user.id
			}
		}
		const authtoken = jwt.sign(data, JWT_SECRET);
		success = true;
		console.log(user.isadmin);
		return res.status(200).json({ success, authtoken, isadmin: user.isadmin });

	} catch (error) {
		console.error(error.message);
		res.status(500).json({success:false,error: "Internal Server Error"});
	}
});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

	try {
		let userId = req.user.id;
		const user = await User.findById(userId).select("-password")
		res.send(user)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})
module.exports = router