import { test, vi, describe, expect, afterAll, beforeEach } from 'vitest';
import userService from './users-service';
import userModel from '../models/users-model'

vi.mock("libs/prisma");

describe('User service', () => {

    const validLogin = 'mike44'
    const validNickname = 'darkk_mike'
    const validPassword = 'mike1234'

    const incorectLogin = '1234567890123456789012345678901234567890123456789011'
    const incorrectPassword = '123456789012345678901234567890123456789012345678901234567890123456789012345678901'
    const incorrectNickname = '123456789012345678901'

    afterAll(async () => {
        const user = await userModel.getUserByNickname(validNickname)
        if (user) {
            await userModel.deleteUser(user.id)
        }
    })

    describe('registeration', async () => {
        test('register with valid data', async () => {
            const tokens = await userService.registration(validLogin, validNickname, validPassword)

            expect(tokens.accessToken).toBeTruthy()
            expect(tokens.refreshToken).toBeTruthy()
        })

        test('register with invalid data', async () => {

        })
    })

    describe('login', async () => {
        test('login with valid data', async () => {
            const tokens = await userService.login(validLogin, validNickname, validPassword)
            
            expect(tokens.accessToken).toBeTruthy()
            expect(tokens.refreshToken).toBeTruthy()
        })
    })
})
