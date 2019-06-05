import express from 'express'
import dotenv from 'dotenv'
import { Client, ConnectionConfig } from 'pg'


const app = express()

dotenv.config()

const PORT = process.env.PORT

const config: ConnectionConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
}

const client = new Client(config)

const table = client.connect()


app.use(function (req, res, next) {
    // security 
    //https://enable-cors.org/server_expressjs.html
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

app.get('/', async function (req, res) {
    await table
    const result = await client.query('select * from users')
    result.rows.map(row => {
        return res.send(row)
    })

})

app.get('/helloworld', (req, res) => {
    return res.send(" Hello World!")
})