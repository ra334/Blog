import './Footer.css'

import mailIcon from '../../../assets/icons/mail.svg'
import githubIcon from '../../../assets/icons/github.svg'
import linkedinIcon from '../../../assets/icons/linkedin.svg'
import telegramIcon from '../../../assets/icons/telegram.svg'


function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <a className='footer__icons' href="mailto:savcukmihajlo@gmail.com">
                    <img className='footer__icons-item' src={mailIcon} alt="mail" />
                </a>
                <a className='footer__icons' href="https://github.com/ra334">
                    <img className='footer__icons-item' src={githubIcon} alt="github" />
                </a>
                <a className='footer__icons' href="https://www.linkedin.com/in/mykhailo-savchuk-466b182a5/">
                    <img className='footer__icons-item' src={linkedinIcon} alt="linkedin" />
                </a>
                <a className='footer__icons' href="https://t.me/half_zero">
                    <img className='footer__icons-item' src={telegramIcon} alt="telegram" />
                </a>
            </div>
        </footer>
    )
}

export default Footer