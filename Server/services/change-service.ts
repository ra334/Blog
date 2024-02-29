import usersModel from "../models/users-model"
import ApiError from "../error/ApiError"
import {comparePassword, hashPassword} from '../tools/hash'


class ChangeService {
    async #isPasswordValid(userID: string, password: string) {
        const user = await usersModel.getUser(userID)

        if (!user) return;

        const isPasswordValid = comparePassword(password, user?.password)

        if (isPasswordValid) {
            return true
        } else {
            throw ApiError.badRequest('Password is invalid')
        }
    }

    async changeNickname(userID: string, newNickname: string, password: string) {
        await this.#isPasswordValid(userID, password)

        const response = await usersModel.updateUserNickname(userID, newNickname)

        if (response) return true
        return false
    }

    async changeLogin(userID: string, newLogin: string, password: string) {
        await this.#isPasswordValid(userID, password)

        const response = await usersModel.updateUserLogin(userID, newLogin)

        if (response) return true
        return false
    }

    async changePassword(userID: string, newPassword: string, oldPassword: string) {
        await this.#isPasswordValid(userID, oldPassword)

        const response = await usersModel.updateUserPassword(userID, hashPassword(newPassword))

        if (response) return true
        return false
    }
}

export default new ChangeService()