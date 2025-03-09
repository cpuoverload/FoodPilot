import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/common/Navbar';
import ProfilePage from './pages/ProfilePage';
import { Box } from '@mui/material';
import ScrollToTop from './components/common/ScrollToTop';
import HomePage from './pages/HomePage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import DishDetailPage from './pages/DishDetailPage';
import PrivateRoute from './components/common/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A73E8',
      light: '#4285F4',
      dark: '#0D47A1',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#34A853',
      light: '#66BB6A',
      dark: '#2E7D32',
      contrastText: '#ffffff'
    },
    background: {
      default: '#F8F9FA',
      paper: '#ffffff'
    },
    text: {
      primary: '#202124',
      secondary: '#5F6368'
    }
  },
  typography: {
    fontFamily: [
      'Google Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif'
    ].join(','),
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      letterSpacing: '-0.5px'
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
      letterSpacing: '-0.3px'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 20px 0 rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.12)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 32,
          fontWeight: 500,
          '&.MuiChip-outlined': {
            borderColor: 'rgba(0, 0, 0, 0.12)'
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.02)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)'
        }
      }
    }
  }
});

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <Box sx={{ maxWidth: '100vw', minHeight: '100vh', pb: 7 }}>
          <Routes>
            <Route path="/" element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            } />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
            <Route path="/dish/:id" element={<DishDetailPage />} />
          </Routes>
          <Navbar />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 