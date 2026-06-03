import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const Cita = sequelize.define("Cita",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        pacienteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        medicoId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "cita",
        timestamps: false
    }
)
