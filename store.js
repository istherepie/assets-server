const redis = require('redis')

const config = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: '2^ApZVOx4662Sxf.(_]lSqS4zF_a8K'
}

const prefix = 'asset::'

/**
 * The expected payload looks as follows:
 * {
 *     "handle": "myhandle",
 *     "resource": "js",
 *     "file": "/path/to/345345345.js"
 * }
*/
module.exports = {
    persist(asset) {
        console.log(asset)
        // Map object
        const handle = asset.handle
        const resource = asset.resource
        const file = asset.file

        return new Promise((resolve, reject) => {
            // Create redis client
            const client = redis.createClient(config)

            // Query
            client.hset(prefix + handle, resource, file, (error, reply) => {
                if (error) {
                    reject(error)
                }
                resolve(reply)
            })
        })
    },

    getHandle(handle) {
        return new Promise((resolve, reject) => {
            // Create redis client
            const client = redis.createClient(config)

            // Query
            client.hkeys(prefix + handle, (error, reply) => {
                if (error) {
                    reject(error)
                }
                resolve(reply)
            })
        })
    },

    getResource(handle, resource) {
        return new Promise((resolve, reject) => {
            // Create redis client
            const client = redis.createClient(config)

            // Query
            client.hget(prefix + handle, resource, (error, reply) => {
                if (error) {
                    reject(error)
                }
                resolve(reply)
            })
        })
    }
}
