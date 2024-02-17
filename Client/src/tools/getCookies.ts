interface TokensInterface {
	[key: string]: string
}

export function getCookieValue(key: string): string {
	const cookiesString = document.cookie
	const regex = new RegExp(`${key}=([^;]+)`)
	const match = cookiesString.match(regex)
	return match ? match[1] : ''
}

export function getCookies(): TokensInterface | null {
	const cookies = document.cookie.split(';')

	if (cookies.length === 0) return null

	const cookieObj: TokensInterface = {}

	cookies.forEach(cookie => {
		const parts = cookie.trim().split('=')
		const name = parts[0]
		const value = parts.slice(1).join('=')
		cookieObj[name] = decodeURIComponent(value)
	})

	return cookieObj
}
