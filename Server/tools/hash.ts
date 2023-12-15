import * as bcrypt from 'bcrypt'

const saltRounds = 5

function hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword)
}

export {hashPassword, comparePassword}