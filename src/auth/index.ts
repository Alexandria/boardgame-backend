import express, { Request } from 'express'
import cors from 'cors'
import * as yup from 'yup'
import * as jwt from 'jsonwebtoken'

import { table, client } from '../index'

export const router = express.Router()

router.use(cors(
    {
        credentials: true
    }
))
router.use(express.json())

router.get('/', (req, res) => {
    res.json({
        message: '🗝'
    })
})

router.post('/login', async function (req, res, next) {
    const isValidInput = await validateLogin(req.body).catch(err => {
        res.status(401).json({
            message: err.message
        })

    })

    await table
    const selectEmail = "select * from users where email = $1"
    const emailParams = [req.body.email]

    const queryResult =
        await client.query(selectEmail, emailParams)

    if (queryResult.rows.length <= 0) {
        // send an error to the client
        res.status(401).json({
            message: 'Authorization Failed ⛔️'
        })
    }

    if (queryResult.rows[0].password === req.body.password) {
        const token = jwt.sign({
            email: queryResult.rows[0].email,
            userId: queryResult.rows[0].user_id
        }, 'secret',
            {
                expiresIn: '1hr'
            }
        )
        res.json({
            token,
            message: 'You are logged in! ✅'
        })
    } else {
        res.status(401).json({
            message: 'Authorization Failed ⛔️'
        })
    }





})

const loginSchema = yup.object().shape({
    email: yup.string()
        .email()
        .min(5)
        .required("You must enter a valid email address"),
    password: yup.string().min(5).required("You must enter a password")
})

const validateLogin = (login: Request) => {
    return loginSchema.validate(login)
}



