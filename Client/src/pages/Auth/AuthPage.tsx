import Form from '../../components/layout/Form/Form';
import Header from '../../components/layout/Header/Header';
import './AuthPage.css';

function AuthPage(action: string) {
    return (
        <div className="container">
            <div className="auth__wrapper">
                <Header />
                <div className="auth">
                    {
                        action === 'registration' ? (
                            <Form h1Text="Registration" />
                        ) : (
                            <Form h1Text="Sign In" />
                        )
                    }
            </div>
            </div>
        </div>
    );
}

export default AuthPage;
