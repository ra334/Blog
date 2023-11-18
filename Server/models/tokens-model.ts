import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class TokenModel {
    async createToken(userID: string, token: string) {
        try {
            await prisma.$connect()
            const createToken = await prisma.tokens.create({
                data: {
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

    async getToken(tokenID: string) {
        try {
            await prisma.$connect()
            const token = prisma.tokens.findFirst({
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
            const tokens = prisma.tokens.findMany({
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

    async deleteToken(tokenID: string) {
        try {
            await prisma.$connect()
            const token = prisma.tokens.delete({
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