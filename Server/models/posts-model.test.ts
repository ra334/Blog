import userModel from "./users-model";
import postsModel from "./posts-model";
import { expect, test, vi, describe, afterAll, beforeAll } from "vitest";
import user from "../data/user-data";
import {v4 as uuidv4} from 'uuid'

vi.mock("libs/prisma");

const postID = uuidv4()
const postTitle = uuidv4()
const postText = 'text'
const newTitle = uuidv4()
const newText = 'text2'

describe('post model', () => {

    afterAll(async () => {
        await userModel.deleteUser(user.id)
    })

    beforeAll(async () => {
        await userModel.createUser(
            user.id,
            user.login,
            user.nickname, 
            user.password,
            user.profile_picture
        )
    })

    test('should create a post', async () => {
        const result = await postsModel.createPost(
            postID,
            user.id,
            postTitle,
            postText
        )

        if (result) {
            const { user_id, title } = result
            
            expect(user_id).toBe(user.id)
            expect(title).toBe(postTitle)
        }
    })

    test('should get a post', async () => {
        const result = await postsModel.getPost(postID)

        if (result) {
            const { id, title } = result

            expect(id).toBe(postID)
            expect(title).toBe(postTitle)
        }
    })

    test('should get posts', async () => {
        const result = await postsModel.getPosts(user.id)

        if (result) {
            expect(result).toHaveLength(1)
        }
    })

    test('should update a post title', async () => {
        const result = await postsModel.updateTitle(
            postID,
            newTitle
        )

        if (result) {
            const { id, title } = result

            expect(id).toBe(postID)
            expect(title).toBe(newTitle)
        }
    })

    test('should update a post text', async () => {
        const result = await postsModel.updateText(postID, newText)

        if (result) {
            const { id, text } = result

            expect(id).toBe(postID)
            expect(text).toBe(newText)
        }
    })

    test('should delete a post', async () => {
         const result = await postsModel.deletePost(postID)

         if (result) {
            const { id, title } = result
            expect(id).toBe(postID)
            expect(title).toBe(newTitle)
         }
    })
})