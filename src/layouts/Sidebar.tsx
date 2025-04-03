import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../ui/common/Button';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SprintList from '../ui/sprint/SprintList';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <NavLink to="/backlog" className="sidebar-link">
            <Button
              variant="contained"
              className="backlog-button"
              startIcon={<FormatListBulletedIcon />}
            >
              Backlog
            </Button>
          </NavLink>
        </div>
        
        <div className="sidebar-divider" />
        
        <SprintList />
      </div>
    </aside>
  );
};

export default Sidebar; 