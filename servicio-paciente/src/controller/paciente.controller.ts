import { Paciente } from "../models/paciente.model";

export const obtenerPacientes = async()=>{
    
    return await Paciente.findAll();
}

export const obtenerPacientesId = async(id: number)=>{
    const paciente = await Paciente.findByPk(id);
    if (!paciente){
        throw new Error("Paciente no encontrado")
    }
    return paciente;
}

export const creaPaciente = async(data: any)=>{
    return await Paciente.create(data);
}

export const actualizarPaciente = async(id:number, data:any)=>{
    const paciente = await Paciente.findByPk(id);
     if (!paciente){
        throw new Error("Paciente no encontrado")
    }
    await paciente.update(data);
}

export const eliminarPaciente = async(id:number,)=>{
    const paciente = await Paciente.findByPk(id);
     if (!paciente){
        throw new Error("Paciente no encontrado")
    }
    await paciente.destroy();
    return {mensaje:"Paciente eliminado"}
}

