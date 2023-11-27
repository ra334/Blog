import tokensModel from "../models/tokens-model"
import jwt = require('jsonwebtoken')
import 'dotenv/config'

type Payload = {
    id: string;
    role: string;
}

class TokenService {
    #validateTokenExpires(token: string) {
        const tokenData = jwt.decode(token) as jwt.JwtPayload

        if (!tokenData || !tokenData.exp) {
            return false;
        }

        const currentTimestamp = Math.floor(Date.now() / 1000)

        return tokenData.exp >= currentTimestamp;
    }

    generateTokens(payload: Payload) {
        const privateKey = process.env.PRIVATE_KEY

        if (!privateKey) {
            throw new Error('Private key is not defined');
        }

        const accessToken = jwt.sign(payload, privateKey, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '7d' })

        return {accessToken, refreshToken}
    }

    // for testing
    generateExpiredTokens(payload: Payload) {
        const privateKey = process.env.PRIVATE_KEY

        if (!privateKey) {
            throw new Error('Private key is not defined');
        }

        const accessToken = jwt.sign(payload, privateKey, { expiresIn: '1s' })
        const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '1s' })

        return {accessToken, refreshToken}
    }

    updateAccessToken(accessToken: string) {
        const decodedToken = jwt.decode(accessToken) as jwt.JwtPayload

        const privateKey = process.env.PRIVATE_KEY

        if (!privateKey) {
            throw new Error('Private key is not defined');
        }

        const payload: Payload = {
            id: decodedToken.id,
            role: decodedToken.role
        }

        const token = jwt.sign(payload, privateKey, { expiresIn: '30m' })

        return token
    }

    async removeExpiredTokens(userID: string) {
        const tokens = await tokensModel.getTokensByUserID(userID)

        let counter = 0

        for (const refreshToken of tokens) {
            if (!this.#validateTokenExpires(refreshToken.token)) {
                await tokensModel.deleteToken(refreshToken.id)
                counter += 1
            } else {
                continue
            }

        }

        return counter
    }
}

export default new TokenService()