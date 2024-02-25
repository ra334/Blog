import './PageNotFound.css'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'

function PageNotFound() {
	return (
		<div className="container">
			<Header />
			<div className="pagenotfound__wrapper">
				<h1 className="pagenotfound__message">404 Error</h1>
				<div className="pagenotfound__text">Page not found</div>
			</div>
			<Footer />
		</div>
	)
}

export default PageNotFound
