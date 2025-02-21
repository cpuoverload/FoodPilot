import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box
} from '@mui/material';

interface UserPreferences {
  spicyLevel: string;
  priceRange: string;
  dietaryRestrictions: string[];
  favoritesCuisines: string[];
}

function ProfilePage(): JSX.Element {
  const userPreferences: UserPreferences = {
    spicyLevel: 'Medium',
    priceRange: '$$',
    dietaryRestrictions: ['Gluten-free', 'Low-carb'],
    favoritesCuisines: ['Sichuan', 'Cantonese', 'Japanese']
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt="User Avatar"
          />
          <Typography variant="h5">My Profile</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>Dietary Preferences</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Spice Level" secondary={userPreferences.spicyLevel} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Price Range" secondary={userPreferences.priceRange} />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Dietary Restrictions" 
              secondary={userPreferences.dietaryRestrictions.join(', ')} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Favorite Cuisines" 
              secondary={userPreferences.favoritesCuisines.join(', ')} 
            />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
}

export default ProfilePage; 