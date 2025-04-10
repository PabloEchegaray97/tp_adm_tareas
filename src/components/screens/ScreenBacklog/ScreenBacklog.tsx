import "./ScreenBacklog.css";
import { AddTask } from "@mui/icons-material";
import { TaskCard } from "../../ui/TaskCard/TaskCard";
import { useState, useEffect } from "react";
import { Modal } from "../../ui/Modal/Modal";
import { getBacklogTasks } from "../../../http/backlog";
import { ITask } from "../../../types/ITask";

export const ScreenBacklog = () => {
  const [openModalTask, setOpenModalTask] = useState(false);
  const [backlogTasks, setBacklogTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBacklogTasks = async () => {
      try {
        const tasks = await getBacklogTasks();
        setBacklogTasks(tasks);
      } catch (error) {
        console.error("Error al cargar tareas del backlog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBacklogTasks();
  }, []);

  const handleCloseModal = () => {
    setOpenModalTask(false);
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
              onClick={() => setOpenModalTask(true)}
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
                title={task.title} 
                description={task.description}
                createdAt={task.createdAt}
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
