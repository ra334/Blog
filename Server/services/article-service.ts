import { v4 as uuidv4 } from 'uuid';
import postsModel from "../models/posts-model"


class ArticleService {
    

    async createArticle(
        userID: string,
        title: string,
        text: string
    ) {
        try {
            const articleID = uuidv4()
            await postsModel.createPost(articleID, userID, title, text)
            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async getArticle(postID: string) {
        try {
            const article = await postsModel.getPost(postID)
            return article
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async getArticles(userID: string) {
        try {
            const articles = await postsModel.getPosts(userID)
            return articles
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async updateArticleTitle(postID: string, title: string) {
        try {
            await postsModel.updateTitle(postID, title)
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async updateArticleText(postID: string, text: string) {
        try {
            await postsModel.updateText(postID, text)
        } catch (e) {
            console.error(e)
            return false
        }
    }

    async deleteArticle(postID: string) {
        try {
            await postsModel.deletePost(postID)
        } catch (e) {
            console.error(e)
            return false
        }
    }
}

export default new ArticleService()