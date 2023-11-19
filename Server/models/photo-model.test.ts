import photoModel from './photo-model'
import postsModel from './posts-model'
import usersModel from './users-model'
import { expect, test, vi, describe, afterAll, beforeAll } from "vitest";
import user from "../data/user-data";
import * as fs from "fs";
import {v4 as uuidv4} from 'uuid'

vi.mock("libs/prisma");

const postID = uuidv4()
const photoID_IMG = uuidv4()
const photoID_URL = uuidv4()

const title = uuidv4()

const forestIMG = 'assets/forest.jpg'
const fieldIMG = 'assets/field.jpg'
const forestURL = 'https://photo.com/forest.png'
const fieldURL = 'https://photo.com/field.png'

describe('photo model', () => {

    beforeAll(async () => {
        await usersModel.createUser(
            user.id,
            user.login,
            user.nickname,
            user.password,
            user.profile_picture
        )
        await postsModel.createPost(postID, user.id, title, 'text')
        
    })

    afterAll(async () => {
        await postsModel.deletePost(postID)
        await usersModel.deleteUser(user.id)
    })

    describe('test photo img', () => {
        test('should create a new photo(IMG) for post', async () => {
            const forestBuffer = fs.readFileSync(forestIMG)
            const result = await photoModel.createPhotoIMG(photoID_IMG, postID, forestBuffer)
    
            const { id, image } = result
            expect(id).toBe(photoID_IMG)
            expect(image).toEqual(forestBuffer)
        })
    
        test('should update the photo(IMG)', async () => {
            const fieldBuffer = fs.readFileSync(fieldIMG)
            const result = await photoModel.updatePhotoIMG(photoID_IMG, fieldBuffer)

            const { id, image } = result
            expect(id).toBe(photoID_IMG)
            expect(image).toEqual(fieldBuffer)
        })
    
        test('should delete the photo(IMG)', async () => {
            const result = await photoModel.deletePhoto(photoID_IMG)
    
            const { id, post_id } = result
    
            expect(id).toBe(photoID_IMG)        
            expect(post_id).toEqual(postID)
        })
    })

    describe('test photo url', () => {
        test('should create a new photo(URL) for post', async () => {
            const result = await photoModel.createPhotoURL(photoID_URL, postID, forestURL)
    
            const { id, url } = result
            expect(id).toBe(photoID_URL)
            expect(url).toBe(forestURL)
        })
    
        test('should update the photo url(URL)', async () => {
            const result = await photoModel.updatePhotoURL(photoID_URL, fieldURL)

            const { id, url } = result
            expect(id).toBe(photoID_URL)
            expect(url).toBe(fieldURL)
        }) 
    
        test('should delete the photo(URL)', async () => {
            const result = await photoModel.deletePhoto(photoID_URL)
    
            const { id, url } = result
    
            expect(id).toBe(photoID_URL)
            expect(url).toBe(fieldURL)
        })
    })
})