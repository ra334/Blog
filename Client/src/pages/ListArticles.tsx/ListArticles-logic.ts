import axios from "axios";

async function getArticles(skip: number, take: number) {
    const data = await axios({
        method: "GET",
        url: '/api/articles/',
        params: {
            skip,
            take
        }
    })

    return data
}

export default getArticles