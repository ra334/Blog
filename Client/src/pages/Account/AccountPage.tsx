import Header from '../../components/layout/Header/Header'
import PageAccessDenied from '../AccessDenied/PageAccessDenied'
import { getCookieValue } from '../../tools/getCookies'
import logOut from './AccountPageLogic'

function Account() {
	const accessToken = getCookieValue('accessToken')
	if (!accessToken) return <PageAccessDenied />

	return (
		<div className="container">
			<Header />
			<h1>Account</h1>
			<button onClick={logOut}>LogOut</button>
		</div>
	)
}

export default Account
