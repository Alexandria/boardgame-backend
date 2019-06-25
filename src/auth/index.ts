import express from 'express'
import * as jwt from 'jsonwebtoken'
import { validateLogin } from '../utils/validateLogin'
import { User } from '../database/models/user'

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

    const queryResult = await User.findAll({
        where: {
            email: req.body.email
        }
    }).catch(err => {

        console.log(err)
        return []
    })

    if (queryResult.length > 0 && queryResult[0].password === req.body.password) {
        const token = jwt.sign({
            email: queryResult[0].email,
            userId: queryResult[0].user_id
        }, 'secret',
            {
                expiresIn: '30s'
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




