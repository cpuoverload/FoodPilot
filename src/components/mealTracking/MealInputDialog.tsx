import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Chip
} from '@mui/material';
import { DEFAULT_MEALS } from '../../constants/mealDefaults';

interface MealInputDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (meal: any) => void;
}

function MealInputDialog({ open, onClose, onSubmit }: MealInputDialogProps): JSX.Element {
  const [mealType, setMealType] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [duration, setDuration] = useState<number>(20);
  const [cost, setCost] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 当选择餐点类型时自动填充内容
  useEffect(() => {
    if (mealType && DEFAULT_MEALS[mealType as keyof typeof DEFAULT_MEALS]) {
      setContent(DEFAULT_MEALS[mealType as keyof typeof DEFAULT_MEALS].content);
    }
  }, [mealType]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ 
        pb: 1,
        typography: 'h5',
        fontWeight: 300
      }}>
        Add Meal Record
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Meal Type</InputLabel>
            <Select
              value={mealType}
              label="Meal Type"
              onChange={(e) => setMealType(e.target.value)}
            >
              <MenuItem value="breakfast">Breakfast</MenuItem>
              <MenuItem value="lunch">Lunch</MenuItem>
              <MenuItem value="dinner">Dinner</MenuItem>
              <MenuItem value="snack">Snack</MenuItem>
            </Select>
          </FormControl>
          
          {mealType && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="subtitle2" sx={{ width: '100%', mb: 1 }}>
                Quick Selections:
              </Typography>
              {DEFAULT_MEALS[mealType as keyof typeof DEFAULT_MEALS] && (
                <Chip
                  label={DEFAULT_MEALS[mealType as keyof typeof DEFAULT_MEALS].content}
                  onClick={() => setContent(DEFAULT_MEALS[mealType as keyof typeof DEFAULT_MEALS].content)}
                  sx={{ 
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'primary.light', color: 'white' }
                  }}
                />
              )}
              {/* Add more suggestions based on meal type */}
              {mealType === 'breakfast' && (
                <>
                  <Chip
                    label="Oatmeal with fruits and honey"
                    onClick={() => setContent("Oatmeal with fruits and honey")}
                    sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
                  />
                  <Chip
                    label="Yogurt parfait with granola"
                    onClick={() => setContent("Yogurt parfait with granola")}
                    sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
                  />
                </>
              )}
              {/* Add similar sections for lunch and dinner */}
            </Box>
          )}
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              type="number"
              label="Duration (minutes)"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{ flex: 1 }}
            />
            <TextField
              type="number"
              label="Cost ($)"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
              sx={{ flex: 1 }}
            />
          </Box>
          
          <TextField
            label="What did you eat?"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose}
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={() => {
            onSubmit({
              id: Date.now().toString(),
              timestamp: new Date(),
              mealType: mealType as any,
              content,
              inputMethod: 'text',
              duration,
              cost
            });
            onClose();
            setMealType('');
            setContent('');
            setDuration(20);
            setCost(0);
          }} 
          variant="contained" 
          disabled={!mealType || !content}
          sx={{ borderRadius: 2 }}
        >
          Add Record
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MealInputDialog; 