export type PayloadType = {
	id: string
	role: string
	nickname: string
	iat: number
	exp: number
}

export interface TokensType {
	accessToken: string
	refreshToken: string
}
