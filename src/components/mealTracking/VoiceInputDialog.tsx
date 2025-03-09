import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  CircularProgress,
  Paper,
  Button
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { DEFAULT_MEALS } from '../../constants/mealDefaults';

interface VoiceInputDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (meal: any) => void;
}

function VoiceInputDialog({ open, onClose, onSubmit }: VoiceInputDialogProps): JSX.Element {
  const [text, setText] = useState('');
  const [showAIProcessing, setShowAIProcessing] = useState(false);
  const [mealType, setMealType] = useState('');
  const [showQuickSelect, setShowQuickSelect] = useState(true);

  const handleQuickSelect = (type: string) => {
    setMealType(type);
    setShowQuickSelect(false);
    
    const meal = DEFAULT_MEALS[type as keyof typeof DEFAULT_MEALS];
    const targetText = meal.content;
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowAIProcessing(true);
        
        setTimeout(() => {
          onSubmit({
            id: Date.now().toString(),
            timestamp: new Date(),
            mealType: type,
            content: targetText,
            inputMethod: 'voice',
            photoUrl: meal.photoUrl
          });
          onClose();
          setText('');
          setShowAIProcessing(false);
          setShowQuickSelect(true);
        }, 1500);
      }
    }, 50);

    // Cleanup interval on component unmount
    return () => clearInterval(typingInterval);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Voice Input</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 3 }}>
          {showQuickSelect ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle1" align="center">
                Quick Voice Recognition
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => handleQuickSelect('breakfast')}
                sx={{ py: 2 }}
              >
                Record Breakfast
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => handleQuickSelect('lunch')}
                sx={{ py: 2 }}
              >
                Record Lunch
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => handleQuickSelect('dinner')}
                sx={{ py: 2 }}
              >
                Record Dinner
              </Button>
            </Box>
          ) : (
            <Paper elevation={3} sx={{ p: 3, position: 'relative' }}>
              {!showAIProcessing ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'pulse 1.5s infinite'
                      }}
                    >
                      <MicIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>
                  </Box>
                  <Typography align="center" sx={{ mb: 2 }}>
                    Listening...
                  </Typography>
                </>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CircularProgress size={40} sx={{ mb: 2 }} />
                  <Typography>Processing your meal record...</Typography>
                </Box>
              )}
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 3,
                  minHeight: 100,
                  backgroundColor: 'grey.50',
                  p: 2,
                  borderRadius: 1
                }}
              >
                {text}
              </Typography>
            </Paper>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default VoiceInputDialog; 