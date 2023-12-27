import * as express from 'express';
import { Request, Response} from 'express';
import helmet from 'helmet'
import cors = require('cors');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import router from './router/router'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';
const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser())
app.use(cookieParser())
app.use('/api', router)
app.use(ErrorHandlingMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('hello')  
    res.status(200)
})

app.listen(8080, () => {
    console.log('listening http://localhost:8080')
})


