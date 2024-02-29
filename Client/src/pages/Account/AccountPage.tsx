import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import PageAccessDenied from '../AccessDenied/PageAccessDenied'
import { getCookieValue } from '../../tools/getCookies'
import { logOut, changeLogin, chnagePassword, changeNickname } from './AccountPageLogic'
import './AccountPage.css'

import { useState } from 'react'

function Account() {
	const [nickname, setNickname] = useState('')
	const [login, setLogin] = useState('')
	const [newPassword, setNewPassword] = useState('')

	const [loginPassword, setLoginPassword] = useState('')
	const [nicknamePassword, setNicknamePassword] = useState('')
	const [password, setPassword] = useState('')

	const [nicknameSuccess, setNicknameSuccess] = useState(false)
	const [loginSuccess, setLoginSuccess] = useState(false)
	const [passwordSuccess, setPasswordSuccess] = useState(false)

	const accessToken = getCookieValue('accessToken')
	if (!accessToken) return <PageAccessDenied />

	async function tryChangeNickname(event: { preventDefault: () => void }) {
		event.preventDefault()

		const isSuccess = await changeNickname(accessToken, nickname, nicknamePassword)
		setNicknameSuccess(isSuccess)
	}

	async function tryChangeLogin(event: { preventDefault: () => void }) {
		event.preventDefault()
		const isSuccess = await changeLogin(accessToken, login, loginPassword)
		setLoginSuccess(isSuccess)
	}

	async function tryChangePassword(event: { preventDefault: () => void }) {
		event.preventDefault()
		const isSuccess = await chnagePassword(accessToken, newPassword, password)
		setPasswordSuccess(isSuccess)
	}

	return (
		<div className="container">
			<Header />
			<h1 className='account__title'>Account</h1>
			<div className="account__wrapper">
				<div className="account__buttons">
					<button className='account__buttons-item' onClick={logOut}>LogOut</button>
					<button className='account__buttons-item'>My articles</button>
				</div>
				<div className="account__chnage">
					<form onSubmit={tryChangeNickname} className="account__change-nickname">
						<h3>Chnage Nickname</h3>
						<input
							type="text"
							className="change__nickname-item"
							placeholder='New Nickname'
							onChange={(e) => setNickname(e.target.value)}
							value={nickname}/>
						<input
							type="password"
							className="change__nickname-item"
							placeholder='Password'
							onChange={(e) => setNicknamePassword(e.target.value)}
							value={nicknamePassword}/>

						{ nicknameSuccess &&
							<div className="chanange__success">
								Success
							</div>
						}

						<input className='input__button' type="submit" value="Save" />
					</form>
					<form onSubmit={tryChangeLogin} className="account__change-login">
						<h3>Chnage Login</h3>
						<input
							type="text"
							className="change__nickname-item"
							placeholder='New Login'
							onChange={(e) => setLogin(e.target.value)}
							value={login}/>
						<input
							type="password"
							className="change__nickname-item"
							placeholder='Password'
							onChange={(e) => setLoginPassword(e.target.value)}
							value={loginPassword}/>

						{ loginSuccess &&
							<div className="chanange__success">
								Success
							</div>
						}

						<input className='input__button' type="submit" value="Save" />
					</form>
					<form onSubmit={tryChangePassword} className="account__change-password">
						<h3>Chnage Password</h3>
						<input
							type="text"
							className="change__nickname-item"
							placeholder='New Password'
							onChange={(e) => setNewPassword(e.target.value)}
							value={newPassword}/>
						<input
							type="password"
							className="change__nickname-item"
							placeholder='Password'
							onChange={(e) => setPassword(e.target.value)}
							value={password}/>

						{ passwordSuccess &&
							<div className="chanange__success">
								Success
							</div>
						}

						<input className='input__button' type="submit" value="Save" />
					</form>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Account
