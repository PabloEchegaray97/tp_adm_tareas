import "./ScreenBacklog.css";
import { AddTask } from "@mui/icons-material";
import { TaskCard } from "../../ui/TaskCard/TaskCard";
import { useState, useEffect } from "react";
import { Modal } from "../../ui/Modal/Modal";
import { useTaskStore, useSprintStore } from "../../../store";
import { showAlert, showConfirm } from "../../../utils/sweetAlert";

export const ScreenBacklog = () => {
  const [openModalTask, setOpenModalTask] = useState(false);
  const { 
    tasks: backlogTasks, 
    isLoading: loading, 
    fetchTasks, 
    setActiveTask,
    deleteTask 
  } = useTaskStore();

  const {
    addTask: addTaskToSprint
  } = useSprintStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCloseModal = () => {
    setOpenModalTask(false);
    setActiveTask(null);
  };
  
  const handleCreateTask = () => {
    setActiveTask(null);
    setOpenModalTask(true);
  };
  
  const handleEditTask = (taskId: string) => {
    const task = backlogTasks.find(t => t.id === taskId);
    if (task) {
      setActiveTask(task);
      setOpenModalTask(true);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const result = await showConfirm(
      '¿Eliminar tarea?', 
      '¿Estás seguro de que deseas eliminar esta tarea?',
      'Sí, eliminar',
      'Cancelar'
    );
    
    if (result.isConfirmed) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        showAlert('No se pudo eliminar la tarea', 'error');
      }
    }
  };

  const handleSendToSprint = async (taskId: string, sprintId: string) => {
    try {
      // Buscar la tarea a enviar
      const task = backlogTasks.find(t => t.id === taskId);
      if (!task) {
        showAlert('Tarea no encontrada', 'error');
        return;
      }

      // Añadir la tarea al sprint con estado "pendiente"
      await addTaskToSprint(sprintId, {
        titulo: task.titulo,
        descripcion: task.descripcion,
        fechaLimite: task.fechaLimite || '',
        estado: 'pendiente'
      });

      // Si todo va bien, eliminar la tarea del backlog
      await deleteTask(taskId);
      
      showAlert('Tarea enviada al sprint exitosamente', 'success');
    } catch (error) {
      console.error('Error al enviar la tarea al sprint:', error);
      showAlert('No se pudo enviar la tarea al sprint', 'error');
    }
  };
  
  return (
    <>
      <div className="screen-backlog">
        <div className="backlog-header">
          <h2>Backlog</h2>
          <div className="header-actions">
            <span>Tareas en el backlog: {backlogTasks.length}</span>
            <button
              className="create-task-btn"
              onClick={handleCreateTask}
            >
              Crear tarea
              <AddTask />
            </button>
          </div>
        </div>

        <div className="tasks-container">
          {loading ? (
            <p>Cargando tareas...</p>
          ) : backlogTasks.length > 0 ? (
            backlogTasks.map((task) => (
              <TaskCard 
                key={task.id} 
                titulo={task.titulo} 
                descripcion={task.descripcion}
                fechaLimite={task.fechaLimite}
                onEditClick={() => handleEditTask(task.id)}
                onDeleteClick={() => handleDeleteTask(task.id)}
                onSendToSprint={(sprintId) => handleSendToSprint(task.id, sprintId)}
              />
            ))
          ) : (
            <p>No hay tareas en el backlog</p>
          )}
        </div>
      </div>
      {openModalTask && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};
