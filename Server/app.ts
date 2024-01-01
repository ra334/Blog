import * as express from 'express';
import helmet from 'helmet'
import cors = require('cors');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import apiRouter from './router/api/api-router'
import contentRouter from './router/content/content-router'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';
import path = require('path')
const app = express()


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(helmet())
app.use(bodyParser())
app.use(cookieParser())
app.use('/', contentRouter)
app.use('/api', apiRouter)
app.use(express.static(path.join(__dirname, 'dist')));
app.use(ErrorHandlingMiddleware)

app.listen(8080, () => {
    console.log('listening http://localhost:8080')
})