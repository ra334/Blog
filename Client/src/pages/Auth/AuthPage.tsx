import Form from '../../components/layout/Form/Form'
import './AuthPage.css'

function AuthPage(action: string) {

    if (action === 'registration') {
        return (
            <Form h1Text="Registration" />
        )
    } else {
        return (
            <Form h1Text="Sign In" />
        )
    }
}

export default AuthPage