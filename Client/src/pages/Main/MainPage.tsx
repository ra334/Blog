import Header from '../../components/layout/Header/Header'
import './MainPageStyle.css'
import { TypeAnimation } from 'react-type-animation';

function Main() {

    return (
        <div className="container">
            <Header/>
            <main className='main'>
                <TypeAnimation
                    sequence={['Write blog for free', 3000, 'Create your own blog', 3000]}
                    wrapper='span'
                    speed={30}
                    style={{marginTop: '10%',fontWeight: 700, fontSize: '50px'}}
                    repeat={Infinity}
                />
            </main>
        </div>
    )
}

export default Main