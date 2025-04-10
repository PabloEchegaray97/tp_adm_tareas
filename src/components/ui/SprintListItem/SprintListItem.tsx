import { NavLink } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import './SprintListItem.css';
import { Edit, Visibility, Delete } from '@mui/icons-material';

interface SprintListItemProps {
  sprintId?: string;
  sprintNumber: string;
  startDate: string;
  endDate: string;
}

const SprintListItem = ({ sprintId, sprintNumber, startDate, endDate }: SprintListItemProps) => {
  // Si no se proporciona un ID específico, generarlo a partir del título
  const routeId = sprintId || sprintNumber.toLowerCase().replace(' ', '-');

  return (
    <li className="sprint-list-item">
      <NavLink to={`/sprint/${routeId}`} className="sprint-list-item-link">
        <div className="sprint-list-item-button">
          <div className="sprint-list-item-content">
            <div className="sprint-list-item-content-header">
              <div className="sprint-list-item-icon">
                <FormatListBulletedIcon />
              </div>
              <div className="sprint-list-item-title">{sprintNumber}</div>
            </div>
            <div className="sprint-list-item-dates">
              <div>Inicio: {startDate}</div>
              <div>Cierre: {endDate}</div>
            </div>
          </div>
          <div className="sprint-list-item-buttons">
            <button className="sprint-list-item-button">
              <Visibility />

            </button>
            <button className="sprint-list-item-button">
              <Edit />
            </button>
            <button className="sprint-list-item-button">
              <Delete />
            </button>
          </div>
        </div>
      </NavLink>
    </li>
  );
};

export default SprintListItem; 