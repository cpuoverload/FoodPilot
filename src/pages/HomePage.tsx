import { useState, useEffect, useCallback } from 'react';
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
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { dishes, identityPreferences } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function HomePage(): JSX.Element {
  const [filteredDishes, setFilteredDishes] = useState(dishes);
  const [isVoiceInputOpen, setIsVoiceInputOpen] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const navigate = useNavigate();

  // 修改 hasRecommended 的初始化逻辑
  const [hasRecommended, setHasRecommended] = useState(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    const recommendedFor = localStorage.getItem('recommended_dishes_for');
    // 只有当没有推荐记录，或者推荐的身份与当前登录身份不同时，才需要显示动画
    return savedIdentity && recommendedFor && savedIdentity === recommendedFor;
  });

  // 随机重排列表
  const shuffleList = useCallback(() => {
    setFilteredDishes(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    
    // 如果已登录且还没推荐过，则显示推荐动画
    if (savedIdentity && !hasRecommended) {
      setIsRecommending(true);
      setTimeout(() => {
        setIsRecommending(false);
        setHasRecommended(true);
        localStorage.setItem('recommended_dishes_for', savedIdentity);
        shuffleList();
      }, 2000);
    }
  }, [hasRecommended, shuffleList]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, pb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Recommended Dishes
      </Typography>
      
      <Grid container spacing={3}>
        {filteredDishes.map((dish, index) => (
          <Grid item xs={12} sm={6} md={4} key={dish.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                },
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

      {/* 推荐中的遮罩层 */}
      <Backdrop
        sx={{ 
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
        open={isRecommending}
      >
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" color="primary">
          Recommending for you...
        </Typography>
      </Backdrop>
    </Container>
  );
}

export default HomePage; 