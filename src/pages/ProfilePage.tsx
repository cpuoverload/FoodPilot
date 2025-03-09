import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import VoiceRecognitionAnimation from '../components/profile/VoiceRecognitionAnimation';

interface UserProfile {
  name: string;
  avatar: string;
  preferences: {
    spicyLevel: string;
    priceRange: string;
    dietaryRestrictions: string[];
    favoritesCuisines: string[];
    mealPlans: string[];
    healthGoals: string[];
  };
}

const profileData: UserProfile = {
  name: "Mr. Zhang",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  preferences: {
    spicyLevel: "Medium",
    priceRange: "$30-50/meal",
    dietaryRestrictions: ["Low oil", "Low salt"],
    favoritesCuisines: ["Cantonese", "Japanese", "Italian"],
    mealPlans: ["Quick breakfast", "Lunch delivery", "Convenient dinner"],
    healthGoals: ["Calorie control", "Protein supplement", "Balanced nutrition"]
  }
};

const STORAGE_KEY = 'user_identity';

function ProfilePage(): JSX.Element {
  const [loginStep, setLoginStep] = useState<'start' | 'animation' | 'profile'>('start');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const savedIdentity = localStorage.getItem(STORAGE_KEY);
      if (savedIdentity) {
        setProfile(profileData);
        setLoginStep('profile');
      }
    } catch (err) {
      setError('Failed to load user information');
    }
  }, []);

  const handleAnimationComplete = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'professional');
      localStorage.setItem('is_new_login', 'true');
      setProfile(profileData);
      setLoginStep('profile');
    } catch (err) {
      setError('Failed to load user profile');
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user_identity');
      localStorage.removeItem('is_new_login');
      localStorage.removeItem('has_recommended_dishes');
      setProfile(null);
      setLoginStep('start');
    } catch (err) {
      setError('Failed to logout');
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  const handleStartProfile = () => {
    setLoginStep('animation');
  };

  if (loginStep === 'start') {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          pt: 4,
          pb: 10
        }}
      >
        <Box sx={{ 
          width: '100%',
          textAlign: 'center'
        }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 6,
              borderRadius: 3,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Smart Meal Assistant
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  color: 'text.secondary',
                  fontWeight: 300
                }}
              >
                Your Personal AI Food Companion
              </Typography>
            </Box>
            
            <Box sx={{ mb: 6 }}>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 2,
                  lineHeight: 1.6
                }}
              >
                Create your profile with voice recognition to get:
              </Typography>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1.5,
                  mb: 4
                }}
              >
                {[
                  'Personalized meal recommendations',
                  'Smart dietary tracking',
                  'AI-powered nutrition insights'
                ].map((feature, index) => (
                  <Box 
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%',
                        backgroundColor: 'primary.main'
                      }} 
                    />
                    <Typography variant="body1" color="text.primary">
                      {feature}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={handleStartProfile}
              sx={{
                borderRadius: 3,
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 15px rgba(33, 150, 243, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #21CBF3 90%)',
                  boxShadow: '0 5px 20px rgba(33, 150, 243, 0.4)'
                }
              }}
            >
              Create Profile
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (loginStep === 'animation') {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          pt: 4,
          pb: 10
        }}
      >
        <Box sx={{ width: '100%' }}>
          <VoiceRecognitionAnimation 
            onComplete={handleAnimationComplete}
            identity="professional"
          />
          <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        height: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        pt: 4,
        pb: 10,
        position: 'relative'
      }}
    >
      <Box sx={{ 
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        px: 2
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3,
            width: '100%',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={profile.avatar}
              sx={{ width: 100, height: 100, mr: 3 }}
              alt="User Avatar"
            />
            <Box flex={1}>
              <Typography variant="h5" gutterBottom>
                {profile.name}'s Profile
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                size="small"
              >
                Logout
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>Dietary Preferences</Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Spicy Level" 
                secondary={profile.preferences.spicyLevel} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Price Range" 
                secondary={profile.preferences.priceRange} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Dietary Restrictions" 
                secondary={profile.preferences.dietaryRestrictions.join(', ')} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Favorite Cuisines" 
                secondary={profile.preferences.favoritesCuisines.join(', ')} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Meal Plans" 
                secondary={profile.preferences.mealPlans.join(', ')} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Health Goals" 
                secondary={profile.preferences.healthGoals.join(', ')} 
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        sx={{ position: 'fixed' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProfilePage; 