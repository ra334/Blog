const Router = require('express').Router
import { Request, Response, NextFunction } from "express"
import userController from "../controller/users-controller"
import postsController from "../controller/posts-controller"

const router = new Router()

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    userController.login(req, res, next)
})

router.post('/registration', (req: Request, res: Response, next: NextFunction) => {
    userController.registration(req, res, next)
})

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    userController.logout(req, res, next)
})

router.get('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    userController.getUsers(req, res, next)
})

router.get('/refresh', (req: Request, res: Response, next: NextFunction) => {})

router.get('/posts', (req: Request, res: Response, next: NextFunction) => {
    postsController.getPosts(req, res, next)
})

router.post('/post', (req: Request, res: Response, next: NextFunction) => {
    postsController.createPost(req, res, next)
})

router.put('/post/:id', (req: Request, res: Response, next: NextFunction) => {
    postsController.updatePost(req, res, next)
})

router.delete('/post/:id', (req: Request, res: Response, next: NextFunction) => {
    postsController.deletePost(req, res, next)
})

export default router