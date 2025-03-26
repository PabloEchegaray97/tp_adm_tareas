import { Box, Card, CardContent, IconButton, Typography, Select, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskCard = () => {
  return (
    <Card sx={{ mb: 2, bgcolor: 'background.paper' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6">
              Título: Tarea 2
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Descripción: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Select
              value=""
              size="small"
              sx={{ 
                minWidth: 120, 
                bgcolor: 'action.hover',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider'
                }
              }}
            >
              <MenuItem value="">Seleccione una sprint</MenuItem>
            </Select>
            <IconButton 
              size="small"
              sx={{ 
                width: 40,
                height: 40,
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected'
                }
              }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small"
              sx={{ 
                width: 40,
                height: 40,
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected'
                }
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton 
              sx={{ 
                width: 40,
                height: 40,
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected'
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard; 