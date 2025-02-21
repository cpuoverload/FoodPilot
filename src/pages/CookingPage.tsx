import { useState } from 'react';
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
} from '@mui/material';
import VoiceInput from '../components/common/VoiceInput';
import { recipes } from '../data/mockData';
import { Recipe, UserPreferences } from '../types';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';

function CookingPage(): JSX.Element {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [isVoiceInputOpen, setIsVoiceInputOpen] = useState(false);
  const navigate = useNavigate();

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
      <Box 
        sx={{ 
          position: 'fixed',
          bottom: 100,
          right: 20,
          zIndex: 1000
        }}
      >
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
        <DialogContent>
          <VoiceInput onPreferenceUpdate={handlePreferenceUpdate} />
        </DialogContent>
      </Dialog>

      <Typography variant="h5" gutterBottom sx={{ px: 1 }}>
        Menu & Grocery Plan
      </Typography>
      
      <Grid container spacing={3}>
        {filteredRecipes.map(recipe => (
          <Grid item xs={12} md={6} key={recipe.id}>
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
    </Container>
  );
}

export default CookingPage; 