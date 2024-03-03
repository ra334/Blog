import { useState } from 'react'
import './WriteArticle.css'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import writeArticleLogic from './WriteArticle-logic'
import { getCookieValue } from '../../tools/getCookies'
import PageAccessDenied from '../AccessDenied/PageAccessDenied'

function WriteArticle() {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [success, setSuccess] = useState(false)

	const accessToken = getCookieValue('accessToken')
	if (!accessToken) return <PageAccessDenied />

	async function handleSave(event: React.FormEvent) {
		event.preventDefault()

		if (!title || !text) {
			return;
		}

		const isSuccessSave = await writeArticleLogic.saveArticle(accessToken, title, text)
		setSuccess(isSuccessSave)
	}

	function handleTitleChange(
		event: React.ChangeEvent<HTMLInputElement>
	): void {
		setTitle(event.target.value)
	}

	function handleTextChange(
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void {
		setText(event.target.value)
		event.target.style.height = 'auto'
		event.target.style.height = `${event.target.scrollHeight}px`
	}

	return (
		<div className="container">
			<Header />
			<div className="write-article">
				<div className="title">
					<h1>Write new article</h1>
				</div>
				<div className="write-article__content">
					<input
						onChange={handleTitleChange}
						placeholder="Title"
						type="text"
						className="write-article__content-input"
					/>
					<div className="write-article__content-paragraphs">
						<textarea
							onChange={handleTextChange}
							placeholder="Write your text here"
							className="write-article__paragraph-item"
						></textarea>
					</div>
					{ success &&
					<div className="success__save">
						Success
					</div>
					}
					<div className="write-article__button">
						<button onClick={handleSave}>
							Save and publish
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default WriteArticle
