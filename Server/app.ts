import * as express from 'express'
import http = require('https')
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
import fs = require('fs')
const app = express()

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
);

const privateKey = fs.readFileSync('./certificates/privateKey.key').toString()
const certificate = fs.readFileSync('./certificates/certificate.pem').toString()

const credentials = {key: privateKey, cert: certificate}

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

http.createServer(credentials, app).listen(443)