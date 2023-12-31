import { Link } from "react-router-dom"

type HeaderPropsType = {
    isSignIn: boolean;
}

function Header(props: HeaderPropsType) {
    return (
        <header>
            <nav className="nav">
                <Link to="/login">Write</Link>
                <Link to="/registration">List articles</Link>
                <Link to="#">Search articles</Link>
            </nav>
        </header>
    )
}

export default Header