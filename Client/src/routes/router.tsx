import AccountPage from '../pages/Account/AccountPage'
import AuthPage from '../pages/Auth/AuthPage'
import MainPage from '../pages/Main/MainPage'
import WriteArticlePage from '../pages/WriteArticle/WriteArticle'
import ListArticlesPage from '../pages/ListArticles.tsx/ListArticles'
import NotFoundPage from '../pages/NotFound/PageNotFound'
import ArticlePage from '../pages/Article/ArticlePage'

import { ProtectedRouter } from './protected-router'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function Routes() {
	const routesFroPublic = [
		{
			path: '/',
			element: <MainPage />,
		},
	
		{
			path: '/login',
			element: <AuthPage action={'login'} />,
		},
	
		{
			path: '/registration',
			element: <AuthPage action={'registration'} />,
		},

		{
			path: '/articles/:id',
			element: <ArticlePage />
		},

		{
			path: '/articles',
			element: <ListArticlesPage />,
		},

		{
			path: '*',
			element: <NotFoundPage />,
		},
	]

	const routesForAuthenticatedOnly = [
		{
			path: '/',
			element: <ProtectedRouter />,
			children: [
				{
					path: '/account',
					element: <AccountPage />,
				},

				{
					path: '/write',
					element: <WriteArticlePage />,
				},
			]
		}
	]

	const router  = createBrowserRouter([
		...routesFroPublic,
		...routesForAuthenticatedOnly
	])

	return <RouterProvider router={router} />
}

export default Routes