import AccountPage from './pages/Account/AccountPage'
import AuthPage from './pages/Auth/AuthPage'
import MainPage from './pages/Main/MainPage'
import WriteArticlePage from './pages/WriteArticle/WriteArticle'
import ListArticlesPage from './pages/ListArticles.tsx/ListArticles'
import NotFoundPage from './pages/NotFound/PageNotFound'
import AccessDeniedPage from './pages/AccessDenied/PageAccessDenied'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
	},

	{
		path: '/login',
		element: <AuthPage action={'login'} />,
	},

	{
		path: 'registration',
		element: <AuthPage action={'registration'} />,
	},

	{
		path: '/account',
		element: <AccountPage />,
	},

	{
		path: '/write',
		element: <WriteArticlePage />,
	},

	{
		path: '/articles',
		element: <ListArticlesPage />,
	},

	{
		path: 'test',
		element: <AccessDeniedPage />,
	},

	{
		path: '*',
		element: <NotFoundPage />,
	},
])

export default router
