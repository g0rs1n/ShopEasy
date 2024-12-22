import { sequelize } from "../config/dbConnect.js";
import User from "./User/User.js";

async function SyncToDB () {
    try {
        await sequelize.sync({alter: true});
        console.log('Successful sync to DB')
    } catch (error) {
        console.error('Error: sync db', error)
    }
}

export default SyncToDB

