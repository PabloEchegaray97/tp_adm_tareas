import './ScreenBacklog.css';
import { AddTask, Share, Visibility, Edit, Delete } from '@mui/icons-material';

export const ScreenBacklog = () => {
  return (
    <div className="screen-backlog">
      <div className="backlog-header">
        <h2>Backlog</h2>
        <div className="header-actions">
          <span>Tareas en el backlog</span>
          <button className="create-task-btn">
            Crear tarea
            <AddTask />
          </button>
        </div>
      </div>

      <div className="tasks-container">
        <div className="task-card">
          <div className="task-content">
            <span className="task-title">Título: Tarea 2</span>
            <span className="task-description">Descripción: Estamos aca...</span>
          </div>
          <div className="task-actions">
            <button className="action-btn">
              Enviar a
              <Share />
            </button>
            <button className="action-btn">
              Seleccione una sprint
              <span className="icon">▼</span>
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
  );
}; 