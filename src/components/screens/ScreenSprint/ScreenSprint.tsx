import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddTask, Visibility, Edit, Delete } from '@mui/icons-material';
import './ScreenSprint.css';
import { getSprintById } from '../../../http/sprint';
import { ISprint } from '../../../types/ISprint';
import { ITask } from '../../../types/ITask';

export const ScreenSprint = () => {
  const { sprintId } = useParams<{ sprintId: string }>();
  const [sprint, setSprint] = useState<ISprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSprintData = async () => {
      setLoading(true);
      try {
        if (!sprintId) {
          throw new Error('ID de sprint no proporcionado');
        }
        const sprintData = await getSprintById(sprintId);
        setSprint(sprintData);
      } catch (err) {
        console.error('Error al cargar el sprint:', err);
        setError('No se pudo cargar la información del sprint');
      } finally {
        setLoading(false);
      }
    };

    fetchSprintData();
  }, [sprintId]);

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

  if (loading) {
    return <div className="screen-sprint loading">Cargando información del sprint...</div>;
  }

  if (error || !sprint) {
    return <div className="screen-sprint error">{error || 'Sprint no encontrado'}</div>;
  }

  return (
    <div className="screen-sprint">
      <div className="sprint-header">
        <h1>Sprint: {sprint.title}</h1>
        <div className="header-actions">
          <span>Fecha de inicio: {sprint.startDate} - Fecha de cierre: {sprint.closingDate}</span>
          <button className="create-task-btn">
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
                    <button className="action-btn">
                      Enviar al Backlog
                    </button>
                    <button className="action-btn">
                      Mover a En Progreso
                    </button>
                  </div>
                </div>

                <div className='task-actions-vertical'>
                  <button className="action-btn" title="Ver">
                    <Visibility />
                  </button>
                  <button className="action-btn" title="Editar">
                    <Edit />
                  </button>
                  <button className="action-btn" title="Eliminar">
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
                    <button className="action-btn">
                      Mover a Pendiente
                    </button>
                    <button className="action-btn">
                      Mover a Completado
                    </button>
                  </div>
                </div>

                <div className='task-actions-vertical'>
                  <button className="action-btn" title="Ver">
                    <Visibility />
                  </button>
                  <button className="action-btn" title="Editar">
                    <Edit />
                  </button>
                  <button className="action-btn" title="Eliminar">
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
                  <div className="task-header">
                    <span className="task-title">Título: {task.title}</span>
                  </div>
                  <span className="task-description">Descripción: {task.description}</span>
                  {task.deadline && <span className="task-limit">Límite: {task.deadline}</span>}
                </div>
                <div className="task-actions">
                  <button className="action-btn">
                    Mover a En Progreso
                  </button>
                  <button className="action-btn" title="Ver">
                    <Visibility />
                  </button>
                  <button className="action-btn" title="Editar">
                    <Edit />
                  </button>
                  <button className="action-btn" title="Eliminar">
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
    </div>
  );
}; 