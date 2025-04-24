import { ISprint } from "../../../types/ISprint";
import "./SprintDetailModal.css";

interface SprintDetailModalProps {
  sprint: ISprint;
  onClose: () => void;
}

export const SprintDetailModal = ({
  sprint,
  onClose,
}: SprintDetailModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{sprint.nombre}</h2>
        <p>
          <strong>Fecha de inicio:</strong> {sprint.fechaInicio}
        </p>
        <p>
          <strong>Fecha de cierre:</strong> {sprint.fechaCierre}
        </p>
        <p>
          <strong>Tareas:</strong>
        </p>
        {sprint.tareas.length > 0 ? (
          <ul>
            {sprint.tareas.map((tarea, index) => (
              <li key={index}>{tarea.titulo}</li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas asignadas</p>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};
