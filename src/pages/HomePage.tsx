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
  IconButton,
  Dialog,
  Fade,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { dishes, identityPreferences } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import VoiceInput from '../components/common/VoiceInput';
import MicIcon from '@mui/icons-material/Mic';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AutorenewIcon from '@mui/icons-material/Autorenew';

function HomePage(): JSX.Element {
  const [filteredDishes, setFilteredDishes] = useState(dishes);
  const [isVoiceInputOpen, setIsVoiceInputOpen] = useState(false);
  const [isRecommending, setIsRecommending] = useState(false);
  const navigate = useNavigate();

  // 修改 hasRecommended 的初始化逻辑
  const [hasRecommended, setHasRecommended] = useState(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    const recommendedFor = localStorage.getItem('recommended_for');
    // 只有当前登录的身份与上次推荐的身份相同时，才认为已经推荐过
    return savedIdentity && recommendedFor && savedIdentity === recommendedFor;
  });

  // 随机重排列表
  const shuffleList = useCallback(() => {
    setFilteredDishes(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    
    // 只在有身份且未推荐过时执行推荐
    if (savedIdentity && !hasRecommended) {
      setIsRecommending(true);
      
      // 先展示所有菜品
      setFilteredDishes(dishes);
      
      // 每200ms随机重排一次列表
      const shuffleInterval = setInterval(shuffleList, 200);
      
      // 1.5秒后停止随机重排，展示最终推荐结果
      setTimeout(() => {
        clearInterval(shuffleInterval);
        const preferences = identityPreferences[savedIdentity as keyof typeof identityPreferences];
        const recommendedDishes = dishes.filter(dish => {
          const matchesTags = dish.tags.some(tag => preferences.tags.includes(tag));
          const matchesPrice = preferences.priceRange.includes(dish.restaurant.priceRange);
          const matchesSpicy = preferences.spicyLevel.includes(dish.spicyLevel);
          return matchesTags || matchesPrice || matchesSpicy;
        });
        
        setFilteredDishes(recommendedDishes);
        setIsRecommending(false);
        
        // 标记已经推荐过，同时记录为哪个身份推荐的
        setHasRecommended(true);
        localStorage.setItem('recommended_for', savedIdentity);
      }, 1500);

      return () => clearInterval(shuffleInterval);
    } else if (savedIdentity && hasRecommended) {
      // 如果已经推荐过，直接使用保存的身份重新过滤菜品
      const preferences = identityPreferences[savedIdentity as keyof typeof identityPreferences];
      const recommendedDishes = dishes.filter(dish => {
        const matchesTags = dish.tags.some(tag => preferences.tags.includes(tag));
        const matchesPrice = preferences.priceRange.includes(dish.restaurant.priceRange);
        const matchesSpicy = preferences.spicyLevel.includes(dish.spicyLevel);
        return matchesTags || matchesPrice || matchesSpicy;
      });
      setFilteredDishes(recommendedDishes);
    }
  }, [shuffleList, hasRecommended]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, pb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        推荐菜品
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
          正在为您推荐...
        </Typography>
      </Backdrop>

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

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Container>
  );
}

export default HomePage; 