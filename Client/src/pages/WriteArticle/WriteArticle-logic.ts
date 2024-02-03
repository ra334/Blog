import axios from 'axios'

class WriteArticleLogic {
	async saveArticle(accessToken: string, title: string, text: string) {
		const response = await axios({
			method: 'post',
			url: 'http://localhost:5050/api/articles/create',
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
