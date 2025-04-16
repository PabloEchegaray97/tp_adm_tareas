import axios from "axios";
import { ITask } from "../types/ITask";

const API_URL = "http://localhost:3000/backlog";

export const getBacklogTasks = async (): Promise<ITask[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.log(
      "Error al obtener tareas del backlog desde backlog.ts 'getBacklogTasks'.",
      error
    );
    throw error;
  }
};

export const createBacklogTask = async (task: ITask): Promise<ITask> => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data;
  } catch (error) {
    console.log(
      "Error al crear tarea en el backlog.",
      error
    );
    throw error;
  }
}; 

export const updateBacklogTask = async (task: ITask): Promise<ITask> => {
  try {
    const response = await axios.put(`${API_URL}/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.log(
      "Error al actualizar tarea en el backlog.",
      error
    );
    throw error;
  }
};

export const deleteBacklogTask = async (taskId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    console.log(
      "Error al eliminar tarea en el backlog.",
      error
    );
    throw error;
  }
};

