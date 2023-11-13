import tokensModel from "../models/tokens-model"
import userModel from "../models/users-model"
import jwt, { JwtPayload } from 'jsonwebtoken'

type Payload = {
    id: string;
    role: string;
}

class TokenService {
    #jwtSecretKey = 'jwt_secret_key'

    async generateTokens(payload: Payload) {
        const accesToken = jwt.sign(payload, this.#jwtSecretKey, {expiresIn: '1h'})
        const refreshToken = jwt.sign(payload, this.#jwtSecretKey, {expiresIn: '7d'})
        
        // await tokensModel.createToken(payload.id, refreshToken)

        return {accesToken, refreshToken}
    }

    generateAccesToken(payload: Payload): string {
        const accesToken = jwt.sign(payload, this.#jwtSecretKey, {expiresIn: '1h'})
        return accesToken
    }
    
    validateToken(token: string) {
        return jwt.verify(token, this.#jwtSecretKey)
    }

    validateExpires(token: string) {

    }

    async refreshToken(token: string) {
        
    }

    async refreshAccesToken(refreshToken: string) {
        const decoded = this.validateToken(refreshToken) as JwtPayload

        if (!decoded) {
            throw new Error('Invalid token')
        }
        
        const user = await userModel.getUser(decoded.id)

        if (!user) {
            throw new Error('User not found')
        }
    
        const storedRefreshTokens = await tokensModel.getTokensByUserID(decoded.id)

        for (const value of storedRefreshTokens) {
            
        }

        const newTokens = await this.generateTokens({ id: decoded.id, role: decoded.role });
        return newTokens
    }
}

export default new TokenService()

const tokenService = new TokenService()

const token = tokenService.generateAccesToken({id: 'gay', role: 'gay gay'})

console.log(tokenService.validateToken(token))