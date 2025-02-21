import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Chip, Grid, IconButton } from '@mui/material';
import { restaurants } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function RestaurantDetailPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === Number(id));

  // 直接调用滚动
  window.scrollTo(0, 0);

  if (!restaurant) {
    return <Typography>餐厅未找到</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, pb: 10 }}>
      <Box sx={{ position: 'sticky', top: 0, bgcolor: 'background.default', zIndex: 1000, pb: 2 }}>
        <IconButton 
          onClick={() => navigate(-1)}
          sx={{ 
            position: 'absolute',
            left: 0,
            top: 0,
            bgcolor: 'background.paper',
            boxShadow: 2,
            '&:hover': { bgcolor: 'background.paper' }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 4, mt: 6 }}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '16px'
          }}
        />
      </Box>

      <Typography variant="h4" gutterBottom>{restaurant.name}</Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Chip label={restaurant.cuisine} color="primary" />
        <Chip label={restaurant.priceRange} />
      </Box>

      <Typography variant="h5" gutterBottom>菜品</Typography>
      <Grid container spacing={3}>
        {restaurant.dishes.map(dish => (
          <Grid item xs={12} key={dish.id}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">{dish.name}</Typography>
                <Typography variant="h6" color="primary">¥{dish.price}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  辣度: {dish.spicyLevel}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  卡路里: {dish.nutrition.calories} | 蛋白质: {dish.nutrition.protein}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default RestaurantDetailPage; 