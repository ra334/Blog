import tokensService from "../services/tokens-service"
import changeService from "../services/change-service"
import { Request, Response } from "express"
import ApiError from "../error/ApiError"


class ChangeController {
    async changeNickname(req: Request, res: Response) {
        const {accessToken, newNickname, password} = req.body

        if (tokensService.verifyToken(accessToken)) {
            const tokenData = tokensService.decodeToken(accessToken)
            const userID = tokenData.id
            const isDone = await changeService.changeNickname(userID, newNickname, password)
            if (isDone) res.status(200).send('Done')
        } else {
            throw ApiError.forbidden('Invalid access token')
        }
    }

    async changeLogin(req: Request, res: Response) {
        const {accessToken, newLogin, password} = req.body

        if (tokensService.verifyToken(accessToken)) {
            const tokenData = tokensService.decodeToken(accessToken)
            const userID = tokenData.id
            const isDone = await changeService.changeLogin(userID, newLogin, password)

            if (isDone) res.status(200).send('Done')
        } else {
            throw ApiError.forbidden('Invalid access token')
        }
    }

    async changePassword(req: Request, res: Response) {
        const {accessToken, newPassword, oldPassword} = req.body

        if (tokensService.verifyToken(accessToken)) {
            const tokenData = tokensService.decodeToken(accessToken)
            const userID = tokenData.id
            const isDone = await changeService.changePassword(userID, newPassword, oldPassword)

            if (isDone) res.status(200).send('Done')
        } else {
            throw ApiError.forbidden('Invalid access token')
        }
    }
}

export default new ChangeController()