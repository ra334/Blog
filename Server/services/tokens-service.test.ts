import userModel from '../models/users-model'
import tokensModel from '../models/tokens-model';
import tokensService from './tokens-service'
import { expect, test, vi, describe, afterAll, beforeAll } from "vitest";
import user from '../data/user-data'
import { v4 as uuidv4 } from 'uuid'

vi.mock('libs/prisma')

describe('Tokens service', () => {
    const userID = user.id
    let accessToken = ''
    let refreshToken = ''

    const payload = {
        id: userID,
        role: 'user'
    }

    afterAll(async () => {
        await userModel.deleteUser(userID)
    })

    beforeAll(async () => {
        await userModel.createUser(
            userID,
            user.login,
            user.nickname,
            user.password,
            user.profile_picture
        )
    } )

    test('should create tokens', () => {
        const tokens = tokensService.generateTokens(payload)

        if (tokens) {
            accessToken = tokens.accessToken
            refreshToken = tokens.refreshToken

            expect(accessToken).toBeTruthy()
            expect(refreshToken).toBeTruthy()
        }
    })

    test('should update access token', () => {
        const newAccessToken = tokensService.updateAccessToken(accessToken)

        expect(newAccessToken).toBeTruthy()
    })

    test('should delete expired tokens', async () => {
        const tokens_1 = tokensService.generateExpiredTokens(payload)
        const tokens_2 = tokensService.generateExpiredTokens(payload)
        const tokens_3 = tokensService.generateExpiredTokens(payload)

        const tokenID_1 = uuidv4()
        const tokenID_2 = uuidv4()
        const tokenID_3 = uuidv4()

        await tokensModel.createToken(tokenID_1, userID, tokens_1.refreshToken)
        await tokensModel.createToken(tokenID_2, userID, tokens_2.refreshToken)
        await tokensModel.createToken(tokenID_3, userID, tokens_3.refreshToken)

        setTimeout(async () => {
            const deletedTokens = await tokensService.removeExpiredTokens(userID)

            expect(deletedTokens).toBe(3)
        }, 1000)
    })
})