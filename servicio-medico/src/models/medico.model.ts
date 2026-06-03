import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Medico = sequelize.define("Medico",
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
        },
        especialidad: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: "medico",
        timestamps: false
    }
)
