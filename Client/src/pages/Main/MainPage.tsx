import Header from '../../components/layout/Header/Header'
import './MainPageStyle.css'

function Main() {
    return (
        <>
            <div className="container">
                <Header/>
                <main className='main'>
                    <h1 className='main__title'>Create your blog for free</h1>
                </main>
            </div>
        </>
    )
}

export default Main