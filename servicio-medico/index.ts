import Fastify from "fastify";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { medicoRouter } from "./src/router/medico.router";
import { sequelize } from "./src/config/database";

dotenv.config();

const app = Fastify({
    logger: true,
});

app.register(medicoRouter, {prefix:"/api"});

const iniciar = async()=>{
    try {
        await sequelize.authenticate();
        app.log.info("Conexión a la Base de datos Exitosa");
        
        await sequelize.sync();
        app.log.info("Tablas creadas en la base de daots");

        const puerto = Number(process.env.PORT) || 3002;
        app.listen({port:puerto, host:"0.0.0.0"})

    }catch(error){
        app.log.error({ err: error }, "Error al iniciar programa");
        console.error("Detalle completo del error:", error);
    }
}

iniciar();