const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
// const Reminder = require('../models/Reminder');
const { body, validationResult } = require('express-validator');



// ROUTE 1: Get User Details using: GET "/api/user/getuser". Login required
router.get('/fetchspecificeuser', fetchuser, async (req, res) => {
	try {
		// console.log("hello")
		// console.log(req.user.id)
		const user = await User.find({ _id : req.user.id });
		// console.log(user);
		res.json(user)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})


module.exports = router