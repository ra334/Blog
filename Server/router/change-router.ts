import express = require('express')
const router = express.Router()
import { Request, Response } from 'express'
import changeController from '../controller/change-controller'


router.post('/nickname', (req: Request, res: Response) => {
    changeController.changeNickname(req, res)
})

router.post('/login', (req: Request, res: Response) => {
    changeController.changeLogin(req, res)
})

router.post('/password', (req: Request, res: Response) => {
    changeController.changePassword(req, res)
})

export default router