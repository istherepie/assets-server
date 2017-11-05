const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

// Settings
const port = 3000

// Middleware
app.use(bodyParser.json())

// Route
app.get('/', (request, response) => {
    const context = {
        status: 'ok',
        message: 'Hello World'
    }
    return response.json(context)
})

// function doMagicManyTimes(assets) {

// }

function initialMagic(request, response, next) {
    if (!request.body) {
        return response.status(500)
    }

    if (request.body instanceof Array) {
        console.log("yes its a list")
        request.assets = request.body
    } else {
        console.log("nope its not")
        // Magically convert the request body to a list
        request.assets = []
        request.assets.push(request.body)
    }
    console.log(request.assets)
    next()
}


function onlyUseTheGoodStuff(request, response, next) {

    // Requirements
    const requirements = ['handle', 'resource', 'file']

    // Looping magic
    for (let asset of request.assets) {
        
        // Check that all the required keys are present
        requirements.forEach(requirement => {
            if( !(requirement in asset) ) {
                let index = request.assets.indexOf(asset)
                request.assets.splice(index)
            }
        })   

        // Check that the file exists
        let check = fs.existsSync(asset.file)
        if (!check) {
            let index = request.assets.indexOf(asset)
            request.assets.splice(index)
        }
    }
    next()
}

// Middleware
app.use(initialMagic)
app.use(onlyUseTheGoodStuff)

app.post('/create/assets', (request, response) => {
    return response.json(request.assets)
})

// Start server
app.listen(port, begin => {
    console.log(`Server is fully armed and running on port: ${port}`)
})