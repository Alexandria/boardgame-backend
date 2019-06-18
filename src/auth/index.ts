import express, { Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { table, client } from '../index'
import { validateLogin } from '../utils/validateLogin'

export const router = express.Router()

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

    if (!(queryResult.rows.length <= 0) && (queryResult.rows[0].password === req.body.password)) {
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




