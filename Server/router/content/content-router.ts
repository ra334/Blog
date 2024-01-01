const Router = require('express').Router
import { Request, Response } from "express"
import path = require('path')

const router = new Router()

const pathDir = path.join(__dirname, '..', '..', 'dist', 'index.html')

router.get('/login', (req: Request, res: Response) => {
    res.sendFile(pathDir)
})

router.get('/registration', (req: Request, res: Response) => {
    console.log(req.cookies['accessToken'])
    res.sendFile(pathDir)
})

router.get('/create', (req: Request, res: Response) => {
    res.sendFile(pathDir)
})

router.get('/account', (req: Request, res: Response) => {
    res.sendFile(pathDir)
})

export default router