import express = require('express')
const router = express.Router()
import { Request, Response, NextFunction } from "express"
import userController from "../controller/users-controller"


router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    try {
        userController.login(req, res, next)
    } catch (err) {
        next(err)
    }
})

router.post('/registration', (req: Request, res: Response, next: NextFunction) => {
    try {
        userController.registration(req, res, next)
    } catch (err) {
        next(err)
    }
})

router.post('/refresh', (req: Request, res: Response, next: NextFunction) => {
    try {
        userController.refreshToken(req, res)
    } catch (err) {
        next(err)
    }
})

export default router