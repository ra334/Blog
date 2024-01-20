import { useState } from 'react';
import './WriteArticle.css';
import Button from '../../components/UI/Button/Button';
import Header from '../../components/layout/Header/Header';
import writeArticleLogic from './WriteArticle-logic';
import { getCookieValue } from '../../tools/getCookies';
import PageAccessDenied from '../AccessDenied/PageAccessDenied';


function WriteArticle() {
    const [text, setText] = useState("")

    const accessToken = getCookieValue('accessToken');
    if (!accessToken) return <PageAccessDenied />

    const handlePreviewClick = () => {
        console.log('Preview clicked:', 'text');
    };

    const handleSaveClick = () => {
        const firstLine = text.split('\n')[0]

        writeArticleLogic.saveArticle(accessToken, firstLine, text)
    };

    return (
        <div className="container">
            <Header />
            <div className="article">
                <div className="article__title">
                    <h1>Write new article</h1>
                </div>
                <div className="article__content-wrapper">
                    <textarea
                        className='article__textarea'
                        id="textarea"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                <div className="article__button">
                    <Button onClick={handlePreviewClick} text="Preview" />
                    <Button onClick={handleSaveClick} text='Save and publish' />
                </div>
            </div>
        </div>
    );
}

export default WriteArticle;
