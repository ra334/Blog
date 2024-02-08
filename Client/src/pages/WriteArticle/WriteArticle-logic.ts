import axios from 'axios'

class WriteArticleLogic {
	async saveArticle(accessToken: string, title: string, text: string) {
		const host = import.meta.env.VITE_SERVER_HOST

		const response = await axios({
			method: 'post',
			url: host + '/api/articles/create',
			data: {
				accessToken,
				title,
				text,
			},
		})

		if (response.status === 200) {
			return true
		}

		return false
	}

	preview() {
		console.log('preview')
	}
}

export default new WriteArticleLogic()
