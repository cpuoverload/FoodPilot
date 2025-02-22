import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { recipes } from '../data/mockData';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

// 在组件外部添加这个 helper 函数
const groupByLocation = (ingredients: Ingredient[]) => {
  const groups: Record<string, Ingredient[]> = {};
  
  ingredients.forEach(ingredient => {
    const location = ingredient.purchase.locations[0].name;
    if (!groups[location]) {
      groups[location] = [];
    }
    groups[location].push(ingredient);
  });
  
  return groups;
};

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

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Ingredients</Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Table size="small">
          <TableBody>
            {recipe.ingredients.map((ingredient, index) => (
              <TableRow key={index} sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell sx={{ pl: 0 }}>
                  <Typography variant="subtitle2">{ingredient.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{ingredient.amount}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption" color="text.secondary">
                    {ingredient.nutrition.calories} cal | {ingredient.nutrition.protein} protein
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Typography variant="h5" gutterBottom>Shopping Guide</Typography>
      {Object.entries(groupByLocation(recipe.ingredients)).map(([location, ingredients], index) => (
        <Accordion 
          key={location}
          defaultExpanded={index === 0}
          sx={{ 
            mb: 2,
            '&:before': { display: 'none' },
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <StorefrontIcon sx={{ mr: 1, fontSize: 20, color: 'primary.main' }} />
              <Typography variant="subtitle1">{location}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                {ingredients.length} items
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Table size="small">
              <TableBody>
                {ingredients.map((ingredient, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ pl: 0 }}>
                      <Typography variant="body2">{ingredient.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{ingredient.amount}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        ${ingredient.purchase.locations[0].price.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ mt: 2, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <LocationOnIcon sx={{ mr: 0.5, fontSize: 16 }} />
                {ingredients[0].purchase.locations[0].address}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ mr: 0.5, fontSize: 16 }} />
                {ingredients[0].purchase.locations[0].openTime}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="h5" gutterBottom>Cooking Steps</Typography>
      <Paper sx={{ p: 2 }}>
        <List dense>
          {recipe.steps.slice(0, 8).map((step, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`${index + 1}. ${step}`}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default RecipeDetailPage; 