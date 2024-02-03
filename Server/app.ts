import * as express from 'express'
require('express-async-errors')
import { Request, Response } from 'express'
import helmet from 'helmet'
import cors = require('cors')
import bodyParser = require('body-parser')
import cookieParser = require('cookie-parser')
import userRouter from './router/user-router'
import articleRouter from './router/article-router'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware'
import path = require('path')
const app = express()

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
)
app.use(helmet())
app.use(bodyParser())
app.use(cookieParser())
app.use('/api/users/', userRouter)
app.use('/api/articles/', articleRouter)
app.use(express.static(path.join(__dirname, 'dist')))
app.use(ErrorHandlingMiddleware)

app.get('*', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(5050, () => {
	console.log('listening http://localhost:5050')
})
