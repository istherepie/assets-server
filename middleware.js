const fs = require('fs')

module.exports = {
    initialMagic(request, response, next) {
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
    },

    onlyUseTheGoodStuff(request, response, next) {

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
}
