import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddTask, Visibility, Edit, Delete } from '@mui/icons-material';
import './ScreenSprint.css';
import { ITask } from '../../../types/ITask';
import { Modal } from '../../ui/Modal/Modal';
import { useTaskStore, useSprintStore } from '../../../store';

export const ScreenSprint = () => {
  const { sprintId } = useParams<{ sprintId: string }>();
  const [showModal, setShowModal] = useState(false);
  
  const { 
    currentSprint: sprint, 
    error,
    fetchSprintById,
    moveTask,
    deleteTask,
    moveTaskToBacklog
  } = useSprintStore();
  
  const { setActiveTask } = useTaskStore();

  useEffect(() => {
    if (sprintId) {
      fetchSprintById(sprintId);
    }
  }, [sprintId, fetchSprintById]);

  // Filtrar tareas por estado
  const getPendingTasks = (): ITask[] => {
    return sprint?.tasks.filter(task => task.status === 'pending') || [];
  };

  const getInProgressTasks = (): ITask[] => {
    return sprint?.tasks.filter(task => task.status === 'in-progress') || [];
  };

  const getCompletedTasks = (): ITask[] => {
    return sprint?.tasks.filter(task => task.status === 'completed') || [];
  };

  const handleOpenModal = () => {
    setActiveTask(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handleEditTask = (taskId: string) => {
    if (!sprint) return;
    
    const task = sprint.tasks.find(t => t.id === taskId);
    if (task) {
      setActiveTask(task);
      setShowModal(true);
    }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    if (!sprintId) return;
    
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await deleteTask(sprintId, taskId);
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        alert('No se pudo eliminar la tarea');
      }
    }
  };
  
  const handleMoveTask = async (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    if (!sprintId) return;
    
    try {
      await moveTask(sprintId, taskId, newStatus);
    } catch (error) {
      console.error('Error al mover la tarea:', error);
      alert('No se pudo mover la tarea');
    }
  };
  
  const handleMoveToBacklog = async (taskId: string) => {
    if (!sprintId) return;
    
    if (window.confirm('¿Estás seguro de que deseas enviar esta tarea al backlog?')) {
      try {
        await moveTaskToBacklog(sprintId, taskId);
      } catch (error) {
        console.error('Error al mover la tarea al backlog:', error);
        alert('No se pudo mover la tarea al backlog');
      }
    }
  };

  if (error || !sprint) {
    return <div className="screen-sprint error">{error || 'Sprint no encontrado'}</div>;
  }

  return (
    <div className="screen-sprint">
      <div className="sprint-header">
        <h1>Sprint: {sprint.title}</h1>
        <div className="header-actions">
          <span>Fecha de inicio: {sprint.startDate} - Fecha de cierre: {sprint.closingDate}</span>
          <button className="create-task-btn" onClick={handleOpenModal}>
            Crear tarea
            <AddTask />
          </button>
        </div>
      </div>

      <div className="kanban-board">
        <div className="kanban-column">
          <h2>Pendiente</h2>
          <div className="tasks-container">
            {getPendingTasks().map(task => (
              <div key={task.id} className="task-card">
                <div className="task-content">
                  <div>
                    <div className="task-header">
                      <span className="task-title">Título: {task.title}</span>
                    </div>
                    <span className="task-description">Descripción: {task.description}</span>
                    {task.deadline && <div className="task-limit">Límite: {task.deadline}</div>}
                  </div>
                  <div className="task-actions">
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveToBacklog(task.id)}
                    >
                      Enviar al Backlog
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveTask(task.id, 'in-progress')}
                    >
                      Mover a En Progreso
                    </button>
                  </div>
                </div>

                <div className='task-actions-vertical'>
                  <button className="action-btn" title="Ver">
                    <Visibility />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Editar"
                    onClick={() => handleEditTask(task.id)}
                  >
                    <Edit />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Eliminar"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
            {getPendingTasks().length === 0 && (
              <p className="empty-column-message">No hay tareas pendientes</p>
            )}
          </div>
        </div>

        <div className="kanban-column">
          <h2>En progreso</h2>
          <div className="tasks-container">
            {getInProgressTasks().map(task => (
              <div key={task.id} className="task-card">
                <div className="task-content">
                  <div>
                    <div className="task-header">
                      <span className="task-title">Título: {task.title}</span>
                    </div>
                    <span className="task-description">Descripción: {task.description}</span>
                    {task.deadline && <div className="task-limit">Límite: {task.deadline}</div>}
                  </div>
                  <div className="task-actions">
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveTask(task.id, 'pending')}
                    >
                      Mover a Pendiente
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveTask(task.id, 'completed')}
                    >
                      Mover a Completado
                    </button>
                  </div>
                </div>

                <div className='task-actions-vertical'>
                  <button className="action-btn" title="Ver">
                    <Visibility />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Editar"
                    onClick={() => handleEditTask(task.id)}
                  >
                    <Edit />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Eliminar"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
            {getInProgressTasks().length === 0 && (
              <p className="empty-column-message">No hay tareas en progreso</p>
            )}
          </div>
        </div>

        <div className="kanban-column">
          <h2>Completado</h2>
          <div className="tasks-container">
            {getCompletedTasks().map(task => (
              <div key={task.id} className="task-card">
                <div className="task-content">
                  <div>
                    <div className="task-header">
                      <span className="task-title">Título: {task.title}</span>
                    </div>
                    <span className="task-description">Descripción: {task.description}</span>
                    {task.deadline && <div className="task-limit">Límite: {task.deadline}</div>}
                  </div>
                  <div className="task-actions">
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveTask(task.id, 'in-progress')}
                    >
                      Mover a En Progreso
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveToBacklog(task.id)}
                    >
                      Enviar al Backlog
                    </button>
                  </div>
                </div>

                <div className='task-actions-vertical'>
                  <button className="action-btn" title="Ver">
                    <Visibility />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Editar"
                    onClick={() => handleEditTask(task.id)}
                  >
                    <Edit />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Eliminar"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Delete />
                  </button>
                </div>
              </div>
            ))}
            {getCompletedTasks().length === 0 && (
              <p className="empty-column-message">No hay tareas completadas</p>
            )}
          </div>
        </div>
      </div>
      {showModal && <Modal handleCloseModal={handleCloseModal} sprintId={sprintId} />}
    </div>
  );
}; 