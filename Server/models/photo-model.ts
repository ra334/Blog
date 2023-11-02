import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PhotoModel {
    async createPhoto(postID: string, image: Buffer) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.create({
                data: {
                    post_id: postID,
                    image 
                }
            })
            
            return photo
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updatePhotoURL(photoID: string, url: string) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.update({
                where: {id: photoID},
                data: {url}
            })

            return photo
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async updatePhotoIMG(photoID: string, image: Buffer) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.update({
                where: {id: photoID},
                data: {image}
            })

            return photo
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }

    async deletePhoto(photoID: string) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.delete({
                where: {id: photoID}
            })

            return photo
        } catch(e) {
            console.error(e)
            throw(e)
        } finally {
            await prisma.$disconnect()
        }
    }
}

export default new PhotoModel()