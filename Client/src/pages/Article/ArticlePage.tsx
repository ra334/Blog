import { useEffect, useState } from "react"
import Header from "../../components/layout/Header/Header"
import { useParams } from "react-router-dom";
import {getArticle, getUserNickname, getUserImage} from "./ArticleLogic";
import './ArticlePage.css'
import getMounth from "../../tools/getMounth";
import { Buffer } from 'buffer'

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
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const { id } = useParams();

    useEffect(() => {
        async function response() {
            if (id) {
                const response = await getArticle(id)
                if (response) {
                    const data = response.data as ResponseData

                    const nicknameResponse = await getUserNickname(data.user_id)
                    const imageResponse = await getUserImage(data.user_id)

                    const base64Image = `data:image/png;base64,${Buffer.from(imageResponse?.data.image.data).toString('base64')}`;

                    setImage(base64Image)
                    setNickname(nicknameResponse?.data.nickname)

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
                <div className="article__about">
                    <img src={image} alt="Author" className="article__author-image" />
                    <div className="article__author">{nickname}</div>
                    <div className="article__author-date">{getDate(date)}</div>
                </div>
                <pre className="article__text">{text}</pre>
            </div>
        </div>
    )
}

export default ArticlePage