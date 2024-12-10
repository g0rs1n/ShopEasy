import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import dbConnect from './config/dbConnect.js'
import SyncToDB from './models/index.js'
import { Sequelize } from 'sequelize';

//ConstEnv
dotenv.config();
const PORT = process.env.PORT
const originPath = process.env.originPath

//App
const app = express();
app.use(express.json());
app.use(cors({
    origin: `${originPath}`,
    credentials: true,
}))
app.use(cookieParser())

// SyncToDB

SyncToDB()

// CheckConnect

function CheckConnect () {
    try {
        
        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`)
        })

        dbConnect()

    } catch (error) {
        console.error("Error: connect to server and back", error)
    }
}

CheckConnect()
