import express = require('express')
const router = express.Router()
import { Request, Response, NextFunction } from "express"
import userController from "../controller/users-controller"
import articleController from "../controller/article-controller"


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

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    try {
        userController.logout(req, res)
    } catch (err) {
        next(err)
    }
})

router.get('/articles', (req: Request, res: Response, next: NextFunction) => {
    try {
        articleController.getArticles(req, res)
    } catch (err) {
        next(err)
    }
})

router.get('/articles:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        articleController.getArticles(req, res)
    } catch (err) {
        next(err)
    }
})

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
    try {
        articleController.createArticle(req, res)
    } catch (err) {
        next(err)
    }
})

router.delete('/articles:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        articleController.deleteArticle(req, res)
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