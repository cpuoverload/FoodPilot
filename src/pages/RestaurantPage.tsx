import { useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import VoiceInput from '../components/common/VoiceInput';
import { restaurants } from '../data/mockData';
import { Restaurant, UserPreferences } from '../types';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';

function RestaurantPage(): JSX.Element {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [isVoiceInputOpen, setIsVoiceInputOpen] = useState(false);
  const navigate = useNavigate();

  const handlePreferenceUpdate = (newPreferences: UserPreferences): void => {
    setPreferences(newPreferences);
    const filtered = restaurants.filter(restaurant => {
      if (newPreferences.spicy && !restaurant.cuisine.includes('Sichuan')) return false;
      if (newPreferences.price === 'low' && restaurant.priceRange === '$$$') return false;
      return true;
    });
    setFilteredRestaurants(filtered);
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        py: 2,
        px: 2,
        pb: 10,
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}
    >
      <Box 
        sx={{ 
          position: 'fixed',
          bottom: 100,
          right: 20,
          zIndex: 1000
        }}
      >
        <IconButton
          color="primary"
          sx={{
            width: 60,
            height: 60,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
            boxShadow: 3
          }}
          onClick={() => setIsVoiceInputOpen(true)}
        >
          <MicIcon sx={{ color: 'white', fontSize: 30 }} />
        </IconButton>
      </Box>

      <Dialog
        open={isVoiceInputOpen}
        onClose={() => setIsVoiceInputOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <VoiceInput onPreferenceUpdate={handlePreferenceUpdate} />
        </DialogContent>
      </Dialog>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ px: 1 }}>Recommended Restaurants</Typography>
          {filteredRestaurants.map(restaurant => (
            <Card 
              key={restaurant.id}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              sx={{ 
                mb: 2,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
              }}
            >
              <Box
                sx={{
                  height: 200,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {restaurant.priceRange}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.cuisine}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    ¥{restaurant.dishes[0].price}/人均
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default RestaurantPage; 