import { useState } from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { UserPreferences } from '../../types';

interface VoiceInputProps {
  onPreferenceUpdate: (preferences: UserPreferences) => void;
}

function VoiceInput({ onPreferenceUpdate }: VoiceInputProps): JSX.Element {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');

  const startRecording = (): void => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setTranscript(text);
        const mockAnalysis: UserPreferences = {
          spicy: text.includes('spicy'),
          price: text.includes('cheap') ? 'low' : text.includes('expensive') ? 'high' : 'medium',
          healthy: text.includes('healthy') || text.includes('nutritious'),
        };
        onPreferenceUpdate(mockAnalysis);
      };

      recognition.start();
      setIsRecording(true);
    } else {
      alert('Your browser does not support voice recognition');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <IconButton 
          color={isRecording ? "error" : "primary"}
          size="large"
          onClick={() => isRecording ? setIsRecording(false) : startRecording()}
        >
          {isRecording ? <StopIcon fontSize="large" /> : <MicIcon fontSize="large" />}
        </IconButton>
        <Typography variant="body1" mt={2}>
          {isRecording ? 'Listening...' : 'Click to start voice input'}
        </Typography>
        {transcript && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            "{transcript}"
          </Typography>
        )}
      </Box>
    </Paper>
  );
}

export default VoiceInput; 