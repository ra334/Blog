import AccountPage from './pages/Account/AccountPage'
import AuthPage from './pages/Auth/AuthPage'
import MainPage from './pages/Main/MainPage'

import {
    createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: MainPage()
    },

    {
        path: '/login',
        element: AuthPage('login')
    },

    {
        path: 'registration',
        element: AuthPage('registration')
    },

    {
        path: '/account',
        element: AccountPage()
    }
])

export default router