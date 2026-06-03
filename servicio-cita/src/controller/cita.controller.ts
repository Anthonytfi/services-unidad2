import { Cita } from "../models/cita.model";

export const obtenerCitas = async()=>{
    
    return await Cita.findAll();
}

export const obtenerCitasId = async(id: number)=>{
    const cita = await Cita.findByPk(id);
    if (!cita){
        throw new Error("Cita no encontrada")
    }
    return cita;
}

export const creaCita = async(data: any)=>{
    const resPaciente = await fetch(`http://localhost:3001/api/pacientes/${data.pacienteId}`);
    const paciente: any = await resPaciente.json();
    if(!paciente){
        throw new Error("Paciente no existe")
    }

    const resMedico = await fetch(`http://localhost:3002/api/medicos/${data.medicoId}`);
    const medico: any = await resMedico.json();
    if(!medico){
        throw new Error("Médico no existe")
    }
    return await Cita.create(data);
}

export const actualizarCita = async(id:number, data:any)=>{
    const cita = await Cita.findByPk(id);
     if (!cita){
        throw new Error("Cita no encontrada")
    }
    await cita.update(data);
    return cita;
}

export const eliminarCita = async(id:number,)=>{
    const cita = await Cita.findByPk(id);
     if (!cita){
        throw new Error("Cita no encontrada")
    }
    await cita.destroy();
    return {mensaje:"Cita eliminada"}
}
