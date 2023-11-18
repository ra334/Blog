import userModel from "./users-model";
import postsModel from "./posts-model";
import { expect, test, vi, describe, afterAll, beforeAll } from "vitest";
import prismaAdapter from "../adapters/__mocks__/prisma-adapter";
import { User, Post } from "../types/test-types"
import user from "../data/user-data";

vi.mock("../adapters/__mock__/prisma-adapter.ts");

let postID = ''
const newTitle = 'title2'

describe('post model', () => {

    const mockPrismaCreateUser = (value: User) => {
        prismaAdapter.users.create.mockResolvedValue(value);
    }

    const mockPrismaDeleteUser = (value: User) => {
        prismaAdapter.users.delete.mockResolvedValue(value);
    }

    const mockPrismaCreatePost = (value: Post) => {
        prismaAdapter.posts.create.mockResolvedValue(value);
    }

    const mockPrismaGetOne = (value: Post) => {
        prismaAdapter.posts.findFirst.mockResolvedValue(value);
    }

    const mockPrismaGetMany = (value: Post) => {
        prismaAdapter.posts.findMany.mockResolvedValue([value]);
    }

    const mockPrismaUpdate = (value: Post) => {
        prismaAdapter.posts.update.mockResolvedValue(value);
    }

    const mockPrismaDeleteOne = (value: Post) => {
        prismaAdapter.posts.delete.mockResolvedValue(value);
    }

    const post: Post = {
        id: '',
        user_id: user.id,
        title: "title",
        text: "text"
    }

    afterAll(async () => {
        mockPrismaDeleteUser(user)

        const result = await userModel.deleteUser(user.id)

        const { id } = result
        expect(id).toBe(user.id)
    })

    beforeAll(async () => {
        mockPrismaCreateUser(user)

        const result = await userModel.createUser(
            user.id,
            user.login,
            user.nickname, 
            user.password,
            user.profile_picture
        )

        const { id } = result
        expect(id).toBe(user.id)
        
    })

    test('should create a post', async () => {
        mockPrismaCreatePost(post)

        const result = await postsModel.createPost(
            post.user_id,
            post.title,
            post.text
        )

        if (result) {
            const { id, user_id, title } = result
            
            postID = id
            expect(user_id).toBe(user.id)
            expect(title).toBe(post.title)
        }
    })

    test('should get a post', async () => {
        mockPrismaGetOne(post)

        const result = await postsModel.getPost(postID)

        if (result) {
            const { id, title } = result

            expect(id).toBe(postID)
            expect(title).toBe(post.title)
        }
    })

    test('should get posts', async () => {
        mockPrismaGetMany(post)

        const result = await postsModel.getPosts(user.id)

        if (result) {
            expect(result).toHaveLength(1)
        }
    })

    test('should update a post title', async () => {
        mockPrismaUpdate(post)

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
        const newText = 'text2'

        const result = await postsModel.updateText(postID, newText)

        if (result) {
            const { id, text } = result

            expect(id).toBe(postID)
            expect(text).toBe(newText)
        }
    })

    test('should delete a post', async () => {
         mockPrismaDeleteOne(post)

         const result = await postsModel.deletePost(postID)

         if (result) {
            const { id, title } = result
            expect(id).toBe(postID)
            expect(title).toBe(newTitle)
         }
    })
})