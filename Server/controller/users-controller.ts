import { Request, Response, NextFunction } from "express";
import usersService from "../services/users-service";

type TokensType = {
    accessToken: string;
    refreshToken: string;
}

class UserController {
    #accessToken: string = 'accessToken'
    #refreshToken: string = 'refreshToken'

    #sendCookies(res: Response, tokens: TokensType) {
        res.cookie('accessToken', tokens.accessToken)
        res.cookie('refreshToken', tokens.refreshToken)
        res.send()
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, nickname, password } = req.body
            const tokens = await usersService.login(login, nickname, password)
            this.#sendCookies(res, tokens)
        } catch (err) {
            next(err)
        }
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { login, nickname, password } = req.body
            const tokens = await usersService.registration(login, nickname, password)
            this.#sendCookies(res, tokens)
        } catch (err) {
            next(err)
        }
    }

    async logout(req: Request, res: Response) {
        res.clearCookie(this.#accessToken)
        res.clearCookie(this.#refreshToken)
        res.send('Logged out successfully')
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        console.log('getUsers')
    }
}

export default new UserController()