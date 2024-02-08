import axios from "axios";

async function getArticles(accessToken: string, skip: number, take: number) {
    const host = import.meta.env.VITE_SERVER_HOST

    const data = await axios({
        method: "GET",
        url: host + '/api/articles/',
        params: {
            accessToken,
            skip,
            take
        }
    })

    return data
}

export default getArticles