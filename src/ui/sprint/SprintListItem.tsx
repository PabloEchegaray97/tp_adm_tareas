import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

interface SprintListItemProps {
  sprintNumber: string;
  startDate: string;
  endDate: string;
}

const SprintListItem = ({ sprintNumber, startDate, endDate }: SprintListItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <FormatListBulletedIcon  />
        </ListItemIcon>
        <ListItemText 
          primary={sprintNumber}
          secondary={
            <Box component="span" sx={{ fontSize: '0.8rem' }}>
              Inicio: {startDate}
              <br />
              Cierre: {endDate}
            </Box>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default SprintListItem; 