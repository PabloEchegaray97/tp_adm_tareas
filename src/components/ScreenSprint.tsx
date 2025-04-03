import { AddTask, Visibility, Edit, Delete } from '@mui/icons-material';
import './ScreenSprint.css';

export const ScreenSprint = () => {
  return (
    <div className="screen-sprint">
      <div className="sprint-header">
        <h1>Nombre de la sprint: Sprint 122</h1>
        <div className="header-actions">
          <span>Tareas en el backlog</span>
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
          </div>
        </div>

        <div className="kanban-column">
          <h2>En progreso</h2>
          <div className="tasks-container">
            <div className="task-card">
              <div className="task-content">
                <div>
                  <div className="task-header">
                    <span className="task-title">Título: Tarea 2</span>
                  </div>
                  <span className="task-description">Descripción: Estamos aca...</span>
                  <span className="task-limit">Límite: 2025-03-06</span>
                </div>
                <div className="task-actions">
                  <button className="action-btn">
                    Enviar al Backlog
                  </button>
                  <button className="action-btn">
                    En Progreso
                  </button>
                </div>
              </div>

              <div>
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
          </div>
        </div>

        <div className="kanban-column">
          <h2>Completado</h2>
          <div className="tasks-container">
            <div className="task-card">
              <div className="task-content">
                <div className="task-header">
                  <span className="task-title">Título: Tarea 2</span>
                </div>
                <span className="task-description">Descripción: Estamos aca...</span>
                <span className="task-limit">Límite: 2025-03-06</span>
              </div>
              <div className="task-actions">
                <button className="action-btn">
                  Enviar al Backlog
                </button>
                <button className="action-btn">
                  Completado
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
          </div>
        </div>
      </div>
    </div>
  );
}; 