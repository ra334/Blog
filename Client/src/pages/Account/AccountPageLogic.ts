import axios from 'axios'

async function logOut(accessToken: string) {
	try {
		const response = await axios({
			method: 'post',
			url: 'http://localhost:8080/api/logout',
			data: {
				accessToken: accessToken,
			},
		})

		if (response.status === 200) {
			window.location.pathname = '/'
		} else {
			return false
		}
	} catch (err: any) {
		console.error('LogOut error: ' + err.message)
	}
}

export default logOut
