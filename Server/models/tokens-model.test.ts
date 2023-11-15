import userModel from "./users-model";
import tokenModel from "./tokens-model";
import { expect, test, vi, describe, afterAll, beforeAll } from "vitest";
import prismaAdapter from "../adapters/__mocks__/prisma-adapter";
import { User, Token } from "../types/test-types"
import user from "../data/user-data";


vi.mock("../adapters/__mock__/prisma-adapter.ts");

const userID = user.id
let tokenID = ""
const secretToken = "random.token"

describe("token model", () => {

    const token: Token = {
        id: tokenID,
        user_id: userID,
        token: secretToken,
        created_at: new Date(),
    }

    const mockPrismaCreateUser = (value: User) => 
        prismaAdapter.users.create.mockResolvedValue(value);

    const mockPrismaDeleteUser = (value: User) => 
        prismaAdapter.users.delete.mockResolvedValue(value);

    const mockPrismaCreateToken = (value: Token) => 
        prismaAdapter.tokens.create.mockResolvedValue(value);

    const mockPrismaGetOne = (value: Token) => 
        prismaAdapter.tokens.findFirst.mockResolvedValue(value);

    const mockPrismaGetMany = (value: Token) => 
        prismaAdapter.tokens.findMany.mockResolvedValue([value]);

    const mockPrismaDeleteToken = (value: Token) => 
        prismaAdapter.tokens.delete.mockResolvedValue(value);


    afterAll(async () => {
        mockPrismaDeleteUser(user)

        const result = await userModel.deleteUser(userID);

        if (result) {
            const { id } = result

            expect(id).toBe(userID)
        }
    })

    beforeAll(async () => {
        mockPrismaCreateUser(user)

        const result = await userModel.createUser(
            user.id,
            user.login,
            user.nickname,
            user.password,
            user.profile_picture
        );

        if (result) {
            const { id } = result

            expect(id).toBe(userID)
        }
    })

    test("should create a token", async () => {
        mockPrismaCreateToken(token)

        const result = await tokenModel.createToken(userID, token.token);

        if (result) {
            const { id, user_id } = result

            tokenID = id
            expect(user_id).toBe(userID)
        }
    })

    test('should get a token by id', async () => {
        mockPrismaGetOne(token)

        const result = await tokenModel.getTokenByID(tokenID);

        if (result) {
            const { user_id, token } = result

            expect(user_id).toBe(userID)
            expect(token).toBe(secretToken)
        }
    })

    test('should get tokens by user id', async () => {
        mockPrismaGetMany(token)

        const result = await tokenModel.getTokensByUserID(userID)

        if (result) {
            expect(result).toHaveLength(1)
        }
    })

    test("should get a token", async () => {
        mockPrismaGetOne(token)

        const result = await tokenModel.getToken(userID, token.token)

        if (result) {
            const { user_id, token } = result

            expect(user_id).toBe(userID)
            expect(token).toBe(secretToken)
        }
    })

    test("should delete a token", async() => {
        mockPrismaDeleteToken(token)

        const result = await tokenModel.deleteToken(tokenID);

        if (result) {
            const { id, token } = result

            expect(id).toBe(tokenID)
            expect(token).toBe(secretToken)
        }
    })
})