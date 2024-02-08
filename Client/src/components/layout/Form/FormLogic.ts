import axios from 'axios'

async function subbmiting(login: string, nickname: string, password: string) {
	const host = import.meta.env.VITE_SERVER_HOST

	const response = await axios({
		method: 'post',
		url: host + '/api/users/' + window.location.pathname,
		data: {
			login,
			nickname,
			password,
		},
		withCredentials: true,
	})

	if (response.status === 200) {
		window.history.pushState({}, 'undefined', '/')
		window.location.reload()
	} else {
		return { code: response.status, message: response.data.message }
	}
}

export default subbmiting
