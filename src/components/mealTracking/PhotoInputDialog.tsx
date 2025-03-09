import { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { DEFAULT_MEALS } from '../../constants/mealDefaults';

interface PhotoInputDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (meal: any) => void;
}

function PhotoInputDialog({ open, onClose, onSubmit }: PhotoInputDialogProps): JSX.Element {
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mealType, setMealType] = useState('');
  const [showQuickSelect, setShowQuickSelect] = useState(true);

  const handleQuickSelect = (type: string) => {
    setMealType(type);
    const meal = DEFAULT_MEALS[type as keyof typeof DEFAULT_MEALS];
    setPhoto(meal.photoUrl);
    
    onSubmit({
      id: Date.now().toString(),
      timestamp: new Date(),
      mealType: type,
      content: meal.content,
      inputMethod: 'photo',
      photoUrl: meal.photoUrl
    });
    onClose();
    setPhoto(null);
    setShowQuickSelect(true);
  };

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (photo) {
      const meal = DEFAULT_MEALS.lunch; // 使用午餐的默认数据
      onSubmit({
        id: Date.now().toString(),
        timestamp: new Date(),
        mealType: 'lunch',
        content: meal.content,
        inputMethod: 'photo',
        photoUrl: photo
      });
      onClose();
      setPhoto(null);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="md"
    >
      <DialogTitle>Take Photo</DialogTitle>
      <DialogContent>
        {showQuickSelect ? (
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle1" align="center">
              Quick Photo Selection
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              overflowX: 'auto',
              pb: 2
            }}>
              {Object.entries(DEFAULT_MEALS).map(([type, meal]) => (
                <Box
                  key={type}
                  onClick={() => handleQuickSelect(type)}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
                    flexShrink: 0,
                    width: '280px',
                    '&:hover': {
                      opacity: 0.9,
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <img
                    src={meal.photoUrl}
                    alt={meal.content}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    p: 2,
                    color: 'white'
                  }}>
                    <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Typography>
                    <Typography variant="body2">
                      {meal.content}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }}>or</Divider>
            <Button
              variant="contained"
              onClick={() => setShowQuickSelect(false)}
              startIcon={<PhotoCameraIcon />}
              sx={{ 
                py: 1.5,
                borderRadius: 3
              }}
            >
              Take New Photo
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCapture}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <IconButton
              color="primary"
              onClick={() => fileInputRef.current?.click()}
              sx={{ width: 80, height: 80 }}
            >
              <PhotoCameraIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Click to take a photo
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {!showQuickSelect && (
          <Button onClick={handleSubmit} variant="contained" disabled={!photo}>
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default PhotoInputDialog; 