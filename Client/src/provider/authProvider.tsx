import axios from "axios";
import { getCookieValue } from "../tools/getCookies";
import { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";

const AuthContext = createContext<{ token: string; setToken: (newToken: string) => void }>({
    token: '',
    setToken: () => {}
});

const host: string = import.meta.env.VITE_SERVER_HOST
console.log(host)

async function tryUpdateToken(refreshToken: string, accessToken: string) {
    const response = await axios({
        method: 'post',
        withCredentials: true,
        url: host + '/api/users/refresh',
        data: {
            refreshToken,
            accessToken
        }
    })

    if (response.status === 200) {
        const token = response.data.accessToken;
        if (token) {
            return token;
        }
    }
}

async function checkIsAccessTokenValid(accessToken: string) {
    const response = await axios({
        method: 'post',
        url: host + '/api/users/verify',
        data: {
            accessToken
        }
    })

    if (response.status === 200) {
        return response.data.valid
    }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken_] = useState(getCookieValue('accessToken'));
    const [refreshToken] = useState(getCookieValue('refreshToken'));
    const updatingToken = useRef(false)

    function setAccessToken(newToken: string) {
        setAccessToken_(newToken);
    }

    useEffect(() => {
        async function fetchData() {
            if (accessToken) {
                const isAccessTokenValid = await checkIsAccessTokenValid(accessToken);

                if (!isAccessTokenValid) {
                    if (!updatingToken.current) {
                        updatingToken.current = true

                        console.log(updatingToken.current)

                        const newAccessToken =  await tryUpdateToken(refreshToken, accessToken);
                        if (newAccessToken) {
                            setAccessToken(newAccessToken)
                        }
                    }
                }

                axios.defaults.headers.common["Authorization"] = accessToken;
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }
        }

        fetchData()
    }, [accessToken, refreshToken]);

    const contextValue = useMemo(() => ({
        token: accessToken,
        setToken: setAccessToken
    }), [accessToken]);

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;
