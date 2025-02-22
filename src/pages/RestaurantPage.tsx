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
import { dishes } from '../data/mockData';
import { Restaurant, UserPreferences } from '../types';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';

function RestaurantPage(): JSX.Element {
  const navigate = useNavigate();

  // 从菜品数据中获取唯一的餐厅列表
  const uniqueRestaurants = Array.from(
    new Set(dishes.map(dish => dish.restaurant.id))
  ).map(restaurantId => {
    const dish = dishes.find(d => d.restaurant.id === restaurantId)!;
    return dish.restaurant;
  });

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
        >
          <MicIcon sx={{ color: 'white', fontSize: 30 }} />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ px: 1 }}>Recommended Restaurants</Typography>
          {uniqueRestaurants.map(restaurant => (
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