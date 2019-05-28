import express from 'express'
import dotenv from 'dotenv'
import { Client } from 'pg'


const app = express()
dotenv.config()

const PORT = process.env.PORT

const client = new Client()
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

app.get('/', (req, res) => {
    table
        .then(() => {
            return client.query('select username from users')
        }).then((result) => {
            result.rows.map(row => {
                return res.send(row)
            })
        }).catch((error => {
            console.log(error)
        }))



})