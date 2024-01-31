import express = require('express')
const router = express.Router()
import { Request, Response, NextFunction } from "express"
import articleController from "../controller/article-controller"

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('ok')
        articleController.getArticles(req, res)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
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

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        articleController.deleteArticle(req, res)
    } catch (err) {
        next(err)
    }
})

export default router