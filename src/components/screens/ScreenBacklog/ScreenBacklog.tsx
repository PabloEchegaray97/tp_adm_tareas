import "./ScreenBacklog.css";
import { AddTask } from "@mui/icons-material";
import { TaskCard } from "../../ui/TaskCard/TaskCard";
import { useState } from "react";
import { Modal } from "../../ui/Modal/Modal";

export const ScreenBacklog = () => {
  const [openModalTask, setOpenModalTask] = useState(false);

  const handleCloseModal = () => {
    setOpenModalTask(false);
  };
  return (
    <>
      <div className="screen-backlog">
        <div className="backlog-header">
          <h2>Backlog</h2>
          <div className="header-actions">
            <span>Tareas en el backlog</span>
            <button
              className="create-task-btn"
              onClick={() => setOpenModalTask(true)}
            >
              Crear tarea
              <AddTask />
            </button>
          </div>
        </div>

        <div className="tasks-container">
          <TaskCard title="Tarea 2" description="Estamos aca..." />
        </div>
      </div>
      {openModalTask && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};
