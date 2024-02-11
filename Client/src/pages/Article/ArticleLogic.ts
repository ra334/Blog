import axios from "axios";

async function getArticle(article_id: string) {
    const host = import.meta.env.VITE_SERVER_HOST

    const response = await axios({
        method: 'GET',
        url: host + '/api/articles/' + article_id,
    })

    if (response.status === 200) {
        return response
    }
}

export default getArticle