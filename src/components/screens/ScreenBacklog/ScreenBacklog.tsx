import "./ScreenBacklog.css";
import { AddTask } from "@mui/icons-material";
import { TaskCard } from "../../ui/TaskCard/TaskCard";

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
        <TaskCard title="Tarea 2" description="Estamos aca..." />
      </div>
    </div>
  );
};
