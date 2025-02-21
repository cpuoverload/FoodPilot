import { useState, useEffect } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

interface VoiceRecognitionAnimationProps {
  onComplete: () => void;
  identity: string;
}

function VoiceRecognitionAnimation({ onComplete, identity }: VoiceRecognitionAnimationProps): JSX.Element {
  const [text, setText] = useState('');
  const [showAIProcessing, setShowAIProcessing] = useState(false);
  
  const getRecognitionText = (identity: string): string => {
    switch (identity) {
      case 'professional':
        return "I'm usually busy with work, often don't have time for breakfast, have lunch near the office, and prefer ordering takeout for dinner. Looking for healthy and convenient meal solutions.";
      case 'health':
        return "I focus on healthy eating, enjoy whole wheat bread and salads, exercise regularly, and need high-protein, low-fat dietary recommendations.";
      case 'housewife':
        return "I'm responsible for the family's meals, need to take care of both elderly and children's nutritional needs, hoping to prepare delicious and nutritionally balanced home-cooked meals.";
      default:
        return '';
    }
  };

  useEffect(() => {
    const fullText = getRecognitionText(identity);
    let currentIndex = 0;
    
    // 打字机效果
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowAIProcessing(true);
        
        // AI处理动画后完成
        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [identity, onComplete]);

  return (
    <Box sx={{ p: 3 }}>
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
            <Typography>AI is analyzing your preferences...</Typography>
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
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
}

export default VoiceRecognitionAnimation; 