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
import IdentitySelection from '../components/profile/IdentitySelection';
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

const profileData: Record<string, UserProfile> = {
  professional: {
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
  },
  health: {
    name: "Ms. Li",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    preferences: {
      spicyLevel: "Mild",
      priceRange: "$40-80/meal",
      dietaryRestrictions: ["Low carb", "High protein"],
      favoritesCuisines: ["Mediterranean", "Japanese", "Salad"],
      mealPlans: ["Protein breakfast", "Fitness meal", "Light dinner"],
      healthGoals: ["Muscle gain", "Weight maintenance", "Immune boost"]
    }
  },
  housewife: {
    name: "Ms. Wang",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    preferences: {
      spicyLevel: "Medium",
      priceRange: "$20-40/person",
      dietaryRestrictions: ["No additives", "Fresh ingredients"],
      favoritesCuisines: ["Sichuan", "Cantonese", "Home style"],
      mealPlans: ["Nutritious breakfast", "Family lunch", "Cozy dinner"],
      healthGoals: ["Family health", "Balanced nutrition", "Fresh ingredients"]
    }
  }
};

const STORAGE_KEY = 'user_identity';

function ProfilePage(): JSX.Element {
  const [loginStep, setLoginStep] = useState<'selection' | 'animation' | 'profile'>('selection');
  const [selectedIdentity, setSelectedIdentity] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const savedIdentity = localStorage.getItem(STORAGE_KEY);
      if (savedIdentity && profileData[savedIdentity]) {
        setSelectedIdentity(savedIdentity);
        setProfile(profileData[savedIdentity]);
        setLoginStep('profile');
      }
    } catch (err) {
      setError('Failed to load user information');
    }
  }, []);

  const handleIdentitySelect = (identity: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, identity);
      localStorage.setItem('is_new_login', 'true');
      setSelectedIdentity(identity);
      setLoginStep('animation');
    } catch (err) {
      setError('Failed to save user information');
    }
  };

  const handleAnimationComplete = () => {
    try {
      setProfile(profileData[selectedIdentity]);
      setLoginStep('profile');
    } catch (err) {
      setError('Failed to load user profile');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('is_new_login');
      localStorage.removeItem('has_recommended_dishes');
      localStorage.removeItem('has_recommended_recipes');
      setSelectedIdentity('');
      setProfile(null);
      setLoginStep('selection');
    } catch (err) {
      setError('Failed to logout');
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  if (loginStep === 'selection') {
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
          <IdentitySelection onSelect={handleIdentitySelect} />
          <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
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
            identity={selectedIdentity}
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