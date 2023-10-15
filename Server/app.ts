import express from 'express';
import { Request, Response} from 'express';
import helmet from 'helmet'
import cors from 'cors'
const app = express()


app.use(cors())
app.use(helmet())

app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})

app.listen(3300, () => {
    console.log('App started')
})