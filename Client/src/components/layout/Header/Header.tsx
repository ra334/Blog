import { Link } from "react-router-dom";
import './HeaderStyle.css';
import { jwtDecode } from "jwt-decode";
import { PayloadType, TokensType } from '../../../types/tokens-type';
import verifyAccessToken from "../../../tools/verifyAccessToken";
import { getCookies } from "../../../tools/getCookies";

function Header() {
    const cookies = getCookies();

    if (!cookies) {
        return (
            <header>
                <nav className="nav">
                    <Link className="header__link" to="/">Main page</Link>
                    <Link className="header__link" to="/write">Write</Link>
                    <Link className="header__link" to="/articles">List articles</Link>
                    <Link className="header__link" to="/syntax">Article syntax</Link>
                    <div className="signIn">
                        <Link className="header__link" to="/login">SignIn</Link>
                        <div className="signIn__slash">/</div>
                        <Link className="header__link" to="/registration">Registration</Link>
                    </div>
                </nav>
            </header>
        );
    }

    const isSignIn = Object.keys(cookies).length > 0;

    if (isSignIn) {
        const tokens: TokensType = {
            accessToken: cookies.accessToken,
            refreshToken: cookies.refreshToken
        };

        verifyAccessToken.verifyTokens(tokens);

        if (cookies.accessToken) {
            const payload: PayloadType = jwtDecode(cookies.accessToken);
            const accountName = payload.nickname;
            return (
                <header>
                    <nav className="nav">
                        <Link className="header__link" to="/" >Main page</Link>
                        <Link className="header__link" to="/write">Write</Link>
                        <Link className="header__link" to="/articles">List articles</Link>
                        <Link className="header__link" to="/syntax">Article syntax</Link>
                        <Link className="header__link" to="/account">{accountName}</Link>
                    </nav>
                </header>
            );
        }
    }

    return (
        <header>
            <nav className="nav">
                <Link className="header__link" to="/" >Main page</Link>
                <Link className="header__link" to="/write">Write</Link>
                <Link className="header__link" to="/articles">List articles</Link>
                <Link className="header__link" to="/syntax">Article syntax</Link>
                <div className="signIn">
                    <Link className="header__link" to="/login">SignIn</Link>
                    <div className="signIn__slash">/</div>
                    <Link className="header__link" to="/registration">Registration</Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
