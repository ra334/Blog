import axios from 'axios'

type AuthDataType = {
    login: string;
    nickname: string;
    password: string;
}

async function subbmiting(authData: AuthDataType){
    const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/api/registration',
        data: {
            login: authData.login,
            nickname: authData.nickname,
            password: authData.password
        },
        withCredentials: true,
    });

    if (response.status === 200) {
        window.history.pushState({}, 'undefined', '/')
        window.location.reload()
    }
}


export default subbmiting