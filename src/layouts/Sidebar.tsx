import { Box, Button, Divider, Drawer } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SprintList from '../ui/sprint/SprintList';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',

        },
      }}
    >
      <Box sx={{ p: 1.72}}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<FormatListBulletedIcon />}
          sx={{ 
            bgcolor: theme => theme.palette.mode === 'dark' ? 'white' : 'black',
            color: theme => theme.palette.mode === 'dark' ? 'black' : 'white',
           }}
        >
          Backlog
        </Button>
      </Box>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
      
      <SprintList />
    </Drawer>
  );
};

export default Sidebar; 