import hashPassword from "../tools/hash"
import usersModel from "../models/users-model"
import tokensService from "./tokens-service";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs'

type User = {
    id: string;
    login: string;
    password: string;
    role: string;
    account_status: string;
    last_login: object;
    profile_picture: Buffer;
}

class UserService {

    #loginLength(login: string) {
        if (login.length >= 50) {
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

    #readLogo(): Buffer {
        try {
            const data: Buffer = fs.readFileSync('../assets/logo.png');
            return data;
        } catch (err) {
            throw err;
        }
    }

    async login(login: string, password: string) {
        let user: User | null;
    
        this.#loginLength(login);
        this.#passwordLength(password);
    
        if (login.length >= 50) {
            throw new Error('Password is too long');
        }
    
        try {
            user = await usersModel.getUserByLogin(login);
        } catch (e) {
            throw new Error("User doesn't exist!");
        }
    
        if (hashPassword(password) !== user!.password) {
            throw new Error('Password incorrect!');
        }
    
        return tokensService.generateTokens({ id: user!.id, role: user!.role });
    }

    async registration(login: string, password: string) {
        let user: User | null;
        
        this.#loginLength(login)
        this.#passwordLength(password)

        const userID = uuidv4()
        const logoBuffer = this.#readLogo()

        try {
            user = await usersModel.createUser(userID, login, password, logoBuffer) 
        } catch(e) {
            throw new Error('User is already exist!')
        }

        return tokensService.generateTokens({ id: user!.id, role: user!.role })
    }
}

export default new UserService()