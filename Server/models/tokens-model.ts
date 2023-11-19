import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TokenModel {
    async createToken(tokenID: string, userID: string, token: string) {
        try {
            await prisma.$connect()
            const createToken = await prisma.tokens.create({
                data: {
                    id: tokenID,
                    user_id: userID,
                    token
                }
            })

            return createToken
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getTokenByID(tokenID: string) {
        try {
            await prisma.$connect()
            const token = await prisma.tokens.findFirst({
                where: {id: tokenID}
            })

            return token
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getTokensByUserID(userID: string) {
        try {
            await prisma.$connect()
            const tokens = await prisma.tokens.findMany({
                where: {user_id: userID}
            })

            return tokens
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getToken(userID: string, token: string) {
        try {
            await prisma.$connect()
            const tokenID = await prisma.tokens.findFirst({
                where: {
                    user_id: userID,
                    token
                }
            })

            return tokenID
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async deleteToken(tokenID: string) {
        try {
            await prisma.$connect()
            const token = await prisma.tokens.delete({
                where: {id: tokenID}
            })
            
            return token
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }
}

export default new TokenModel()