import axios from "axios";
import { ISprint } from "../types/ISprint";

const API_URL = "http://localhost:3000/tareas";

export const getAllSprints = async (): Promise<ISprint[]> => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data.tareas;
    return data;
  } catch (error) {
    console.log(
      "Error al traer todas las Sprints desde sprint.ts 'getAllSprints'.",
      error
    );
    throw error;
  }
};
