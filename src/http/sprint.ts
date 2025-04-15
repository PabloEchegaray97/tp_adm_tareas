import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ITask } from "../types/ITask";

const API_URL = "http://localhost:3000/sprints";

export const getAllSprints = async (): Promise<ISprint[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
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
    const response = await axios.get(`${API_URL}/${sprintId}`);
    return response.data;
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
    const response = await axios.put(`${API_URL}/${sprint.id}`, sprint);
    return response.data;
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
    // Obtener el sprint actual
    const sprint = await getSprintById(sprintId);
    
    // Añadir la nueva tarea al array de tareas
    sprint.tasks.push(task);
    
    // Actualizar el sprint
    const response = await axios.put(`${API_URL}/${sprintId}`, sprint);
    return response.data;
  } catch (error) {
    console.log(
      `Error al añadir tarea al sprint con ID ${sprintId}`,
      error
    );
    throw error;
  }
};
