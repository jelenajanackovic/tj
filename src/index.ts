import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from "dotenv"
import {AppDataSource} from './database'
import StudentRoute from './routes/student.route'
import PredmetRoute from './routes/predmet.route'
import UserRoute from './routes/user.router'
import { authRouter } from './routes/auth.route'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('combined'))

dotenv.config()
const port = process.env.SERVER_PORT

AppDataSource.initialize()
.then(() => {
    console.log('Connected to database')
    app.listen(port, () => {
        console.log('lostening on port'+ port)
    })
}


)

app.use('/api/student', StudentRoute);
app.use('/api/predmet', PredmetRoute);
app.use('/api/user', UserRoute);
app.use(authRouter);
