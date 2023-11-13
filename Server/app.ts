import * as express from 'express';
import * as http2 from 'http2';
import http2Express = require('http2-express-bridge');
import * as fs from 'fs';
import { Request, Response} from 'express';
import helmet from 'helmet'
import cors = require('cors');
import router from './router/router'
const app = http2Express(express)

app.use(cors())
app.use(helmet())
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
    res.send('hello')  
    res.status(200).end()
})

const server = http2.createSecureServer({
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.cert'),
}, app)

server.listen(443, () => {
    console.log('server is running https://localhost')
})