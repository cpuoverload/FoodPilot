import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Paper, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isLoggedIn = localStorage.getItem('user_identity');

  if (!isLoggedIn) {
    return (
      <Box 
        sx={{ 
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            textAlign: 'center',
            maxWidth: 400,
            width: '100%',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <LockIcon 
            sx={{ 
              fontSize: 60, 
              color: 'primary.main',
              mb: 2
            }} 
          />
          <Typography variant="h5" gutterBottom>
            Login Required
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Please login to access more features
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => window.location.href = '/profile'}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 4
            }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    );
  }

  return <>{children}</>;
}

export default PrivateRoute; 