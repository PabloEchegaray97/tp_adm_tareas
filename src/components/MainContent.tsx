import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TaskCard from '../ui/task/TaskCard';

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Backlog
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<EditIcon />}
          sx={{
            bgcolor: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
            color: theme => theme.palette.mode === 'dark' ? 'black' : 'white',

          }}
        >
          Crear tarea
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Tareas en el backlog
      </Typography>

      <TaskCard />
    </Box>
  );
};

export default MainContent; 