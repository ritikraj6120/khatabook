const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
require('dotenv').config()
connectToMongo();
const app = express()
var port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/supplier', require('./routes/supplier'));

app.listen(port, () => {
	console.log(`Khatabook backend listening at http://localhost:${port}`)
})