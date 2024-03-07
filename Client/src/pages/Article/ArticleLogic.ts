import axios from "axios";

export async function getArticle(article_id: string) {
    const host = import.meta.env.VITE_SERVER_HOST

    const response = await axios({
        method: 'GET',
        url: host + '/api/articles/' + article_id,
    })

    if (response.status === 200) {
        return response
    }
}

export async function getUserNickname(userID: string) {
    const host = import.meta.env.VITE_SERVER_HOST

    const response = await axios({
        method: 'GET',
        url: host + '/api/users/nickname/' + userID
    })

    if (response.status === 200) {
        return response
    }
}

export async function getUserImage(userID: string) {
    const host = import.meta.env.VITE_SERVER_HOST

    const response = await axios({
        method: 'GET',
        url: host + '/api/users/image/' + userID
    })

    if (response.status === 200) {
        return response
    }
}