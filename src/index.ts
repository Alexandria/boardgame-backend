import express, { Router } from 'express'
import dotenv from 'dotenv'
import { Client, ConnectionConfig } from 'pg'
import cors from 'cors'
import { router } from './auth'


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

export const client = new Client(config)

export const table = client.connect()



app.use(cors({ credentials: true }))
app.use(express.json())
app.use('/auth', router)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

app.get('/', async function (req, res) {
    await table
    const result = await client.query('select * from users').catch(error => console.log(error))
    if (result) {
        result.rows.map(row => {
            return res.send(row)
        })
    }


})

app.get('/helloworld', (req, res) => {
    return res.send(" Hello World!")
})