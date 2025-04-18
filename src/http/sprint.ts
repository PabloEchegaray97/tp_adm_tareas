import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ITask } from "../types/ITask";

const API_URL = "http://localhost:3000/sprintList";

export const getAllSprints = async (): Promise<ISprint[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.sprints;
  } catch (error) {
    console.log(
      "Error al traer todas las Sprints desde sprint.ts 'getAllSprints'.",
      error
    );
    throw error;
  }
};

export const getSprintById = async (sprintId: string): Promise<ISprint> => {
  try {
    // Primero obtenemos todos los sprints
    const allSprints = await getAllSprints();
    // Buscamos el sprint con el ID especificado
    const sprint = allSprints.find(s => s.id === sprintId);
    
    if (!sprint) {
      throw new Error(`Sprint con ID ${sprintId} no encontrado`);
    }
    
    return sprint;
  } catch (error) {
    console.log(
      `Error al obtener el sprint con ID ${sprintId}`,
      error
    );
    throw error;
  }
};

export const updateSprint = async (sprint: ISprint): Promise<ISprint> => {
  try {
    // Obtenemos todos los sprints existentes
    const allSprints = await getAllSprints();
    
    // Encontramos el índice del sprint a actualizar
    const sprintIndex = allSprints.findIndex((s: ISprint) => s.id === sprint.id);
    
    if (sprintIndex === -1) {
      throw new Error(`Sprint con ID ${sprint.id} no encontrado`);
    }
    
    // Actualizamos el sprint en el array
    allSprints[sprintIndex] = sprint;
    
    // Enviamos el array completo de sprints actualizado
    await axios.put(API_URL, {
      sprints: allSprints
    });
    
    return sprint;
  } catch (error) {
    console.log(
      `Error al actualizar el sprint con ID ${sprint.id}`,
      error
    );
    throw error;
  }
};

export const addTaskToSprint = async (sprintId: string, task: ITask): Promise<ISprint> => {
  try {
    // Obtenemos todos los sprints existentes
    const allSprints = await getAllSprints();
    
    // Encontramos el índice del sprint al que añadir la tarea
    const sprintIndex = allSprints.findIndex((s: ISprint) => s.id === sprintId);
    
    if (sprintIndex === -1) {
      throw new Error(`Sprint con ID ${sprintId} no encontrado`);
    }
    
    // Aseguramos que el sprint tenga un array de tareas
    if (!allSprints[sprintIndex].tareas) {
      allSprints[sprintIndex].tareas = [];
    }
    
    // Aseguramos que la tarea tenga estado correcto
    if (!task.estado) {
      task.estado = 'pendiente';
    }
    
    // Añadimos la nueva tarea al array tareas
    allSprints[sprintIndex].tareas.push(task);
    
    // Enviamos el array completo de sprints actualizado
    await axios.put(API_URL, {
      sprints: allSprints
    });
    
    return allSprints[sprintIndex];
  } catch (error) {
    console.log(
      `Error al añadir tarea al sprint con ID ${sprintId}`,
      error
    );
    throw error;
  }
};

export const createSprint = async (sprint: ISprint): Promise<ISprint> => {
  try {
    // Obtenemos todos los sprints existentes primero
    const allSprints = await getAllSprints();
    
    // Aseguramos que el sprint tenga un ID único si no lo tiene
    if (!sprint.id) {
      sprint.id = `sprint-${Date.now()}`;
    }
    
    // Si no tiene tareas, inicializamos el array vacío
    if (!sprint.tareas) {
      sprint.tareas = [];
    }
    
    // Creamos un nuevo array con todos los sprints incluyendo el nuevo
    const updatedSprints = [...allSprints, sprint];
    
    // Hacemos PUT en lugar de PATCH para actualizar todo el objeto sprintList
    await axios.put(API_URL, {
      sprints: updatedSprints
    });
    
    return sprint;
  } catch (error) {
    console.log(
      "Error al crear un nuevo sprint",
      error
    );
    throw error;
  }
};

export const deleteSprint = async (sprintId: string): Promise<void> => {
  try {
    // Obtenemos todos los sprints existentes
    const allSprints = await getAllSprints();
    
    // Filtramos para eliminar el sprint con el ID especificado
    const updatedSprints = allSprints.filter((s: ISprint) => s.id !== sprintId);
    
    // Enviamos el array completo de sprints actualizado
    await axios.put(API_URL, {
      sprints: updatedSprints
    });
  } catch (error) {
    console.log(
      `Error al eliminar el sprint con ID ${sprintId}`,
      error
    );
    throw error;
  }
};
