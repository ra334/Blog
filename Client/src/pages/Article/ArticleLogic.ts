import axios from "axios";

export async function getArticle(article_id: string) {
    const response = await axios({
        method: 'GET',
        url: '/api/articles/' + article_id,
    })

    if (response.status === 200) {
        return response
    }
}

export async function getUserNickname(userID: string) {
    const response = await axios({
        method: 'GET',
        url: '/api/users/nickname/' + userID
    })

    if (response.status === 200) {
        return response
    }
}

export async function getUserImage(userID: string) {
    const response = await axios({
        method: 'GET',
        url: '/api/users/image/' + userID
    })

    if (response.status === 200) {
        return response
    }
}