import { useEffect, useState } from "react"
import Header from "../../components/layout/Header/Header"
import { useParams } from "react-router-dom";
import getArticle from "./ArticleLogic";

interface ResponseData {
    created_at: string;
    id: string;
    text: string;
    title: string;
    user_id: string;
}

function ArticlePage() {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [date, setDate] = useState('')

    const { id } = useParams();

    useEffect(() => {
        async function response() {
            if (id) {
                const response = await getArticle(id)
                if (response) {
                    const data = response.data as ResponseData

                    setTitle(data.title)
                    setText(data.text)
                    setDate(data.created_at)
                }
            }
        }

        response()
    })

    return (
        <div className="container">
            <Header />
            <h1>{title}</h1>
            <div className="date">{date}</div>
            <p>{text}</p>
        </div>
    )
}

export default ArticlePage