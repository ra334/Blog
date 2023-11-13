import userModel from "./users-model";
import * as fs from "fs";
import { expect, test, vi, describe } from "vitest";
import prismaAdapter from "../adapters/__mocks__/prisma-adapter";

vi.mock("../adapters/__mock__/prisma-adapter.ts");

const userID = "2e424d46-fc4a-4c2d-91e9-e32411b8cb5d";

describe("User model", () => {
    interface User {
        id: string;
        login: string;
        password: string;
        nickname: string; 
        role: string;
        last_login: Date;
        account_created: Date;
        account_status: string;
        profile_picture: Buffer;
    }

    const user: User = {
        id: userID,
        login: "John",
        password: "password",
        nickname: "John_121", 
        role: "user",
        last_login: new Date(),
        account_created: new Date(),
        account_status: "active",
        profile_picture: fs.readFileSync("./assets/logo.png"),
    };

    const mockPrismaCreate = (value: User) =>
        prismaAdapter.users.create.mockResolvedValue(value);

    const mockPrismaGet = (value: User) =>
        prismaAdapter.users.findFirst.mockResolvedValue(value);

    const mockPrismaUpdate = (value: User) =>
        prismaAdapter.users.update.mockResolvedValue(value);

    const mockPrismaDelete = (value: User) =>
        prismaAdapter.users.delete.mockResolvedValue(value);

    test("should create a new user", async () => {
        mockPrismaCreate(user);

        const { id, login } = await userModel.createUser(
            user.id,
            user.login,
            user.nickname, 
            user.password,
            user.profile_picture
        );

        expect(id).toBe(userID);
        expect(login).toBe(user.login);
    });

    test("should get a user by id", async () => {
        mockPrismaGet(user)

        const { id, login } = await userModel.getUser(userID);
        
        expect(id).toBe(userID);
        expect(login).toBe(user.login);
    })

    test("should delete a user", async () => {
        mockPrismaDelete(user);

        const { id, login } = await userModel.deleteUser(userID);

        expect(id).toBe(userID);
        expect(login).toBe(user.login);
    });
});
