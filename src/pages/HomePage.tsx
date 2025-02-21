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

  // 添加一个状态来存储每个项目的顺序
  const [itemOrders, setItemOrders] = useState<number[]>([]);

  // 修改 shuffleList 函数
  const shuffleList = useCallback(() => {
    const newOrder = [...Array(filteredDishes.length)].map((_, i) => i);
    for (let i = newOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    }
    setItemOrders(newOrder);
    setFilteredDishes(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  // 在组件挂载时初始化顺序
  useEffect(() => {
    setItemOrders([...Array(filteredDishes.length)].map((_, i) => i));
  }, []);

  useEffect(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    
    if (savedIdentity && !hasRecommended) {
      setIsRecommending(true);
      
      // 创建一个定时器，每200ms重新排列一次
      const shuffleInterval = setInterval(() => {
        shuffleList();
      }, 200);
      
      // 2秒后结束推荐状态和清除定时器
      setTimeout(() => {
        clearInterval(shuffleInterval);
        setIsRecommending(false);
        setHasRecommended(true);
        localStorage.setItem('recommended_dishes_for', savedIdentity);
      }, 2000);

      // 清理函数
      return () => clearInterval(shuffleInterval);
    }
  }, [hasRecommended, shuffleList]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, pb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Recommended Dishes
      </Typography>
      
      <Grid container spacing={3}>
        {filteredDishes.map((dish, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={dish.id}
            sx={{ 
              order: itemOrders[index],
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
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