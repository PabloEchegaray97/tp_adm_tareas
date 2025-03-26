import { Box, Card, CardContent, IconButton, Typography, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = () => {
  return (
    <Card sx={{ mb: 2}}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" >
              Título: Tarea 2
            </Typography>
            <Typography variant="body2" >
              Descripción: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Select
              value=""
                sx={{ minWidth: 120}}
              >
                <MenuItem value="">Seleccione una sprint</MenuItem>
            </Select>
            <IconButton 

            >
              <VisibilityIcon />
            </IconButton>
            <IconButton 
            >

              <EditIcon />
            </IconButton>
            <IconButton 
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard; 