import { sequelize } from "../config/dbConnect.js";

async function SyncToDB () {
    try {
        await sequelize.sync();
        console.log('Successful sync to DB')
    } catch (error) {
        console.error('Error: sync db', error)
    }
}

export default SyncToDB