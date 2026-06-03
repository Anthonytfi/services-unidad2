import type { errorCodes, FastifyInstance } from "fastify";
import { creaPaciente, obtenerPacientes, obtenerPacientesId, eliminarPaciente, actualizarPaciente  } from "../controller/paciente.controller";

export const pacienteRouter = (app: FastifyInstance)=>{
    app.get("/pacientes",obtenerPacientes);
    app.get("/paciente/:id", async(req, reply)=>{
        try{    
            const {id} = req.params as any;
            return await obtenerPacientesId(id);
            reply.code(201).send({mensaje:"Registro Exitoso"})
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No se encontró pacientes"})
        }
    });
    app.post("/paciente", async(req, reply)=>{
        try{    
            const paciente = req.body;
            return await creaPaciente(paciente);
            
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No seha podido guardar paciente"})
        }
    });

    app.put("/paciente/:id", async(req, reply)=>{
        try{    
            const {id} = req.params as any;
            const paciente = req.body;
            await actualizarPaciente(id, paciente);
            reply.code(201).send({mensaje:"Registro Exitoso"})
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No se encontró pacientes"})
        }
    });

    app.delete("/paciente/:id", async(req, reply)=>{
        try{    
            const {id} = req.params as any;
            return await eliminarPaciente(id);     
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No se encontró pacientes"})
        }
    });
}
