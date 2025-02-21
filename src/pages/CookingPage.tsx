import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { recipes } from '../data/mockData';
import { Recipe, UserPreferences } from '../types';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';

function CookingPage(): JSX.Element {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [isRecommending, setIsRecommending] = useState(false);
  const [hasRecommended, setHasRecommended] = useState(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    const recommendedFor = localStorage.getItem('recommended_recipes_for');
    // 只有当没有推荐记录，或者推荐的身份与当前登录身份不同时，才需要显示动画
    return savedIdentity && recommendedFor && savedIdentity === recommendedFor;
  });
  const navigate = useNavigate();
  const [itemOrders, setItemOrders] = useState<number[]>([]);

  const shuffleList = useCallback(() => {
    const newOrder = [...Array(filteredRecipes.length)].map((_, i) => i);
    for (let i = newOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    }
    setItemOrders(newOrder);
    setFilteredRecipes(prev => [...prev].sort(() => Math.random() - 0.5));
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
        localStorage.setItem('recommended_recipes_for', savedIdentity);
      }, 2000);

      // 清理函数
      return () => clearInterval(shuffleInterval);
    }
  }, [hasRecommended, shuffleList]);

  useEffect(() => {
    setItemOrders([...Array(filteredRecipes.length)].map((_, i) => i));
  }, []);

  const handlePreferenceUpdate = (newPreferences: UserPreferences): void => {
    setPreferences(newPreferences);
    const filtered = recipes.filter(recipe => {
      if (newPreferences.healthy && recipe.difficulty !== 'Easy') return false;
      return true;
    });
    setFilteredRecipes(filtered);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, pb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ px: 1 }}>
        Menu & Grocery Plan
      </Typography>
      
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe, index) => (
          <Grid 
            item 
            xs={12} 
            md={6} 
            key={recipe.id}
            sx={{ 
              order: itemOrders[index],
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Card 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              sx={{ 
                height: '100%',
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
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Chip 
                    label={recipe.difficulty} 
                    size="small"
                    color={recipe.difficulty === 'Easy' ? 'success' : recipe.difficulty === 'Medium' ? 'warning' : 'error'}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Cooking Time: {recipe.time}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
          Recommending recipes for you...
        </Typography>
      </Backdrop>
    </Container>
  );
}

export default CookingPage; 