import { Link } from "react-router-dom"
import './HeaderStyle.css'

type HeaderPropsType = {
    isSignIn: boolean;
    accountName: string;
}

function Header(props: HeaderPropsType) {

    function signIn(isSignIn: boolean) {
        if (isSignIn) {
            return (
                <Link to="/account">{props.accountName}</Link>
            )
        }

        return (
            <div className="signIn">
                <Link to="/login">SignIn</Link>
                <div className="signIn__slash">/</div>
                <Link to="/registration">Registration</Link>
            </div>
        )
    }

    return (
        <header>
            <div className="container">
                <nav className="nav">
                    <Link to="/write">Write</Link>
                    <Link to="/articles">List articles</Link>
                    {signIn(props.isSignIn)}
                </nav>
            </div>
        </header>
    )
}

export default Header