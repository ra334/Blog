import express = require('express')
const router = express.Router()
import { Request, Response, NextFunction } from "express"
import userController from "../controller/users-controller"
import articleController from "../controller/posts-controller"


router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res, next)
})

router.post('/registration', (req: Request, res: Response, next: NextFunction) => {
    userController.registration(req, res, next)
})

router.post('/logout', (req: Request, res: Response) => {
    userController.logout(req, res)
})

router.get('/articles', (req: Request, res: Response) => {
    articleController.getArticles(req, res)
})

router.get('/articles:id', (req: Request, res: Response) => {
    articleController.getArticles(req, res)
})

router.post('/create', (req: Request, res: Response) => {
    articleController.createArticle(req, res)
})

router.delete('/articles:id', (req: Request, res: Response) => {
    articleController.deleteArticle(req, res)
})

router.patch('/articles:id', () => {
    
})

router.post('/refresh', (req: Request, res: Response) => {
    userController.refreshToken(req, res)
})

export default router