const router = require('express').Router()
const middleware = require('./middleware')
const store = require('./store')


// Middleware
router.use(middleware.initialMagic)
router.use(middleware.onlyUseTheGoodStuff)

async function storeProcedure(assets) {
    let result = []
    for (const asset of assets) {
        await store.persist(asset)
            .then(reply => {
                result.push(asset)
            })
            .catch(error => console.log(error))
    }
    return result
}

// POST /create/assets
router.post('/', async (request, response) => {
    const procedure = await storeProcedure(request.assets)
    response
        .status(201)
        .json(procedure)
})

module.exports = router