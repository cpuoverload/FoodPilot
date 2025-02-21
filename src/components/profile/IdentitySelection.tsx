import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';

interface IdentityOption {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface IdentitySelectionProps {
  onSelect: (identity: string) => void;
}

function IdentitySelection({ onSelect }: IdentitySelectionProps): JSX.Element {
  const identities: IdentityOption[] = [
    {
      id: 'professional',
      title: '职场人士',
      description: '快节奏生活，追求便捷营养的饮食方案',
      icon: <WorkIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'health',
      title: '健康达人',
      description: '注重饮食健康，专注营养均衡',
      icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'housewife',
      title: '家庭主妇',
      description: '关注全家饮食，善于烹饪和营养搭配',
      icon: <HomeIcon sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        选择您的身份
      </Typography>
      <Grid container spacing={2}>
        {identities.map((identity) => (
          <Grid item xs={12} key={identity.id}>
            <Card 
              onClick={() => onSelect(identity.id)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                },
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                <Box sx={{ mr: 2, color: 'primary.main' }}>
                  {identity.icon}
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {identity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {identity.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default IdentitySelection; 