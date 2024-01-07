import Header from '../../components/layout/Header/Header'
import './MainPageStyle.css'

function Main() {
    return (
        <>
            <Header isSignIn={true} accountName='test' />
            <main className='main'>
                <h1 className='main__title'>Create your blog for free</h1>
            </main>
        </>
    )
}

export default Main