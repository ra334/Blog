import './ListArticles.css';
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
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
    const [page, setPage] = useState({
        skip: 0,
        take: 5
    });

    useEffect(() => {
        async function fetchData() {
            const response = await getArticles(page.skip, page.take);
            setArticles(response.data);
        }

        fetchData()
    }, [])

    function nextPage() {
        setPage({
            skip: page.skip + 5,
            take: page.take
        })
    }

    function prevPage() {
        if (page.skip === 0) return

        setPage({
            skip: page.skip - 5,
            take: page.take
        })
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
                        <button className="pagination__button-item" onClick={prevPage}>
                            <img className='pagination__button-icon prev__img' src={arrow} alt="prev" />
                            Prev
                        </button>

                        <button className="pagination__button-item" onClick={nextPage}>
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
