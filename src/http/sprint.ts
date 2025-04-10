import axios from "axios";
import { ISprint } from "../types/ISprint";

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
