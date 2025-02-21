import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Paper, Chip, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { recipes } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function RecipeDetailPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === Number(id));

  // 直接调用滚动
  window.scrollTo(0, 0);

  if (!recipe) {
    return <Typography>Recipe not found</Typography>;
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
          src={recipe.imageUrl}
          alt={recipe.name}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '16px'
          }}
        />
      </Box>

      <Typography variant="h4" gutterBottom>{recipe.name}</Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Chip 
          label={recipe.difficulty} 
          color={recipe.difficulty === 'Easy' ? 'success' : recipe.difficulty === 'Medium' ? 'warning' : 'error'}
        />
        <Chip label={`Cooking time: ${recipe.time}`} />
      </Box>

      <Typography variant="h5" gutterBottom>Ingredients</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {recipe.ingredients.map((ingredient, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="h6">{ingredient.name}</Typography>
                <Typography variant="body1">{ingredient.amount}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Calories: {ingredient.nutrition.calories} | Protein: {ingredient.nutrition.protein}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>Cooking Steps</Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {recipe.steps.map((step, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`${index + 1}. ${step}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default RecipeDetailPage; 