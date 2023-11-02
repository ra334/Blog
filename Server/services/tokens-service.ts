import tokensModel from "../models/tokens-model"
import jwt from 'jsonwebtoken'

class tokenService {
    generateToken(payload: object) {
        const secretkey = jwt.generateToken()
        // const privateKey 
    }

    refreshToken() {

    }
}

export default new tokenService()