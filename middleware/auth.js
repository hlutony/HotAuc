const jwt = require("jsonwebtoken")

//Config .env
require("dotenv").config()

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token")

	//Check if no token
	if (!token) {
		return res.status(401).json({ msg: "No token" })
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET)

		req.user = decoded.user
		next()
	} catch (err) {
		res.status(401).json({ msg: "Token not valid" })
	}
}