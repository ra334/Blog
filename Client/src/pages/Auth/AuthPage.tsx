import Form from '../../components/layout/Form/Form'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import './AuthPage.css'

interface AuthPageProps {
	action: string
}

function AuthPage(props: AuthPageProps) {
	return (
		<div className="container">
			<div className="auth__wrapper">
				<Header />
				<div className="auth">
					{props.action === 'registration' ? (
						<Form h1Text="Registration" />
					) : (
						<Form h1Text="Sign In" />
					)}
				</div>
				<Footer />
			</div>
		</div>
	)
}

export default AuthPage
