import { Box, List, Typography } from '@mui/material';
import SprintListItem from './SprintListItem';

const SprintList = () => {
  const sprints = [
    {
      sprintNumber: 'Sprint 122',
      startDate: '2025-03-04',
      endDate: '2025-03-11'
    },
    {
      sprintNumber: 'Sprint 121',
      startDate: '2025-02-20',
      endDate: '2025-02-27'
    }
  ];

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Lista de Sprints
        </Typography>
      </Box>
      
      <List>
        {sprints.map((sprint, index) => (
          <SprintListItem
            key={index}
            sprintNumber={sprint.sprintNumber}
            startDate={sprint.startDate}
            endDate={sprint.endDate}
          />
        ))}
      </List>
    </Box>
  );
};

export default SprintList; 