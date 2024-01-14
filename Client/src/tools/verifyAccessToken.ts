import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { PayloadType, TokensType } from "../types/tokens-type";


class VerifyAccessToken {
    async #tryRefreshToken(accessToken: string, refreshToken: string) {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/refresh',
                data: {
                    accessToken,
                    refreshToken
                }
            })
    
            if (response.status === 200) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.error('Refresh token request: ', err)
            return false
        }
    }

    #validateExpires(tokenPayload: PayloadType) {
        const exp = tokenPayload.exp
        const currentTime = Math.floor(Date.now() / 1000)

        if (exp && currentTime >= exp) {
            return false
        } else {
            return true
        }
    }

    async verifyTokens(tokens: TokensType) {
        const accessToken = tokens.accessToken;
        const refreshToken = tokens.refreshToken;

        const accessTokenPayload: PayloadType = jwtDecode(accessToken)

        const isAccessTokenTrue = this.#validateExpires(accessTokenPayload)

        if (!isAccessTokenTrue) {
            await this.#tryRefreshToken(accessToken, refreshToken)
        }
    }
}


export default new VerifyAccessToken()