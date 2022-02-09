const User = require('../models/User');
const fetchadmin = async  (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    let admintoken = req.header('admin-token');
	admintoken=JSON.parse(admintoken);
	// console.log(token);
    if (admintoken !==  true) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
		const userid=req.user.id;
        const user =  await User.findById( userid );
		if(user.isadmin==JSON.parse(admintoken))
        next();
		else{
			res.status(401).send({ error: "Please authenticate using a valid token" })
		}
    } catch (error) {
		// console.log("oh my goddddddddddd");
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

// req.user.id
module.exports = fetchadmin;