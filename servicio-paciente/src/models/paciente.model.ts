import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Paciente = sequelize.define("Paciente",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,

        },
        email: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: "paciente",
        timestamps: false
    }
)