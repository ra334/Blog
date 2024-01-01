import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button/Button';
import ErrorComponent from '../../UI/ErrorComponent/ErrorComponent';
import './Form.css'

import subbmiting from './FormLogic';
import { addLogin, addNickname, addPassword } from '../../../store/slices/authSlice';
import { useState } from 'react';

type FormProps = {
    h1Text: string;
};

function Form(props: FormProps) {

    const dispatch = useDispatch()
    const authData = useSelector((state: any) => state.auth)
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit() {
        try {
            await subbmiting(authData)
        } catch(err: any) {
            setError(err.message)
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                <h1 className="title">{props.h1Text}</h1>
                {error && <ErrorComponent message={error} />}
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
                <Button text={props.h1Text} onClick={handleSubmit}/>
            </div>
        </div>
    );
}

export default Form;
