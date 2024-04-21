import axios from "axios";

async function getArticles(skip: number, take: number) {
    const host = import.meta.env.VITE_SERVER_HOST

    const data = await axios({
        method: "GET",
        url: host + '/api/articles/',
        params: {
            skip,
            take
        }
    })

    return data
}

export default getArticles