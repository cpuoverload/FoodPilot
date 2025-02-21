import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1000,
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -2px 20px 0 rgba(0,0,0,0.05)',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        mx: 'auto',
        maxWidth: 'sm',
        width: '100%'
      }} 
      elevation={0}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => {
          navigate(newValue);
        }}
        sx={{ 
          height: 80,
          borderRadius: 'inherit',
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '12px 0',
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main'
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Recipes"
          value="/cooking"
          icon={<KitchenIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navbar; 