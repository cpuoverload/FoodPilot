import { Box, Card, CardContent, Typography, Grid, Snackbar, Alert } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';

interface IdentityOption {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface IdentitySelectionProps {
  onSelect: (identity: string) => void;
}

function IdentitySelection({ onSelect }: IdentitySelectionProps): JSX.Element {
  const [showMessage, setShowMessage] = useState(false);

  const handleSelect = (id: string) => {
    if (id === 'others') {
      setShowMessage(true);
    } else {
      onSelect(id);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  const identities: IdentityOption[] = [
    {
      id: 'professional',
      title: 'Professional',
      description: 'Fast-paced life, seeking convenient and nutritious meal plans',
      icon: <WorkIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'health',
      title: 'Health Enthusiast',
      description: 'Focus on healthy eating and balanced nutrition',
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'housewife',
      title: 'Home Cook',
      description: 'Care for family diet, skilled in cooking and nutrition',
      icon: <HomeIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'others',
      title: 'Others',
      description: 'Custom dietary preferences and meal plans',
      icon: <PersonIcon sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        Select Your Identity
      </Typography>
      <Grid container spacing={2}>
        {identities.map((identity) => (
          <Grid item xs={12} key={identity.id}>
            <Card 
              onClick={() => handleSelect(identity.id)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ mr: 2, color: 'primary.main' }}>
                  {identity.icon}
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {identity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {identity.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={showMessage} 
        autoHideDuration={3000} 
        onClose={handleCloseMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          marginTop: '80px'
        }}
      >
        <Alert 
          onClose={handleCloseMessage} 
          severity="info" 
          sx={{ 
            width: '100%',
            boxShadow: 3
          }}
        >
          This feature is coming soon!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default IdentitySelection; 