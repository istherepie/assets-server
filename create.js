const router = require('express').Router()
const middleware = require('./middleware')


// Middleware
router.use(middleware.initialMagic)
router.use(middleware.onlyUseTheGoodStuff)

// POST /create/assets
router.post('/', (request, response) => {
    return response.json(request.assets)
})

module.exports = router