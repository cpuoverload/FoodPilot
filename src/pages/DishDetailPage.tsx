import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Chip, IconButton } from '@mui/material';
import { restaurants } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function DishDetailPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 在所有餐厅中查找对应的菜品
  const dish = restaurants.flatMap(r => r.dishes).find(d => d.id === Number(id));

  if (!dish) {
    return <Typography>菜品未找到</Typography>;
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
      
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Chip label={`¥${dish.price}`} color="primary" />
        <Chip label={dish.spicyLevel} />
        {dish.tags.map((tag, index) => (
          <Chip key={index} label={tag} variant="outlined" />
        ))}
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>营养信息</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Typography>卡路里: {dish.nutrition.calories}</Typography>
          <Typography>蛋白质: {dish.nutrition.protein}</Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>餐厅信息</Typography>
        <Typography variant="body1">{dish.restaurant.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {dish.restaurant.cuisine} · {dish.restaurant.priceRange}
        </Typography>
      </Paper>
    </Container>
  );
}

export default DishDetailPage; 