import Header from "../../components/layout/Header/Header"
import { getCookieValue } from "../../tools/getCookies";
import PageAccessDenied from "../AccessDenied/PageAccessDenied";

function SyntaxPage() {
    const accessToken = getCookieValue('accessToken');
    if (!accessToken) return <PageAccessDenied />

    return (
        <div className="container">
            <Header />
            <h1>SyntaxPage</h1>
        </div>
    )
}

export default SyntaxPage