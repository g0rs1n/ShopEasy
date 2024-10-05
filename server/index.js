import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { Sequelize } from 'sequelize';

//App

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: `${originPath}`,
    credentials: true,
}))
app.use(cookieParser())

//ConstEnv

const PORT = process.env.PORT
const DB_Name = process.env.DB_Name
const DB_User = process.env.DB_User
const DB_Password = process.env.DB_Password
const originPath = process.env.originPath

// CheckConnect

async function connectToDB () {
    try {
        
        const sequelize = new Sequelize( `${DB_Name}`, `${DB_User}`, `${DB_Password}`, {
            host: 'localhost',
            dialect: 'postgres',
        });

        await sequelize.authenticate()
        console.log("Connection has been established successfully")
        
    } catch (error) {
        console.error("Unable to connect to the database", error)
    }
}

async function CheckConnect () {
    try {
        
        await connectToDB()

        app.listen(PORT, () => {
            console.log(`Server start on port ${PORT}`)
        })

    } catch (error) {
        console.error("Error: connect to server and back", error)
    }
}

CheckConnect()