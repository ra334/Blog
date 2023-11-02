import express from 'express';
import http2 from 'http2';
import http2Express from 'http2-express-bridge'
import fs from 'fs';
import { Request, Response} from 'express';
import helmet from 'helmet'
import cors from 'cors'
import router from './router/router'
const app = http2Express(express)

app.use(cors())
app.use(helmet())
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
    res.send('hello')  
})

const server = http2.createSecureServer({
    key: fs.readFileSync(`${__dirname}/cert/server.key`),
    cert: fs.readFileSync(`${__dirname}/cert/server.cert`)
}, app)

server.listen(3300, () => {
    console.log('server is running on port 3300')
})