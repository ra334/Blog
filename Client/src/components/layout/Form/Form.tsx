import ErrorComponent from '../../UI/ErrorComponent/ErrorComponent'
import './Form.css'

import subbmiting from './FormLogic'
import { useState } from 'react'

type FormProps = {
	h1Text: string
}

function Form(props: FormProps) {
	const [login, setLogin] = useState('')
	const [nickname, setNickname] = useState('')
	const [password, setPassword] = useState('')
	const [errorMsg, setErrorMsg] = useState('')

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		try {
			await subbmiting(login, nickname, password)
		} catch (err: any) {
			const errorMessage = err.response.data.message

			let borderColor = ''

			if (errorMessage === 'Invalid login') {
				borderColor = 'red'
				document.documentElement.style.setProperty(
					'--login-border-color',
					borderColor,
				)
			}

			if (errorMessage === 'Invalid nickname') {
				borderColor = 'red'
				document.documentElement.style.setProperty(
					'--nickname-border-color',
					borderColor,
				)
			}

			if (errorMessage === 'Invalid password') {
				borderColor = 'red'
				document.documentElement.style.setProperty(
					'--password-border-color',
					borderColor,
				)
			}

			setErrorMsg(errorMessage)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="form__wrapper">
			<h1 className="title">{props.h1Text}</h1>
			<ErrorComponent message={errorMsg} />
			<div className="input__wrapper">
				<input
					style={{ borderColor: 'var(--login-border-color)' }}
					type="text"
					placeholder="Login"
					value={login}
					onChange={e => {
						setLogin(e.target.value)
						document.documentElement.style.setProperty(
							'--login-border-color',
							'inherit',
						)
					}}
				/>
			</div>
			<div className="input__wrapper">
				<input
					style={{ borderColor: 'var(--nickname-border-color)' }}
					type="text"
					placeholder="Nickname"
					value={nickname}
					onChange={e => {
						setNickname(e.target.value)
						document.documentElement.style.setProperty(
							'--nickname-border-color',
							'inherit',
						)
					}}
				/>
			</div>
			<div className="input__wrapper">
				<input
					style={{ borderColor: 'var(--password-border-color)' }}
					type="password"
					placeholder="Password"
					value={password}
					onChange={e => {
						setPassword(e.target.value)
						document.documentElement.style.setProperty(
							'--password-border-color',
							'inherit',
						)
					}}
				/>
			</div>
			<button type="submit">{props.h1Text}</button>
		</form>
	)
}

export default Form
