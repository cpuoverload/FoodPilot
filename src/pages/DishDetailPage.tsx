import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Chip, IconButton, Grid } from '@mui/material';
import { dishes } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SavingsIcon from '@mui/icons-material/Savings';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function DishDetailPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 直接从 dishes 数组中查找
  const dish = dishes.find(d => d.id === Number(id));

  if (!dish) {
    return <Typography>Dish not found</Typography>;
  }

  // 将重复的地址判断改为使用对象映射
  const RESTAURANT_ADDRESSES = {
    1: "30 Victoria Street, #01-26/27, CHIJMES, Singapore 187996",
    2: "252 North Bridge Road, #B1-44E, Raffles City Shopping Centre, Singapore 179103",
    3: "2 Orchard Turn, #04-05, ION Orchard, Singapore 238801",
    4: "435 Orchard Road, #04-48, Wisma Atria, Singapore 238877"
  };

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
          src={dish.imageUrl}
          alt={dish.name}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '16px'
          }}
        />
      </Box>

      <Typography variant="h4" gutterBottom>{dish.name}</Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip label={`$${dish.price.toFixed(2)}`} color="primary" />
        <Chip label={dish.spicyLevel} />
        {dish.tags.map((tag, index) => (
          <Chip key={index} label={tag} variant="outlined" />
        ))}
      </Box>

      {/* Time Analysis Card */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <WatchLaterIcon />
          Time Analysis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">
                {dish.restaurant.cuisine === 'Japanese' ? '10' : '5'}
              </Typography>
              <Typography variant="caption">walking</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">
                {(() => {
                  if (dish.tags.includes('Premium')) return '20';
                  if (dish.price > 25) return '15';
                  return '10';
                })()}
              </Typography>
              <Typography variant="caption">prep time</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">
                {(() => {
                  if (dish.tags.includes('Quick')) return '15';
                  if (dish.tags.includes('Premium')) return '40';
                  if (dish.price > 25) return '30';
                  return '20';
                })()}
              </Typography>
              <Typography variant="caption">dining time</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}>
          <Typography variant="h5">
            {(() => {
              const walkTime = dish.restaurant.cuisine === 'Japanese' ? 10 : 5;
              const prepTime = dish.tags.includes('Premium') ? 20 : (dish.price > 25 ? 15 : 10);
              const diningTime = dish.tags.includes('Quick') ? 15 : 
                                (dish.tags.includes('Premium') ? 40 : 
                                (dish.price > 25 ? 30 : 20));
              return `${walkTime + prepTime + diningTime}`;
            })()} mins
          </Typography>
          <Typography variant="caption">total time</Typography>
        </Box>
      </Paper>

      {/* 2. Nutrition Analysis Card - 营养分析 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <MonitorHeartIcon color="primary" />
          Nutrition Analysis
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 2 }}>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="h4" color="primary">{dish.nutrition.calories}</Typography>
            <Typography variant="body2" color="text.secondary">Calories</Typography>
            <Typography variant="caption" color="text.secondary">
              ({Math.round(dish.nutrition.calories/2000*100)}% daily)
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Typography variant="h4" color="primary">{dish.nutrition.protein}</Typography>
            <Typography variant="body2" color="text.secondary">Protein</Typography>
            <Typography variant="caption" color="text.secondary">
              ({Math.round(parseInt(dish.nutrition.protein)/56*100)}% daily)
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          {dish.nutrition.calories < 500 ? 'Light meal (ideal for lunch)' : 'Full meal (perfect for dinner)'}
          {parseInt(dish.nutrition.protein) > 25 && ' • High protein'}
        </Typography>
      </Paper>

      {/* 3. Budget Smart Card - 预算分析 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SavingsIcon color="primary" />
          Budget Analysis
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Cost Comparison
              </Typography>
              <Typography variant="body2">
                • Similar dishes nearby: ${(dish.price * 1.2).toFixed(2)}
              </Typography>
              <Typography variant="body2">
                • Food delivery: ${(dish.price * 1.4).toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 'bold' }}>
                Your savings: up to ${(dish.price * 0.4).toFixed(2)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Value Analysis
              </Typography>
              <Typography variant="body2">
                • Cost per protein: ${(dish.price/parseInt(dish.nutrition.protein)).toFixed(2)}/g
              </Typography>
              <Typography variant="body2">
                • Cost per calorie: ${(dish.price/dish.nutrition.calories).toFixed(3)}/kcal
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {dish.price/dish.nutrition.calories < 0.02 ? '✓ Good value for money' : '• Premium quality meal'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RestaurantIcon color="primary" />
          Restaurant Information
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            {dish.restaurant.name}
          </Typography>
          {!dish.restaurant.name.toLowerCase().includes('kitchen') && 
           !dish.restaurant.name.toLowerCase().includes(dish.restaurant.cuisine.toLowerCase()) && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {dish.restaurant.cuisine} Cuisine
            </Typography>
          )}
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              display: 'flex',
              alignItems: 'flex-start',
              gap: 0.5
            }}
          >
            <LocationOnIcon sx={{ fontSize: 16, mt: 0.3 }} />
            {RESTAURANT_ADDRESSES[dish.restaurant.id]}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default DishDetailPage; 