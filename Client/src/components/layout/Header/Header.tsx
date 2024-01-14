import { Link } from "react-router-dom"
import './HeaderStyle.css'
import { useCookies } from 'react-cookie';
import { jwtDecode } from "jwt-decode";
import { PayloadType, TokensType } from '../../../types/tokens-type'
import verifyAccessToken from "../../../tools/verifyAccessToken";


function Header() {

    const [cookies] = useCookies();
    const isSignIn = Object.keys(cookies).length > 0 ? true : false

    if (isSignIn) {
        const tokens: TokensType = {
            accessToken: cookies.accessToken,
            refreshToken: cookies.refreshToken
        }

        verifyAccessToken.verifyTokens(tokens)
    }

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