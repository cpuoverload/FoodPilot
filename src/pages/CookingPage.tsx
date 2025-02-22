import { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Backdrop,
  CircularProgress,
  ImageList,
  ImageListItem
} from '@mui/material';
import { menus } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

function CookingPage(): JSX.Element {
  const [filteredMenus, setFilteredMenus] = useState(menus);
  const [isRecommending, setIsRecommending] = useState(false);
  const [hasRecommended, setHasRecommended] = useState(() => {
    const savedIdentity = localStorage.getItem('user_identity');
    const hasRecommendedRecipes = localStorage.getItem('has_recommended_recipes') === 'true';
    return hasRecommendedRecipes;
  });
  const navigate = useNavigate();
  const [itemOrders, setItemOrders] = useState<number[]>([]);

  const shuffleList = useCallback(() => {
    const newOrder = [...Array(filteredMenus.length)].map((_, i) => i);
    for (let i = newOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    }
    setItemOrders(newOrder);
    setFilteredMenus(prev => [...prev].sort(() => Math.random() - 0.5));
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
    setItemOrders([...Array(filteredMenus.length)].map((_, i) => i));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4, px: 2, pb: 10 }}>
      <Typography variant="h5" gutterBottom sx={{ px: 1 }}>
        Menu Plans
      </Typography>
      
      <Grid container spacing={3}>
        {filteredMenus.map((menu, index) => (
          <Grid 
            item 
            xs={12} 
            md={6} 
            key={menu.id}
            sx={{ 
              order: itemOrders[index],
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Card 
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
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {menu.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {menu.description}
                </Typography>
                
                <ImageList 
                  sx={{ 
                    width: '100%', 
                    height: 160,
                    mt: 2,
                    mb: 1
                  }} 
                  cols={menu.dishes.length} 
                  gap={8}
                >
                  {menu.dishes.map((dish) => (
                    <ImageListItem 
                      key={dish.id}
                      onClick={() => navigate(`/recipe/${dish.id}`)}
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                    >
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: 'rgba(0,0,0,0.5)',
                          color: 'white',
                          p: 1,
                          textAlign: 'center'
                        }}
                      >
                        <Typography variant="caption">
                          {dish.name}
                        </Typography>
                      </Box>
                    </ImageListItem>
                  ))}
                </ImageList>
                
                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Chip 
                    label={`${menu.dishes.length} dishes`} 
                    size="small"
                    color="primary"
                  />
                </Box>
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
          Recommending menus for you...
        </Typography>
      </Backdrop>
    </Container>
  );
}

export default CookingPage; 