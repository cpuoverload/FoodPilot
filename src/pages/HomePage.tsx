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
import { dishes } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function HomePage(): JSX.Element {
  // 1. 首先声明 selectedCuisine
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  
  // 2. 然后再声明 filteredDishes，这样就可以使用 selectedCuisine
  const [filteredDishes, setFilteredDishes] = useState(() => {
    return selectedCuisine
      ? dishes.filter(dish => dish.restaurant.cuisine === selectedCuisine)
      : dishes;
  });

  // 其他状态声明
  const [isRecommending, setIsRecommending] = useState(false);
  const [hasRecommended, setHasRecommended] = useState(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    const hasRecommendedDishes = localStorage.getItem('has_recommended_dishes') === 'true';
    return hasRecommendedDishes;
  });
  const [itemOrders, setItemOrders] = useState<number[]>([]);
  const navigate = useNavigate();

  // 从所有菜品中提取唯一的口味类型
  const cuisineTypes = Array.from(new Set(dishes.map(dish => dish.restaurant.cuisine)));

  // 在 useEffect 之前添加
  const handleCuisineSelect = (cuisine: string) => {
    setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine);
  };

  // 添加一个 useEffect 来处理口味筛选
  useEffect(() => {
    const filtered = selectedCuisine
      ? dishes.filter(dish => dish.restaurant.cuisine === selectedCuisine)
      : dishes;
    setFilteredDishes(filtered);
    setItemOrders([...Array(filtered.length)].map((_, i) => i));
  }, [selectedCuisine]);

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
    const isNewLogin = localStorage.getItem('is_new_login') === 'true';
    const hasRecommendedDishes = localStorage.getItem('has_recommended_dishes') === 'true';
    
    if (savedIdentity && isNewLogin && !hasRecommendedDishes) {
      setIsRecommending(true);
      
      // Create a timer to shuffle every 200ms
      const shuffleInterval = setInterval(() => {
        shuffleList();
      }, 200);
      
      // End recommendation state and clear timer after 2 seconds
      setTimeout(() => {
        clearInterval(shuffleInterval);
        setIsRecommending(false);
        setHasRecommended(true);
        localStorage.setItem('has_recommended_dishes', 'true');
      }, 2000);

      return () => clearInterval(shuffleInterval);
    }
  }, [shuffleList]);

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, pb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Recommended Dishes
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {cuisineTypes.map((cuisine) => (
          <Chip
            key={cuisine}
            label={cuisine}
            onClick={() => handleCuisineSelect(cuisine)}
            color={selectedCuisine === cuisine ? "primary" : "default"}
            sx={{
              '&:hover': {
                backgroundColor: selectedCuisine === cuisine 
                  ? 'primary.main' 
                  : 'action.hover'
              }
            }}
          />
        ))}
      </Box>
      
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
                    {!dish.restaurant.name.toLowerCase().includes('kitchen') && 
                     !dish.restaurant.name.toLowerCase().includes(dish.restaurant.cuisine.toLowerCase()) && 
                     ` • ${dish.restaurant.cuisine}`}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${dish.price.toFixed(2)}
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