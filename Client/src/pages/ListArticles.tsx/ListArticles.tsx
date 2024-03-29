import './ListArticles.css';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import { getCookieValue } from '../../tools/getCookies';
import PageAccessDenied from '../AccessDenied/PageAccessDenied';
import { useState, useEffect } from 'react';
import getArticles from './ListArticles-logic';

import arrow from '../../assets/right-arrow.png'
import { Link } from 'react-router-dom';

interface ArticleInterface {
    id: string;
    title: string;
    text: string;
}

function ListArticles() {
    const [articles, setArticles] = useState<ArticleInterface[]>([]);

    useEffect(() => {
        async function fetchData() {
            const accessToken = getCookieValue('accessToken');
            if (!accessToken) return;
            try {
                const response = await getArticles(accessToken, 0, 5);
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error)
            }
        }

        fetchData()
    }, [])

    const accessToken = getCookieValue('accessToken');
    if (!accessToken) {
        return <PageAccessDenied />
    }

    return (
        <div className="container">
            <Header />
            <div className="listarticles">
                <div className="listarticle__title">
                    <h1 className='listarticle__title-item'>Last articles</h1>
                </div>
                <div className="listarticle__content">
                    {articles.map((article, index) => (
                        <div className="listarticle__content-item" key={index}>
                            <Link className="listarticle__content-title" to={article.id}>{article.title}</Link>
                            <p className="listarticle__content-preview">{article.text}</p>
                        </div>
                    ))}
                </div>
                <div className="listarticle__pagination">
                    <div className="listarticle__pagination-button">
                        <button className="pagination__button-item">
                            <img className='pagination__button-icon prev__img' src={arrow} alt="prev" />
                            Prev
                        </button>

                        <button className="pagination__button-item">
                            Next
                            <img className='pagination__button-icon next__img' src={arrow} alt="next" />
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ListArticles;
