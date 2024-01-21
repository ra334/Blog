import { Request, Response} from "express";
import articleService from "../services/article-service";
import tokensService from "../services/tokens-service";
import ApiError from "../error/ApiError";


class ArticleController {
    async createArticle(req: Request, res: Response){
        const { accessToken, title, text } = req.body
        if (tokensService.vefiryToken(accessToken)) {
            const tokenData = tokensService.decodeToken(accessToken)
            const userID = tokenData.id
            await articleService.createArticle(userID, title, text)
            res.status(200).send('Article created successfully')
        } else {
            throw ApiError.forbidden('Invalid access token')
        }
    }

    async getArticle(req: Request, res: Response) {
        const { accessToken, articleID } = req.body
        if (tokensService.vefiryToken(accessToken)) {
            const article = await articleService.getArticle(articleID)
            res.json(article)
        } else {
            throw ApiError.forbidden('Invalid access token')
        }
    }

    async getArticles(req: Request, res: Response) {

    }

    async deleteArticle(req: Request, res: Response) {

    }
}

export default new ArticleController()