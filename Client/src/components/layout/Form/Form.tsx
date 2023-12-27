import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button/Button';
import './Form.css'
import axios from 'axios'

import { addLogin, addNickname, addPassword } from '../../../store/slices/authSlice';

type FormProps = {
    h1Text: string;
};

function Form(props: FormProps) {

    const dispatch = useDispatch()
    const authData = useSelector((state) => state.auth)

    async function subbmiting() {
        const tokens = await axios({
            method: 'post',
            url: 'http://localhost:8080/api/registration',
            data: {
                login: authData.login,
                nickname: authData.nickname,
                password: authData.password
            }
        })

        console.log(tokens.data)
    }

    return (
        <div className="container">
            <div>
                <h1 className="title">{props.h1Text}</h1>
                <div className="input__wrapper">
                    <input
                        type="text"
                        placeholder="Login"
                        value={authData.login}
                        onChange={(e) => dispatch(addLogin(e.target.value))}
                    />
                </div>
                <div className="input__wrapper">
                    <input
                        type="text"
                        placeholder="Nickname"
                        value={authData.nickname}
                        onChange={(e) => dispatch(addNickname(e.target.value))}
                    />
                </div>
                <div className="input__wrapper">
                    <input
                        type="password"
                        placeholder="Password"
                        value={authData.password}
                        onChange={(e) => dispatch(addPassword(e.target.value))}
                    />
                </div>
                <Button text={props.h1Text} onClick={subbmiting}/>
            </div>
        </div>
    );
}

export default Form;
