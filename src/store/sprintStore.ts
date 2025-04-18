import { create } from 'zustand';
import { ISprint } from '../types/ISprint';
import { ITask } from '../types/ITask';
import { getAllSprints, getSprintById, updateSprint as updateSprintAPI, addTaskToSprint, createSprint as createSprintAPI, deleteSprint as deleteSprintAPI } from '../http/sprint';
import { createBacklogTask } from '../http/backlog';

interface SprintState {
  sprints: ISprint[];
  currentSprint: ISprint | null;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  setSprints: (sprints: ISprint[]) => void;
  setCurrentSprint: (sprint: ISprint | null) => void;
  fetchSprints: () => Promise<void>;
  fetchSprintById: (sprintId: string) => Promise<void>;
  addTask: (sprintId: string, task: Omit<ITask, 'id'>) => Promise<void>;
  updateTask: (sprintId: string, taskId: string, taskData: Partial<ITask>) => Promise<void>;
  deleteTask: (sprintId: string, taskId: string) => Promise<void>;
  moveTask: (sprintId: string, taskId: string, newStatus: 'pendiente' | 'en-progreso' | 'completado') => Promise<void>;
  moveTaskToBacklog: (sprintId: string, taskId: string) => Promise<void>;
  createSprint: (sprint: Omit<ISprint, 'id'>) => Promise<void>;
  updateSprint: (sprint: ISprint) => Promise<void>;
  deleteSprint: (sprintId: string) => Promise<void>;
}

export const useSprintStore = create<SprintState>((set, get) => ({
  sprints: [],
  currentSprint: null,
  isLoading: false,
  error: null,
  
  setSprints: (sprints) => set({ sprints }),
  
  setCurrentSprint: (sprint) => set({ currentSprint: sprint }),
  
  fetchSprints: async () => {
    set({ isLoading: true, error: null });
    try {
      const sprints = await getAllSprints();
      set({ sprints, isLoading: false });
    } catch (error) {
      console.error('Error al obtener los sprints:', error);
      set({ 
        error: 'No se pudieron cargar los sprints',
        isLoading: false
      });
      throw error;
    }
  },
  
  fetchSprintById: async (sprintId) => {
    set({ isLoading: true, error: null });
    try {
      const sprint = await getSprintById(sprintId);
      set({ currentSprint: sprint, isLoading: false });
    } catch (error) {
      console.error(`Error al obtener el sprint con ID ${sprintId}:`, error);
      set({ 
        error: 'No se pudo cargar el sprint',
        isLoading: false
      });
      throw error;
    }
  },
  
  addTask: async (sprintId, taskData) => {
    set({ isLoading: true, error: null });
    try {
      // Generar un ID único para la tarea
      const newTask: ITask = {
        ...taskData,
        id: `task-${Date.now()}`,
        // Solo asignar el estado si no viene definido ya
        estado: taskData.estado || 'pendiente'
      };
      
      // Añadir la tarea al sprint asegurando que se use el array "tareas"
      const updatedSprint = await addTaskToSprint(sprintId, newTask);
      
      // Actualizar el estado
      set((state) => ({
        currentSprint: updatedSprint,
        sprints: state.sprints.map(s => 
          s.id === sprintId ? updatedSprint : s
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al añadir la tarea al sprint:', error);
      set({ 
        error: 'No se pudo añadir la tarea al sprint',
        isLoading: false
      });
      throw error;
    }
  },
  
  updateTask: async (sprintId, taskId, taskData) => {
    set({ isLoading: true, error: null });
    try {
      const { currentSprint } = get();
      if (!currentSprint) throw new Error('No hay sprint seleccionado');
      
      // Encontrar y actualizar la tarea
      const updatedTasks = currentSprint.tareas.map((task) => 
        task.id === taskId ? { ...task, ...taskData } : task
      );
      
      // Actualizar el sprint con las tareas actualizadas
      const updatedSprint = { ...currentSprint, tareas: updatedTasks };
      await updateSprintAPI(updatedSprint);
      
      // Actualizar el estado
      set((state) => ({
        currentSprint: updatedSprint,
        sprints: state.sprints.map(s => 
          s.id === sprintId ? updatedSprint : s
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      set({ 
        error: 'No se pudo actualizar la tarea',
        isLoading: false
      });
      throw error;
    }
  },
  
  deleteTask: async (sprintId, taskId) => {
    set({ isLoading: true, error: null });
    try {
      const { currentSprint } = get();
      if (!currentSprint) throw new Error('No hay sprint seleccionado');
      
      // Filtrar la tarea a eliminar
      const updatedTasks = currentSprint.tareas.filter(task => task.id !== taskId);
      
      // Actualizar el sprint sin la tarea eliminada
      const updatedSprint = { ...currentSprint, tareas: updatedTasks };
      await updateSprintAPI(updatedSprint);
      
      // Actualizar el estado
      set((state) => ({
        currentSprint: updatedSprint,
        sprints: state.sprints.map(s => 
          s.id === sprintId ? updatedSprint : s
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
      set({ 
        error: 'No se pudo eliminar la tarea',
        isLoading: false
      });
      throw error;
    }
  },
  
  moveTask: async (sprintId, taskId, newStatus) => {
    set({ isLoading: true, error: null });
    try {
      const { currentSprint } = get();
      if (!currentSprint) throw new Error('No hay sprint seleccionado');
      
      // Actualizar el estado de la tarea
      const updatedTasks = currentSprint.tareas.map((task) => 
        task.id === taskId ? { ...task, estado: newStatus } : task
      );
      
      // Actualizar el sprint con las tareas actualizadas
      const updatedSprint = { ...currentSprint, tareas: updatedTasks };
      await updateSprintAPI(updatedSprint);
      
      // Actualizar el estado
      set((state) => ({
        currentSprint: updatedSprint,
        sprints: state.sprints.map(s => 
          s.id === sprintId ? updatedSprint : s
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al mover la tarea:', error);
      set({ 
        error: 'No se pudo cambiar el estado de la tarea',
        isLoading: false
      });
      throw error;
    }
  },
  
  moveTaskToBacklog: async (sprintId, taskId) => {
    set({ isLoading: true, error: null });
    try {
      const { currentSprint } = get();
      if (!currentSprint) throw new Error('No hay sprint seleccionado');
      
      // Encontrar la tarea que queremos mover al backlog
      const taskToMove = currentSprint.tareas.find(task => task.id === taskId);
      if (!taskToMove) throw new Error('Tarea no encontrada');
      
      // Crear una versión de la tarea para el backlog con un nuevo ID
      const backlogTask: ITask = {
        id: `backlog-${Date.now()}`,
        titulo: taskToMove.titulo,
        descripcion: taskToMove.descripcion,
        fechaLimite: taskToMove.fechaLimite,
      };
      
      // Añadir la tarea al backlog
      await createBacklogTask(backlogTask);
      
      // Eliminar la tarea del sprint
      const updatedTasks = currentSprint.tareas.filter(task => task.id !== taskId);
      const updatedSprint = { ...currentSprint, tareas: updatedTasks };
      await updateSprintAPI(updatedSprint);
      
      // Actualizar el estado
      set((state) => ({
        currentSprint: updatedSprint,
        sprints: state.sprints.map(s => 
          s.id === sprintId ? updatedSprint : s
        ),
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al mover la tarea al backlog:', error);
      set({ 
        error: 'No se pudo mover la tarea al backlog',
        isLoading: false
      });
      throw error;
    }
  },

  createSprint: async (sprintData) => {
    set({ isLoading: true, error: null });
    try {
      // Generar un ID único para el sprint
      const newSprint: ISprint = {
        ...sprintData,
        id: `sprint-${Date.now()}`
      };
      
      // Crear el sprint usando la función de la API
      const createdSprint = await createSprintAPI(newSprint);
      
      // Actualizar el estado
      set((state) => ({
        sprints: [...state.sprints, createdSprint],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al crear el sprint:', error);
      set({ 
        error: 'No se pudo crear el sprint',
        isLoading: false
      });
      throw error;
    }
  },
  
  updateSprint: async (sprint) => {
    set({ isLoading: true, error: null });
    try {
      // Actualizar el sprint usando la función de la API
      const updatedSprint = await updateSprintAPI(sprint);
      
      // Actualizar el estado
      set((state) => ({
        sprints: state.sprints.map(s => s.id === sprint.id ? updatedSprint : s),
        currentSprint: state.currentSprint?.id === sprint.id ? updatedSprint : state.currentSprint,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al guardar el sprint:', error);
      set({ 
        error: 'No se pudo actualizar el sprint',
        isLoading: false
      });
      throw error;
    }
  },

  deleteSprint: async (sprintId) => {
    set({ isLoading: true, error: null });
    try {
      // Eliminar el sprint usando la función de la API
      await deleteSprintAPI(sprintId);
      
      // Actualizar el estado
      set((state) => ({
        sprints: state.sprints.filter(s => s.id !== sprintId),
        currentSprint: state.currentSprint?.id === sprintId ? null : state.currentSprint,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error al eliminar el sprint:', error);
      set({ 
        error: 'No se pudo eliminar el sprint',
        isLoading: false
      });
      throw error;
    }
  }
})); 