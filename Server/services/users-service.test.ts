/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, vi, describe, expect, afterAll } from 'vitest';
import userService from './users-service';
import userModel from '../models/users-model'

vi.mock("libs/prisma");

describe('User service', () => {

    const validLogin = 'mike44'
    const validNickname = 'darkk_mike'
    const validPassword = 'mike1234'

    const invalidLogin = 'mike33'
    const invalidPassword = 'mike12345'

    const incorrectLogin = '1234567890123456789012345678901234567890123456789011'
    const incorrectPassword = '123456789012345678901234567890123456789012345678901234567890123456789012345678901'
    const incorrectNickname = '123456789012345678901'

    afterAll(async () => {
        const user = await userModel.getUserByNickname(validNickname)
        if (user) {
            await userModel.deleteUser(user.id)
        } else {
            throw new Error('AfterAll error')
        }
    })

    describe('registeration', async () => {
        test('register with valid data', async () => {
            const tokens = await userService.registration(validLogin, validNickname, validPassword)

            expect(tokens.accessToken).toBeTruthy()
            expect(tokens.refreshToken).toBeTruthy()
        })

        test('register with invalid login', async () => {
            try {
                await userService.registration(incorrectLogin, validNickname, validPassword);
            } catch (error: any) {
                expect(error.message).toBe('Login is too long');
            }
        });

        test('register with invalid nickname', async () => {
            try {
                await userService.registration(validLogin, incorrectNickname, validPassword);
            } catch (error: any) {
                expect(error.message).toBe('Nickname is too long');
            }
        });

        test('register with invalid password', async () => {
            try {
                await userService.registration(validLogin, validNickname, incorrectPassword);
            } catch (error: any) {
                expect(error.message).toBe('Password is too long');
            }
        });

        test('register with existing user', async () => {
            try {
                await userService.registration(validLogin, validNickname, validPassword);
            } catch (error: any) {
                expect(error.message).toBe('User is already exist');
            }
        });
    })

    describe('login', async () => {
        test('login with valid data', async () => {
            const tokens = await userService.login(validLogin, validNickname, validPassword)
            
            expect(tokens.accessToken).toBeTruthy()
            expect(tokens.refreshToken).toBeTruthy()
        })

        test('login with invalid data', async () => {
            try {
                await userService.login(invalidLogin, validNickname, validPassword)
            } catch (error: any) {
                expect(error.message).toBe('User not found!')
            }
        })

        test('login with incorrect password', async () => {
            try {
                await userService.login(validLogin, validNickname, invalidPassword)
            } catch (error: any) {
                expect(error.message).toBe('Password invalid!')
            }
        })
    })
})
