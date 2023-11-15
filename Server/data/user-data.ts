import { User } from "../types/test-types";
import {v4 as uuidv4} from 'uuid'
import * as fs from 'fs'

const userID = uuidv4()

const user: User = {
    id: userID,
    login: "John",
    password: "password",
    nickname: "John_" + userID, 
    role: "user",
    last_login: new Date(),
    account_created: new Date(),
    account_status: "active",
    profile_picture: fs.readFileSync("./assets/logo.png"),
};

export default user