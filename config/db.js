const { Pool } = require('pg')
// const client = new Client({
        // user: 'ijwhxafi',
        // host: 'john.db.elephantsql.com',
        // database: 'ijwhxafi',
        // password: 'Lik9E-zmGcU0B7xQ2E7Bm3u-TD0nEeQY',
        // port: 5432,
// })


// const pool = new Pool({
//         user: 'ijwhxafi',
//         host: 'john.db.elephantsql.com',
//         database: 'ijwhxafi',
//         password: 'Lik9E-zmGcU0B7xQ2E7Bm3u-TD0nEeQY',
//         port: 5432,
// })
const pool = new Pool({
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DB,
        password: process.env.PG_PASS,
        port: 5432,
})
const client = pool;
// const client = new Client('postgres://ijwhxafi:Lik9E-zmGcU0B7xQ2E7Bm3u-TD0nEeQY@john.db.elephantsql.com/ijwhxafi')
module.exports = client;