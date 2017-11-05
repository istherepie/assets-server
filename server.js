const express = require('express')
const app = express()

// Settings
const port = 3000

// Route
app.get('/', (request, response) => {
    const context = {
        status: 'ok',
        message: 'Hello World'
    }
    return response.json(context)
})

// Start server
app.listen(port, begin => {
    console.log(`Server is fully armed and running on port: ${port}`)
})