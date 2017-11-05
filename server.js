const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')

// Routes
const createRoute = require('./create')


// Settings
const port = 3000

// Middleware
app.use(helmet())
app.use(bodyParser.json())

// Index
app.get('/', (request, response) => {
    const context = {
        status: 'ok',
        message: 'Hello World'
    }
    return response.json(context)
})

const store = require('./store')

app.get('/:handle', (request, response) => {
    const handle = request.params.handle
    store.getHandle(handle)
    .then(reply => {
        return response.json(reply)
    })
    .catch(error => {
        return response
            .status(500)
            .json(error)
    }) 
})

app.get('/:handle/:resource', (request, response) => {
    const handle = request.params.handle
    const resource = request.params.resource

    store.getResource(handle, resource)
    .then(reply => {
        if (!reply) {
            return response
                .status(404)
                .json({ error: "The resource does not exist"})
        }
        return response.sendFile(reply)
    })
    .catch(error => {
        return response
            .status(400)
            .json(error)
    }) 
})

// Create
app.use('/create/assets', createRoute)

// Start server
app.listen(port, begin => {
    console.log(`Server is fully armed and running on port: ${port}`)
})