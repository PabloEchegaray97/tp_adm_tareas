import { ITask } from "../../../types/ITask";
import "./TaskDetailModal.css";

interface TaskDetailModalProps {
  task: ITask;
  onClose: () => void;
}

export const TaskDetailModal = ({ task, onClose }: TaskDetailModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{task.titulo}</h2>
        <p>
          <strong>Descripción:</strong> {task.descripcion}
        </p>
        {task.estado && (
          <p>
            <strong>Estado:</strong> {task.estado}
          </p>
        )}
        {task.fechaLimite && (
          <p>
            <strong>Fecha límite:</strong> {task.fechaLimite}
          </p>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};
