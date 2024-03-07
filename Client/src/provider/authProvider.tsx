import axios from "axios";
import { getCookieValue } from "../tools/getCookies";
import { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";

const AuthContext = createContext<{ token: string; setToken: (newToken: string) => void }>({
    token: '',
    setToken: () => {}
});

const host: string = import.meta.env.VITE_SERVER_HOST

async function tryUpdateToken(refreshToken: string, accessToken: string) {
    try{
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
    } catch(err) {
        console.error('Error updating token: ', err)
        return null;
    }
}

async function checkIsAccessTokenValid(accessToken: string) {
    try{
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
    } catch(err) {
        console.error("Error checking access token validity: ", err)
        return false
    }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [accessToken, setAccessToken] = useState<string>(getCookieValue('accessToken'));
    const refreshToken = useRef<string>(getCookieValue('refreshToken'));

    useEffect(() => {
        async function fetchData() {
            if (!accessToken) {
                const newAccessToken =  await tryUpdateToken(refreshToken.current, accessToken);
                if (newAccessToken) {
                    setAccessToken(newAccessToken)
                }
            } else {
                const isAccessTokenValid = await checkIsAccessTokenValid(accessToken);

                if (!isAccessTokenValid) {
                    const newAccessToken =  await tryUpdateToken(refreshToken.current, accessToken);
                    if (newAccessToken) {
                        setAccessToken(newAccessToken)
                    }
                }
            }
        }

        fetchData()
    }, [accessToken]);

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