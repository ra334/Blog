import { Request, Response, NextFunction } from "express";
import usersService from "../services/users-service";
import tokensService from "../services/tokens-service";
import { TokensType } from '../types/tokens-type'
import usersModel from "../models/users-model";
class UserController {
    #sendCookies(res: Response, tokens: TokensType) {
        const currentTime = new Date().getTime();
        const accessTokenCookieExpires = currentTime + 30 * 24 * 60 * 60 * 1000
        const refreshTokenCookieExpires = currentTime + 30 * 24 * 60 * 60 * 1000 // 30 days

        res.cookie('accessToken', tokens.accessToken, {
            expires: new Date(accessTokenCookieExpires),
            sameSite: 'strict',
            secure: true
          });

        res.cookie('refreshToken', tokens.refreshToken, {
            expires: new Date(refreshTokenCookieExpires),
            sameSite: 'strict',
            secure: true
          });
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

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const tokens: TokensType = req.body

            const isRefreshTokenValid = tokensService.verifyToken(tokens.refreshToken)

            const isExpiresRefreshTokenValid= tokensService.validateTokenExpires(tokens.refreshToken)

            if (!isExpiresRefreshTokenValid || !isRefreshTokenValid) {
                this.#clearCookies(res)
                return;
            }

            const isValidAccessToken = tokensService.validateTokenExpires(tokens.accessToken)

            if (!isValidAccessToken) {
                const newAccessToken = tokensService.updateAccessToken(tokens.refreshToken)
                res.clearCookie('accessToken')

                const currentTime = new Date().getTime();
                const accessTokenCookieExpires = currentTime + 30 * 60 * 1000

                res.cookie('accessToken', newAccessToken, {expires: new Date(accessTokenCookieExpires)})
                res.status(200).redirect(req.path)
            }

            next()
        } catch (err) {
            next(err)
        }
    }

    async validateAccessToken(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.body.accessToken
            const isAccessTokenValid = tokensService.verifyToken(accessToken)

            if (!isAccessTokenValid) {
                res.json({valid: false})
            } else {
                res.json({valid: true})
            }

        } catch (err) {
            next(err)
        }
    }

    async getUserNickname(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.params.id
            const user = await usersModel.getUser(userID)
            res.json({nickname: user?.nickname})
        } catch (err) {
            next(err)
        }
    }

    async getUserImage(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.params.id
            const user = await usersModel.getUser(userID)
            res.json({image: user?.profile_picture})
        } catch (err) {
            next(err)
        }
    }
}

export default new UserController()