import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class PhotoModel {
    async createPhotoIMG(
        photoID: string, 
        postID: string, 
        image: Buffer
        ) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.create({
                data: {
                    id: photoID,
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

    async createPhotoURL(photoID: string, postID: string, url: string) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.create({
                data: {
                    id: photoID,
                    post_id: postID,
                    url
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

    async getPhotoByID(photoID: string) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.findFirst({
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

    async getPhotos(postID: string) {
        try {
            await prisma.$connect()
            const photo = await prisma.photos.findMany({
                where: {post_id: postID}
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