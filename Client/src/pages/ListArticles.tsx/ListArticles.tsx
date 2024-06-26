import './ListArticles.css';
import Header from '../../components/layout/Header/Header';
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
        current: 1,
        skip: 0,
        take: 5
    });

    useEffect(() => {
        async function fetchData() {
            const response = await getArticles(page.skip, page.take);
            setArticles(response.data);
        }

        fetchData()
    }, [page])

    function nextPage() {
        setPage({
            current: page.current + 1,
            skip: page.skip + 5,
            take: page.take
        })
    }

    function prevPage() {
        if (page.skip === 0) return

        setPage({
            current: page.current - 1,
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

                        <div className="listarticle__pagination-currentpage">
                            {page.current}
                        </div>

                        <button className="pagination__button-item" onClick={nextPage}>
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
