import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import './TaskCard.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard: React.FC = () => {
  return (
    <Card>
      <div className="task-card-content">
        <div className="task-card-info">
          <h3 className="task-card-title">Título: Tarea 2</h3>
          <p className="task-card-description">
            Descripción: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>
        <div className="task-card-actions">
          <select className="task-card-select">
            <option value="">Seleccione una sprint</option>
          </select>
          <Button variant="text" size="small" className="task-card-button">
            <VisibilityIcon />
          </Button>
          <Button variant="text" size="small" className="task-card-button">
            <EditIcon />
          </Button>
          <Button variant="text" size="small" className="task-card-button">
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard; 