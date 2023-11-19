import userModel from "./users-model";
import tokenModel from "./tokens-model";
import { expect, test, vi, describe, afterAll, beforeAll } from "vitest";
import user from "../data/user-data";
import {v4 as uuidv4} from 'uuid'

vi.mock("libs/prisma");

const userID = user.id
const tokenID = uuidv4()
const secretToken = "random.token"

describe("token model", () => {

    afterAll(async () => {
        await userModel.deleteUser(userID);
    })

    beforeAll(async () => {
        await userModel.createUser(
            user.id,
            user.login,
            user.nickname,
            user.password,
            user.profile_picture
        );
    })

    test("should create a token", async () => {
        const result = await tokenModel.createToken(tokenID, userID, secretToken);

        if (result) {
            const { id, user_id } = result

            expect(id).toBe(tokenID)
            expect(user_id).toBe(userID)
        }
    })

    test('should get a token by id', async () => {
        const result = await tokenModel.getTokenByID(tokenID);

        if (result) {
            const { user_id, token } = result

            expect(user_id).toBe(userID)
            expect(token).toBe(secretToken)
        }
    })

    test('should get tokens by user id', async () => {
        const result = await tokenModel.getTokensByUserID(userID)

        if (result) {
            expect(result).toHaveLength(1)
        }
    })

    test("should get a token", async () => {
        const result = await tokenModel.getToken(userID, secretToken)

        if (result) {
            const { user_id, token } = result

            expect(user_id).toBe(userID)
            expect(token).toBe(secretToken)
        }
    })

    test("should delete a token", async() => {
        const result = await tokenModel.deleteToken(tokenID);

        if (result) {
            const { id, token } = result

            expect(id).toBe(tokenID)
            expect(token).toBe(secretToken)
        }
    })
})