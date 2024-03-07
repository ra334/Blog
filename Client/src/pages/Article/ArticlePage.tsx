import { useEffect, useState } from "react"
import Header from "../../components/layout/Header/Header"
import Footer from "../../components/layout/Footer/Footer";
import { useParams } from "react-router-dom";
import getArticle from "./ArticleLogic";
import './ArticlePage.css'
import getMounth from "../../tools/getMounth";

interface ResponseData {
    created_at: string;
    id: string;
    text: string;
    title: string;
    user_id: string;
}

function getDate(date: string): string {
    const dateTime = new Date(date)

    const year = dateTime.getFullYear()
    const month = dateTime.getMonth() + 1
    const day = dateTime.getDate()

    return `${getMounth(month)} ${day} ${year}`
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
    }, [id])

    return (
        <div className="container">
            <Header />
            <div className="article__content">
                <h1 className="title">{title}</h1>
                <div className="article__author">
                    <div className="article__date">{getDate(date)}</div>
                </div>
                <p className="article__text">{text}</p>
            </div>
            <Footer />
        </div>
    )
}

export default ArticlePage