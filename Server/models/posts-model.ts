import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PostModel {
    async createPost(
        postID: string, 
        userID: string, 
        title: string, 
        text: string) {
        try {
            await prisma.$connect()
            const post = await prisma.posts.create({
                data: {
                    id: postID,
                    user_id: userID,
                    title,
                    text
                }
            })

            return post
        } catch (e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getPost(postID: string) {
        try {
            await prisma.$connect()
            const post = await prisma.posts.findFirst({
                where: {id: postID}
            })

            return post
        } catch (e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async getPosts(userID: string) {
        try {
            await prisma.$connect()
            const posts = await prisma.posts.findMany({
                where: {user_id: userID}
            })

            return posts
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateTitle(postID: string, title: string) {
        try {
            await prisma.$connect()
            const post = await prisma.posts.update({
                where: {id: postID},
                data: {title}
            })

            return post
        } catch (e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updateText(postID: string, text: string) {
        try {
            await prisma.$connect()
            const post = await prisma.posts.update({
                where: {id: postID},
                data: {text}
            })

            return post
        } catch (e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async deletePost(postID: string) {
        try {
            await prisma.$connect()
            const post = await prisma.posts.delete({
                where: {id: postID}
            })

            return post
        } catch (e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }
}

export default new PostModel()