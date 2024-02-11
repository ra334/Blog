import { NextFunction, Request, Response} from "express";
import articleService from "../services/article-service";
import tokensService from "../services/tokens-service";
import ApiError from "../error/ApiError";

interface ArticlesRequestQuery {
    accessToken?: string;
    skip?: string;
    take?: string;
}

interface GetArticleRequestQuery {
    id?: string;
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
        const { id } = req.params as GetArticleRequestQuery
        const article = await articleService.getArticle(id || '')
        res.status(200).json(article)
    }

    async getArticles(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken, skip, take } = req.query as ArticlesRequestQuery

            if (accessToken && typeof accessToken === 'string' && tokensService.verifyToken(accessToken)) {
                const articles = await articleService.getLastArticles(Number(skip), Number(take))

                if (articles == false) {
                    res.status(200).json([])
                } else {
                    const preview_articles = []

                    for (const item of articles) {
                        const id = item.id
                        const user_id = item.user_id
                        const created_at = item.created_at
                        const title = item.title
                        const text = item.text

                        const sentences = text.split('.').slice(0, 3).join('.') + ' ...';

                        preview_articles.push({
                            id, user_id, created_at, title, text: sentences
                        })
                    }

                    res.status(200).json(preview_articles)
                }
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