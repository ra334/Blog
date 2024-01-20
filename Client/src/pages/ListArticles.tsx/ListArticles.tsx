import './ListArticles.css'
import Header from '../../components/layout/Header/Header'
import { getCookieValue } from '../../tools/getCookies';
import PageAccessDenied from '../AccessDenied/PageAccessDenied';

function ListArticles() {
    const accessToken = getCookieValue('accessToken');
    if (!accessToken) return <PageAccessDenied />

    return (
        <div className="container">
            <Header />
            <h1>Last articles</h1>
        </div>
    )
}

export default ListArticles