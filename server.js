const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Routes
const createRoute = require('./create')


// Settings
const port = 3000

// Middleware
app.use(bodyParser.json())

// Index
app.get('/', (request, response) => {
    const context = {
        status: 'ok',
        message: 'Hello World'
    }
    return response.json(context)
})

// Create
app.use('/create/assets', createRoute)

// Start server
app.listen(port, begin => {
    console.log(`Server is fully armed and running on port: ${port}`)
})