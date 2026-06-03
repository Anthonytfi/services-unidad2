import { Medico } from "../models/medico.model";

export const obtenerMedicos = async()=>{
    
    return await Medico.findAll();
}

export const obtenerMedicosId = async(id: number)=>{
    const medico = await Medico.findByPk(id);
    if (!medico){
        throw new Error("Medico no encontrado")
    }
    return medico;
}

export const creaMedico = async(data: any)=>{
    return await Medico.create(data);
}

export const actualizarMedico = async(id:number, data:any)=>{
    const medico = await Medico.findByPk(id);
     if (!medico){
        throw new Error("Medico no encontrado")
    }
    await medico.update(data);
}

export const eliminarMedico = async(id:number,)=>{
    const medico = await Medico.findByPk(id);
     if (!medico){
        throw new Error("Medico no encontrado")
    }
    await medico.destroy();
    return {mensaje:"Medico eliminado"}
}
