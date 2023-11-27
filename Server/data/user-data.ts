import {v4 as uuidv4} from 'uuid'
import * as fs from 'fs'

const userID = uuidv4()

const user = {
    id: userID,
    login: "John",
    password: "password",
    nickname: "John_" + userID,
    profile_picture: fs.readFileSync("./assets/logo.png"),
};

export default user