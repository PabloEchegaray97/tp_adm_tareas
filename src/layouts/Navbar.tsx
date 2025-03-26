import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ onToggleTheme, isDarkMode }: NavbarProps) => {
  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        borderBottom: 1, 
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        <Box sx={{ width: '48px' }} /> {/* Espacio para equilibrar el icono */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            textAlign: 'center'
          }}
        >
          Administrador de tareas
        </Typography>
        <IconButton 
          onClick={onToggleTheme} 
          color="inherit"
          sx={{
            backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            '&:hover': {
              backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
            }
          }}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 