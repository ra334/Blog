/* eslint-disable @typescript-eslint/no-explicit-any */
import { hashPassword, comparePassword } from "../tools/hash"
import usersModel from "../models/users-model"
import tokensService from "./tokens-service";
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs'
import tokensModel from "../models/tokens-model";

type Tokens = {
    accessToken: string;
    refreshToken: string;
}

class UserService {

    #loginLength(login: string) {
        if (login.length > 50) {
            throw new Error('Login is too long')
        } else {
            return true
        }
    }

    #passwordLength(password: string) {
        if (password.length >= 80) {
            throw new Error('Password is too long')
        } else {
            return true
        }
    }

    #nicknameLength(nickname: string) {
        if (nickname.length > 20) {
            throw new Error('Nickname is too long')
        } else {
            return true
        }
    }

    #readLogo(): Buffer {
        try {
            const data: Buffer = fs.readFileSync('assets/logo.png');
            return data;
        } catch (err) {
            throw err;
        }
    }

    async #isUserExist(nickname: string) {
        const user = await usersModel.getUserByNickname(nickname)
        if (user) {
            return true
        } else {
            return false
        }

    }

    async login(login: string, nickname: string, password: string): Promise<Tokens> {
        this.#loginLength(login)
        this.#nicknameLength(nickname)
        this.#passwordLength(password)
        await this.#isUserExist(nickname)

        const user = await usersModel.getUserByNickname(nickname)
        
        if (!user) {
            throw new Error('User not found!');
        }
    
        if (!comparePassword(password, user.password)) {
            throw new Error('Password invalid!');
        }
    
        const userID = user.id;
        const tokenID = uuidv4();
    
        const tokens = tokensService.generateTokens({ id: userID, role: user.role });
    
        await tokensModel.createToken(tokenID, userID, tokens.refreshToken);
        return tokens;
    }

    async registration(login: string, nickname: string, password: string): Promise<Tokens> {
        this.#loginLength(login)
        this.#nicknameLength(nickname)
        this.#passwordLength(password)
        
        if (await this.#isUserExist(nickname)) {
            throw new Error('User is already exist!');
        }

        const userID = uuidv4()
        const tokenID = uuidv4()
        const logoBuffer = this.#readLogo()

        const hashedPassword = hashPassword(password)
        const user = await usersModel.createUser(userID, login, nickname, hashedPassword, logoBuffer)

        const tokens = tokensService.generateTokens({ id: user!.id, role: user!.role })
        await tokensModel.createToken(tokenID, userID, tokens.refreshToken)
        return tokens
    }
}

export default new UserService()