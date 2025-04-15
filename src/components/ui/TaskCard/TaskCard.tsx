import React, { useState } from "react";
import "./TaskCard.css";
import { Share, Visibility, Edit, Delete } from "@mui/icons-material";
import { SprintSelector } from "../SprintSelector/SprintSelector";

interface TaskCardProps {
  title: string;
  description: string;
  createdAt?: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onViewClick?: () => void;
  onSendToSprint?: (sprintId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  title, 
  description, 
  createdAt,
  onEditClick,
  onDeleteClick,
  onViewClick,
  onSendToSprint
}) => {
  const [selectedSprintId, setSelectedSprintId] = useState<string>("");

  const handleSprintChange = (sprintId: string) => {
    setSelectedSprintId(sprintId);
  };

  const handleSendToSprint = () => {
    if (selectedSprintId && onSendToSprint) {
      onSendToSprint(selectedSprintId);
    } else {
      alert("Por favor seleccione un sprint primero");
    }
  };

  return (
    <div className="task-card">
      <div className="task-content">
        <span className="task-title">Título: {title}</span>
        <span className="task-description">Descripción: {description}</span>
        {createdAt && <span className="task-created-at">Creado: {createdAt}</span>}
      </div>
      <div className="task-actions">
        <div className="sprint-selector-wrapper">
          <SprintSelector 
            value={selectedSprintId} 
            onChange={handleSprintChange} 
          />
        </div>
        
        <button 
          className="action-btn send-btn"
          onClick={handleSendToSprint}
          disabled={!selectedSprintId}
        >
          Enviar
          <Share />
        </button>

        <div className="action-buttons-group">
          <button className="action-btn" title="Ver" onClick={onViewClick}>
            <Visibility />
          </button>
          <button className="action-btn" title="Editar" onClick={onEditClick}>
            <Edit />
          </button>
          <button className="action-btn" title="Eliminar" onClick={onDeleteClick}>
            <Delete />
          </button>
        </div>
      </div>
    </div>
  );
};
