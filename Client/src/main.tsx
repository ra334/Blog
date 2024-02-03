import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './index.css'
import Routes from './routes/router'
import AuthProvider from './provider/authProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<Routes />
		</AuthProvider>
	</React.StrictMode>,
)
