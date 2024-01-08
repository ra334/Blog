import { Link } from "react-router-dom"
import './HeaderStyle.css'
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";


function Header() {

    type PayloadType = {
        id: string,
        role: string,
        nickname: string,
        iat: number,
        exp: number
    }

    const [cookies] = useCookies();
    const isSignIn = cookies.keys ? true : false

    function signIn(isSignIn: boolean) {
        if (isSignIn) {
            const payload: PayloadType = jwtDecode(cookies.accessToken);
            const accountName = payload.nickname
            return (
                <Link className="header__link" to="/account">{accountName}</Link>
            )
        }

        return (
            <div className="signIn">
                <Link className="header__link" to="/login">SignIn</Link>
                <div className="signIn__slash">/</div>
                <Link className="header__link" to="/registration">Registration</Link>
            </div>
        )
    }

    return (
        <header>
            <nav className="nav">
                <Link className="header__link" to="/" >Main page</Link>
                <Link className="header__link" to="/write">Write</Link>
                <Link className="header__link" to="/articles">List articles</Link>
                {signIn(isSignIn)}
            </nav>
        </header>
    )
}

export default Header