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
  Backdrop,
  CircularProgress
} from '@mui/material';
import { recipes } from '../data/mockData';
import { Recipe, UserPreferences } from '../types';
import { useNavigate } from 'react-router-dom';

function CookingPage(): JSX.Element {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [isRecommending, setIsRecommending] = useState(false);
  const [hasRecommended, setHasRecommended] = useState(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    const hasRecommendedRecipes = localStorage.getItem('has_recommended_recipes') === 'true';
    return hasRecommendedRecipes;
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
    const isNewLogin = localStorage.getItem('is_new_login') === 'true';
    const hasRecommendedRecipes = localStorage.getItem('has_recommended_recipes') === 'true';
    
    if (savedIdentity && isNewLogin && !hasRecommendedRecipes) {
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
        localStorage.setItem('has_recommended_recipes', 'true');
      }, 2000);

      return () => clearInterval(shuffleInterval);
    }
  }, [shuffleList]);

  useEffect(() => {
    setItemOrders([...Array(filteredRecipes.length)].map((_, i) => i));
  }, []);

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