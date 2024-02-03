import { NextFunction, Request, Response} from "express";
import articleService from "../services/article-service";
import tokensService from "../services/tokens-service";
import ApiError from "../error/ApiError";

interface ArticlesRequestQuery {
    accessToken?: string;
    skip?: string;
    take?: string;
}

class ArticleController {
    async createArticle(req: Request, res: Response){
        const { accessToken, title, text } = req.body
        if (tokensService.verifyToken(accessToken)) {
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
        if (tokensService.verifyToken(accessToken)) {
            const article = await articleService.getArticle(articleID)
            res.json(article)
        } else {
            throw ApiError.forbidden('Invalid access token')
        }
    }

    async getArticles(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken, skip, take } = req.query as ArticlesRequestQuery

            if (accessToken && typeof accessToken === 'string' && tokensService.verifyToken(accessToken)) {
                const articles = await articleService.getLastArticles(Number(skip), Number(take))
                res.status(200).json(articles)
            } else {
                throw ApiError.forbidden('Invalid access token')
            }
        } catch (err) {
            next(err)
        }
    }

    async deleteArticle(req: Request, res: Response, next: NextFunction) {
        try {
            const { acceessToken, articleID } = req.body

            const isAccessTokenValid = tokensService.verifyToken(acceessToken)

            if (isAccessTokenValid) {
                await articleService.deleteArticle(articleID)
                res.status(200).json({message: 'done'})
            }

        } catch (err) {
            next(err)
        }
    }
}

export default new ArticleController()