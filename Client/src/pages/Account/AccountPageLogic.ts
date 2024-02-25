import axios from "axios"

export function logOut() {
	document.cookie = 'accessToken' + '=; Max-Age=0'
	document.cookie = 'refreshToken' + '=; Max-Age=0'
	window.location.href = '/'
}

export async function changeNickname(newNickname: string, password: string): Promise<boolean> {
	const host = import.meta.env.VITE_SERVER_HOST

	const response = await axios({
		method: 'POST',
		url: host + 'api/change/nickname',
		data: {
			newNickname,
			password
		}
	})

	if (response.status === 200) {
		return true
	} else {
		return false
	}
}

export async function changeLogin(newLogin: string, password: string): Promise<boolean> {
	const host = import.meta.env.VITE_SERVER_HOST

	const response = await axios({
		method: 'POST',
		url: host + 'api/change/login',
		data: {
			newLogin,
			password
		}
	})

	if (response.status === 200) {
		return true
	} else {
		return false
	}
}

export async function chnagePassword(newPassword: string, oldPassword: string): Promise<boolean> {
	const host = import.meta.env.VITE_SERVER_HOST

	const response = await axios({
		method: 'POST',
		url: host + 'api/change/nickname',
		data: {
			newPassword,
			oldPassword
		}
	})

	if (response.status === 200) {
		return true
	} else {
		return false
	}
}