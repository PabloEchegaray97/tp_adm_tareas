import React from "react";
import "./TaskCard.css";
import { Share, Visibility, Edit, Delete } from "@mui/icons-material";

interface TaskCardProps {
  title: string;
  description: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => {
  return (
    <div className="task-card">
      <div className="task-content">
        <span className="task-title">Título: {title}</span>
        <span className="task-description">Descripción: {description}</span>
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
  );
};
