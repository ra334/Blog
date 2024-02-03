import axios from "axios";

async function getArticles(accessToken: string, skip: number, take: number) {
    const data = await axios({
        method: "GET",
        url: 'http://localhost:5050/api/articles/',
        params: {
            accessToken,
            skip,
            take
        }
    })

    return data
}

export default getArticles