import type { FastifyInstance } from "fastify";
import { creaMedico, obtenerMedicos, obtenerMedicosId, eliminarMedico, actualizarMedico  } from "../controller/medico.controller";

export const medicoRouter = (app: FastifyInstance)=>{
    app.get("/medicos",obtenerMedicos);
    app.get("/medico/:id", async(req, reply)=>{
        try{    
            const {id} = req.params as any;
            return await obtenerMedicosId(id);
            reply.code(201).send({mensaje:"Registro Exitoso"})
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No se encontró medicos"})
        }
    });
    app.post("/medico", async(req, reply)=>{
        try{    
            const medico = req.body;
            return await creaMedico(medico);
            
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No se ha podido guardar medico"})
        }
    });

    app.put("/medico/:id", async(req, reply)=>{
        try{    
            const {id} = req.params as any;
            const medico = req.body;
            await actualizarMedico(id, medico);
            reply.code(201).send({mensaje:"Registro Exitoso"})
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No se encontró medicos"})
        }
    });

    app.delete("/medico/:id", async(req, reply)=>{
        try{    
            const {id} = req.params as any;
            return await eliminarMedico(id);     
        }catch(error){
            console.log(error);
            reply.code(404).send({error:"No se encontró medicos"})
        }
    });
}
