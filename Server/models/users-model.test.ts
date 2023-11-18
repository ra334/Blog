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

    const mockPrismaGet = (value: User | null) =>
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

        const result = await userModel.getUser(userID);
        
        if (result) {
            const { id, login } = result

            expect(id).toBe(userID);
            expect(login).toBe(user.login);
        }
    })

    test("should get user by nickname", async () => {
        mockPrismaGet(user)

        const result = await userModel.getUser(user.nickname);

        if (result) {
            const { id, login } = result;

            expect(id).toBe(userID)
            expect(login).toBe(user.login)
        }
    })

    test("should update a password", async () => {
        const newPassword = 'new_password';
        mockPrismaUpdate(user)

        const result = await userModel.updateUserPassword(userID, newPassword)

        if (result) {
            const { id, password } = result

            expect(id).toBe(userID)
            expect(password).toBe(newPassword)
        }
    })

    test("should update user role", async () => {
        const newRole = "admin";
        mockPrismaUpdate(user);
    
        const result = await userModel.updateUserRole(userID, newRole);
    
        if (result) {
            const { id, role } = result;
            expect(id).toBe(userID);
            expect(role).toBe(newRole);
        }
    });
    
    test("should update user last login", async () => {
        const newLastLogin = new Date();
        mockPrismaUpdate(user);
    
        const result = await userModel.updateUserLastLogin(userID, newLastLogin);
    
        if (result) {
            const { id, last_login } = result;
            expect(id).toBe(userID);
            expect(last_login).toEqual(newLastLogin);
        }
    });
    
    test("should update user account status", async () => {
        const newAccountStatus = "inactive";
        mockPrismaUpdate(user);
    
        const result = await userModel.updateUserAccountStatus(userID, newAccountStatus);
    
        if (result) {
            const { id, account_status } = result;
            expect(id).toBe(userID);
            expect(account_status).toBe(newAccountStatus);
        }
    });
    
    test("should update user profile picture", async () => {
        const newProfilePicture = Buffer.from("new_picture_data");
        mockPrismaUpdate(user);
    
        const result = await userModel.updateUserProfilePicture(userID, newProfilePicture);
    
        if (result) {
            const { id, profile_picture } = result;
            expect(id).toBe(userID);
            expect(profile_picture).toEqual(newProfilePicture);
        }
    });

    test("should delete a user", async () => {
        mockPrismaDelete(user);

        const { id, login } = await userModel.deleteUser(userID);

        expect(id).toBe(userID);
        expect(login).toBe(user.login);
    });
});