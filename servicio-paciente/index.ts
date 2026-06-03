import Fastify from "fastify";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { pacienteRouter } from "./src/router/paciente.router";
import { sequelize } from "./src/config/database";

dotenv.config();

const app = Fastify({
    logger: true,
});

app.register(pacienteRouter, {prefix:"/api"});

const iniciar = async()=>{
    try {
        await sequelize.authenticate();
        app.log.info("Conexión a la Base de datos Exitosa");
        
        await sequelize.sync();
        app.log.info("Tablas creadas en la base de daots");

        const puerto = Number(process.env.PORT) || 3001;
        app.listen({port:puerto, host:"0.0.0.0"})

    }catch(error){
        app.log.error("Error al iniciar programa:", error);
        console.error("Detalle completo del error:", error);
    }
}

iniciar();