import { create } from 'zustand';
import { ITask } from '../types/ITask';
import axios from 'axios';

const API_URL = "http://localhost:3000/backlog";

interface TaskState {
  tasks: ITask[];
  activeTask: ITask | null;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  setTasks: (tasks: ITask[]) => void;
  setActiveTask: (task: ITask | null) => void;
  createTask: (task: Omit<ITask, 'id'>) => Promise<void>;
  updateTask: (task: ITask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  activeTask: null,
  isLoading: false,
  error: null,
  
  setTasks: (tasks) => set({ tasks }),
  
  setActiveTask: (task) => set({ activeTask: task }),
  
  createTask: async (taskData) => {
    set({ isLoading: true, error: null });
    try {
      const newTask: ITask = {
        ...taskData,
        id: `backlog-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      
      const response = await axios.post(API_URL, newTask);
      
      set((state) => ({
        tasks: [...state.tasks, response.data],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al crear tarea:', error);
      set({ 
        error: 'No se pudo crear la tarea',
        isLoading: false
      });
      throw error;
    }
  },
  
  updateTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${task.id}`, task);
      
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      set({ 
        error: 'No se pudo actualizar la tarea',
        isLoading: false
      });
      throw error;
    }
  },
  
  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      set({ 
        error: 'No se pudo eliminar la tarea',
        isLoading: false
      });
      throw error;
    }
  },
  
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<ITask[]>(API_URL);
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      set({ 
        error: 'No se pudieron cargar las tareas',
        isLoading: false
      });
      throw error;
    }
  }
})); 