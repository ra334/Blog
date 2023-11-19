import userModel from "./users-model";
import { expect, test, vi, describe } from "vitest";
import user from "../data/user-data";

vi.mock("libs/prisma");

describe("User model", () => {

    const userID = user.id

    test("should create a new user", async () => {
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
        const result = await userModel.getUser(userID);
        
        if (result) {
            const { id, login } = result

            expect(id).toBe(userID);
            expect(login).toBe(user.login);
        }
    })

    test("should get user by nickname", async () => {
        const result = await userModel.getUser(user.nickname);

        if (result) {
            const { id, login } = result;

            expect(id).toBe(userID)
            expect(login).toBe(user.login)
        }
    })

    test("should get user by login and password", async () => {
        const result = await userModel.getUserByLoginAndPassword(user.login, user.password)

        if (result) {
            const { password, login } = result

            expect(password).toBe(user.password)
            expect(login).toBe(user.login)
        }
    })

    test("should update a password", async () => {
        const newPassword = 'new_password';

        const result = await userModel.updateUserPassword(userID, newPassword)

        if (result) {
            const { id, password } = result

            expect(id).toBe(userID)
            expect(password).toBe(newPassword)
        }
    })

    test("should update user role", async () => {
        const newRole = "admin";
    
        const result = await userModel.updateUserRole(userID, newRole);
    
        if (result) {
            const { id, role } = result;
            expect(id).toBe(user.id);
            expect(role).toBe(newRole);
        }
    });
    
    test("should update user last login", async () => {
        const newLastLogin = new Date();
    
        const result = await userModel.updateUserLastLogin(userID, newLastLogin);
    
        if (result) {
            const { id, last_login } = result;
            expect(id).toBe(userID);
            expect(last_login).toEqual(newLastLogin);
        }
    });
    
    test("should update user account status", async () => {
        const newAccountStatus = "inactive";
    
        const result = await userModel.updateUserAccountStatus(userID, newAccountStatus);
    
        if (result) {
            const { id, account_status } = result;
            expect(id).toBe(userID);
            expect(account_status).toBe(newAccountStatus);
        }
    });
    
    test("should update user profile picture", async () => {
        const newProfilePicture = Buffer.from("new_picture_data");
    
        const result = await userModel.updateUserProfilePicture(userID, newProfilePicture);
    
        if (result) {
            const { id, profile_picture } = result;
            expect(id).toBe(userID);
            expect(profile_picture).toEqual(newProfilePicture);
        }
    });

    test("should delete a user", async () => {
        const result = await userModel.deleteUser(userID);

        if (result) {
            const { id, login } = result
            expect(id).toBe(userID);
            expect(login).toBe(user.login);
        }
    });
});