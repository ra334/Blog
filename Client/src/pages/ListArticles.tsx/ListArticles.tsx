import './ListArticles.css';
import Header from '../../components/layout/Header/Header';
import { getCookieValue } from '../../tools/getCookies';
import PageAccessDenied from '../AccessDenied/PageAccessDenied';
import { useState, useEffect } from 'react';
import getArticles from './ListArticles-logic';

import arrow from '../../assets/right-arrow.png'

function ListArticles() {
    const [articles, setArticles] = useState([]);

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
                    {articles.map((article, index) => ( // Corrected mapping
                        <div className="listarticle__content-item" key={index}>
                            <h3 className="listarticle__content-title">{article.title}</h3>
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

                        <div className="listarticle__pagination-item">
                            <button>1</button>
                            <button>...</button>
                            <button>20</button>
                        </div>

                        <button className="pagination__button-item">
                            Next
                            <img className='pagination__button-icon next__img' src={arrow} alt="next" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListArticles;
