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