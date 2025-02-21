import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  Dialog,
} from '@mui/material';
import { dishes } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import VoiceInput from '../components/common/VoiceInput';
import MicIcon from '@mui/icons-material/Mic';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function HomePage(): JSX.Element {
  const [filteredDishes, setFilteredDishes] = useState(dishes);
  const [isVoiceInputOpen, setIsVoiceInputOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, pb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        推荐菜品
      </Typography>
      
      <Grid container spacing={3}>
        {filteredDishes.map((dish) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
              }}
              onClick={() => navigate(`/dish/${dish.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={dish.imageUrl}
                alt={dish.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {dish.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating value={dish.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    ({dish.reviews})
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <RestaurantIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {dish.restaurant.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ¥{dish.price}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {dish.tags.slice(0, 2).map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Voice Input Button and Dialog */}
      <Box sx={{ position: 'fixed', bottom: 100, right: 20, zIndex: 1000 }}>
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
        <VoiceInput onPreferenceUpdate={(prefs) => {
          // 实现基于用户偏好的菜品过滤逻辑
          setIsVoiceInputOpen(false);
        }} />
      </Dialog>
    </Container>
  );
}

export default HomePage; 