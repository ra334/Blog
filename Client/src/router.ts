import AccountPage from './pages/Account/AccountPage'
import AuthPage from './pages/Auth/AuthPage'
import MainPage from './pages/Main/MainPage'
import WriteArticle from './pages/WriteArticle/WriteArticle';
import ListArticles from './pages/ListArticles.tsx/ListArticles';
import SyntaxPage from './pages/Syntax/SyntaxPage';

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
    },

    {
        path: '/write',
        element: WriteArticle()
    },

    {
        path: '/articles',
        element: ListArticles()
    },

    {
        path: '/syntax',
        element: SyntaxPage()
    }
])

export default router