import { Sequelize } from "sequelize";
import dontenv from 'dotenv'

dontenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: console.log
    }
)