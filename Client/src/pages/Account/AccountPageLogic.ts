async function logOut() {
	document.cookie = 'accessToken' + '=; Max-Age=0'
	document.cookie = 'refreshToken' + '=; Max-Age=0'
	window.location.href = '/'
}

export default logOut
