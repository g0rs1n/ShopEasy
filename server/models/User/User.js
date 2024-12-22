import { DataTypes } from "sequelize";
import {sequelize} from '../../config/dbConnect.js'

const User = sequelize.define(
    'User',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        freezeTableName: true,
    }
)

export default User