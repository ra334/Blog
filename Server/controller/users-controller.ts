import { Request, Response, NextFunction } from "express";
import usersService from "../services/users-service";
import tokensService from "../services/tokens-service";
import { TokensType } from '../types/tokens-type'
class UserController {
    #sendCookies(res: Response, tokens: TokensType) {
        res.cookie('accessToken', tokens.accessToken)
        res.cookie('refreshToken', tokens.refreshToken)
        res.send()
    }

    #clearCookies(res: Response) {
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
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
        const tokens: TokensType = req.body

        const isAccessTokenValid = tokensService.vefiryToken(tokens.accessToken)
        if (isAccessTokenValid) {
            this.#clearCookies(res)
        }
    }

    async refreshToken(req: Request, res: Response) {
        const tokens: TokensType = req.body

        const isRefreshTokenValid = tokensService.vefiryToken(tokens.refreshToken)

        const isExpiresRefreshTokenValid= tokensService.validateTokenExpires(tokens.refreshToken)

        if (!isExpiresRefreshTokenValid || !isRefreshTokenValid) {
            this.#clearCookies(res)
            return;
        }

        const isValidAccessToken = tokensService.validateTokenExpires(tokens.accessToken)

        if (!isValidAccessToken) {
            const newAccessToken = tokensService.updateAccessToken(tokens.accessToken, tokens.refreshToken)
            res.clearCookie('accessToken')
            res.cookie('accessToken', newAccessToken)
            res.send()
        }
    }
}

export default new UserController()