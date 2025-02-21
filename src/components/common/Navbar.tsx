import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PersonIcon from '@mui/icons-material/Person';

function Navbar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu & Grocery Plan', path: '/cooking' },
    { name: 'Restaurant', path: '/restaurant' },
    { name: 'About', path: '/about' },
  ];

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
          },
          '& .Mui-selected': {
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s'
            }
          }
        }}
      >
        <BottomNavigationAction
          label="Restaurants"
          value="/"
          icon={<RestaurantIcon />}
          sx={{ minWidth: 'auto' }}
        />
        <BottomNavigationAction
          label="Cooking"
          value="/cooking"
          icon={<KitchenIcon />}
          sx={{ minWidth: 'auto' }}
        />
        <BottomNavigationAction
          label="Profile"
          value="/profile"
          icon={<PersonIcon />}
          sx={{ minWidth: 'auto' }}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navbar; 