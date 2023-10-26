import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserModel {
    async createUser(
        userID: string,
        nickname: string,
        password: string,
        profilePicture: Buffer
    ) {
        await prisma.$connect()
        try {
            const user = prisma.users.create({
                data: {
                    id: userID,
                    nickname,
                    password,
                    profile_picture: profilePicture
                }
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getUser(userID: string) {
        await prisma.$connect()
        try {
            const user = prisma.users.findFirst({
                where: {id: userID}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateUserNickname(userID: string, nickname: string) {
        await prisma.$connect()
        try {
            const user = prisma.users.update({
                where: {id: userID},
                data: {nickname: nickname}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateUserPassword(userID: string, password: string) {
        await prisma.$connect()
        try {
            const user = prisma.users.update({
                where: {id: userID},
                data: {password: password}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateUserRole(userID: string, role: string) {
        await prisma.$connect()
        try {
            const user = prisma.users.update({
                where: {id: userID},
                data: {role}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateUserLastLogin(userID: string, lastLogin: object) {
        await prisma.$connect()
        try {
            const user = prisma.users.update({
                where: {id: userID},
                data: {last_login: lastLogin}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateUserAccountStatus(userID: string, accountStatus: string) {
        await prisma.$connect()
        try {
            const user = prisma.users.update({
                where: {id: userID},
                data: {account_status: accountStatus}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }
    async updateUserProfilePicture(userID: string, profilePicture: object) {
        await prisma.$connect()
        try {
            const user = prisma.users.update({
                where: {id: userID},
                data: {profile_picture: profilePicture}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async deleteUser(userID: string) {
        await prisma.$connect()
        try {
            const user = prisma.users.delete({
                where: {id: userID}
            })

            return user
        } catch(e) {
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }
}