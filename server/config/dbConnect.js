import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();

const DB_Name = process.env.DB_Name
const DB_User = process.env.DB_User
const DB_Password = process.env.DB_Password

const sequelize = new Sequelize( `${DB_Name}`, `${DB_User}`, `${DB_Password}`, {
    host: 'localhost',
    dialect: 'postgres',
});

const dbConnect = async () => {
    try {
        await sequelize.authenticate()

        console.log("Connection has been established successfully")
        
    } catch (error) {
        console.error("Unable to connect to the database", error)
    }
}

export default dbConnect
export {sequelize}