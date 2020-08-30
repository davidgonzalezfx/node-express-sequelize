/* ==================================================== */
/* IMPORTS */
/* ==================================================== */
const express = require('express')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/endpoints')

/* ==================================================== */
/* SERVER */
/* ==================================================== */
const app = express()

// parse requests of content-type - application/json
app.use(bodyParser.json())

// router
app.use('/api', apiRoutes)

// set port, listen for requests
const port = process.env.PORT
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}.`)
})

module.exports = { app, server }
