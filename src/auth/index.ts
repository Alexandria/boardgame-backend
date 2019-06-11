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

    const queryResultEmail =
        await client.query(selectEmail, emailParams)

    if (queryResultEmail.rows.length <= 0) {
        // send an error to the client
        res.status(401).json({
            message: 'Email not found'
        })
    }

    const selectLogin = "select * from users where email = $1 and password = $2"
    const loginParams = [req.body.email, req.body.password]
    const queryResultLogin =
        await client.query(selectLogin, loginParams)

    if (queryResultLogin.rows.length <= 0) {
        //send error to the clien
        res.status(401).json({
            message: 'User Not Found'
        });
    }

    const token = jwt.sign({
        email: queryResultLogin.rows[0].email,
        userId: queryResultLogin.rows[0].user_id
    }, 'secret',
        {
            expiresIn: '1hr'
        }
    )
    res.json({
        token,
        message: 'You are logged in! ✅'
    })

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



