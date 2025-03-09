import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Divider,
  Chip,
  CircularProgress,
  Skeleton,
  Button,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MicIcon from '@mui/icons-material/Mic';
import EditIcon from '@mui/icons-material/Edit';
import { format, startOfWeek, addDays } from 'date-fns';
import MealInputDialog from '../components/mealTracking/MealInputDialog';
import VoiceInputDialog from '../components/mealTracking/VoiceInputDialog';
import PhotoInputDialog from '../components/mealTracking/PhotoInputDialog';
import { DEFAULT_MEALS } from '../constants/mealDefaults';

interface MealRecord {
  id: string;
  timestamp: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  content: string;
  inputMethod: 'text' | 'voice' | 'photo';
  photoUrl?: string;
  location?: string;
  aiAnalysis?: {
    items: string[];
    calories: number;
    nutrition: string[];
    suggestions?: string;
  };
}

function MealTrackingPage(): JSX.Element {
  const [openDialog, setOpenDialog] = useState<'text' | 'voice' | 'photo' | null>(null);
  const [mealRecords, setMealRecords] = useState<MealRecord[]>(() => {
    const saved = localStorage.getItem('meal_records');
    return saved ? JSON.parse(saved) : [];
  });
  const [loadingRecordId, setLoadingRecordId] = useState<string | null>(null);

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // 从周日开始
  const currentWeekDates = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));

  const actions = [
    { icon: <EditIcon />, name: 'Text Input', method: 'text' },
    { icon: <MicIcon />, name: 'Voice Input', method: 'voice' },
    { icon: <PhotoCameraIcon />, name: 'Photo', method: 'photo' }
  ];

  // 首先添加一个颜色映射对象
  const mealTypeColors = {
    breakfast: '#FF9800', // 橙色
    lunch: '#2196F3',    // 蓝色
    dinner: '#4CAF50',   // 绿色
    snack: '#9C27B0'     // 紫色
  };

  // 添加背景色映射对象
  const mealTypeBackgrounds = {
    breakfast: 'rgba(255, 152, 0, 0.02)', // 早餐淡橙色背景
    lunch: 'rgba(33, 150, 243, 0.02)',    // 午餐淡蓝色背景
    dinner: 'rgba(76, 175, 80, 0.02)',    // 晚餐淡绿色背景
    snack: 'rgba(156, 39, 176, 0.02)'     // 零食淡紫色背景
  };

  // 修改 generateAIAnalysis 函数
  const generateAIAnalysis = (content: string, mealType: string) => {
    return DEFAULT_MEALS[mealType as keyof typeof DEFAULT_MEALS] || {
      items: ['Mixed food'],
      calories: 400,
      nutrition: ['Balanced nutrition'],
      suggestions: 'Please provide more details for better analysis'
    };
  };

  const handleAddMeal = (meal: MealRecord) => {
    const aiAnalysis = generateAIAnalysis(meal.content, meal.mealType);
    const currentDate = new Date();
    const newMealId = Date.now().toString();
    const newMeal = {
      ...meal,
      id: newMealId, // 使用新生成的 ID
      timestamp: currentDate,
      aiAnalysis
    };
    
    const newRecords = [...mealRecords, newMeal].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setMealRecords(newRecords);
    localStorage.setItem('meal_records', JSON.stringify(newRecords));
    
    // 设置加载状态
    setLoadingRecordId(newMealId);
    setTimeout(() => {
      setLoadingRecordId(null);
    }, 2000);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 3, pb: 10 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 300,
        letterSpacing: 0.5,
        color: 'primary.main'
      }}>
        Meal Log
      </Typography>

      {/* 日历选择器 */}
      <Paper sx={{ 
        p: 3, 
        mb: 2,
        borderRadius: 3,
        bgcolor: 'background.paper'
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {format(today, 'MMMM yyyy')} ☀️
        </Typography>
        
        {/* 星期标题栏 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Typography key={day} color="text.secondary" sx={{ 
              flex: 1, 
              textAlign: 'center',
              fontSize: '0.875rem'
            }}>
              {day}
            </Typography>
          ))}
        </Box>

        {/* 日期行 */}
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
          px: 1
        }}>
          {currentWeekDates.map((date) => (
            <Box key={date.getDate()} sx={{ 
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              ...(format(date, 'd') === format(today, 'd') ? {
                bgcolor: 'primary.main',
                color: 'white',
                boxShadow: '0 2px 8px rgba(26,115,232,0.3)'
              } : {
                color: 'text.secondary'
              })
            }}>
              <Typography>
                {format(date, 'd')}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 时间轴记录 */}
      <Box sx={{ position: 'relative' }}>
        {mealRecords.map((record, index) => (
          <Box key={record.id} sx={{ 
            display: 'flex',
            mb: 3,
            position: 'relative'
          }}>
            {/* 左边线 */}
            <Box sx={{ 
              width: 3,
              alignSelf: 'stretch',
              bgcolor: mealTypeColors[record.mealType],
              opacity: 0.2,
              borderRadius: 4,
              mr: 2
            }} />

            <Box sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              bgcolor: mealTypeBackgrounds[record.mealType],
              borderRadius: 2,
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: `${mealTypeColors[record.mealType]}15`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(0,0,0,0.06)',
                borderColor: `${mealTypeColors[record.mealType]}30`,
              },
              alignItems: 'center',
              position: 'relative'  // 添加相对定位
            }}>
              {/* Loading 遮罩层 */}
              {loadingRecordId === record.id && (
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <CircularProgress size={40} sx={{ color: mealTypeColors[record.mealType] }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500
                      }}
                    >
                      AI Analyzing...
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* 左侧文字内容 */}
              <Box sx={{ 
                flex: 1, 
                p: 3,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
              }}>
                {/* 标题行：类型和菜名在一行 */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Typography sx={{ 
                    color: mealTypeColors[record.mealType],
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    textTransform: 'capitalize'
                  }}>
                    {record.location || record.mealType}
                  </Typography>
                  
                  <Typography sx={{ 
                    color: 'text.secondary',
                    opacity: 0.5
                  }}>•</Typography>
                  
                  <Typography sx={{ 
                    color: 'text.secondary',
                    fontSize: '0.9rem',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {record.content}
                  </Typography>
                </Box>

                {/* AI 分析内容 */}
                {!record.photoUrl && (
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: 'text.secondary',
                      opacity: 0.85,
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}
                  >
                    {record.aiAnalysis?.suggestions}
                  </Typography>
                )}
                
                {record.aiAnalysis?.suggestions && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 1.5,
                      color: 'text.secondary',
                      opacity: 0.75,
                      fontSize: '0.95rem',
                      lineHeight: 1.5
                    }}
                  >
                    {record.aiAnalysis.suggestions}
                  </Typography>
                )}
              </Box>

              {/* 右侧图片 */}
              {record.photoUrl && (
                <Box sx={{ 
                  width: 100,
                  height: 100,
                  flexShrink: 0,
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <img 
                    src={record.photoUrl}
                    alt="Meal"
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <SpeedDial
        ariaLabel="Add meal record"
        sx={{ 
          position: 'fixed', 
          bottom: 90, 
          left: '50%',
          transform: 'translateX(-50%)',
          '& .MuiSpeedDial-actions': {
            paddingBottom: '40px',  // 增加与主按钮的距离
            flexDirection: 'row',
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            gap: 2,  // 增加按钮之间的间距
            width: 'fit-content'
          }
        }}
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            onClick={() => setOpenDialog(action.method as any)}
            sx={{
              width: '48px',
              height: '48px',
              '& .MuiSpeedDialAction-staticTooltip': {
                display: 'none'
              },
              '& .MuiSpeedDialAction-fab': {
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'primary.main',
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }
              },
              '& .MuiSvgIcon-root': {
                fontSize: 24
              }
            }}
          />
        ))}
      </SpeedDial>

      <MealInputDialog
        open={openDialog === 'text'}
        onClose={() => setOpenDialog(null)}
        onSubmit={handleAddMeal}
      />
      
      <VoiceInputDialog
        open={openDialog === 'voice'}
        onClose={() => setOpenDialog(null)}
        onSubmit={handleAddMeal}
      />
      
      <PhotoInputDialog
        open={openDialog === 'photo'}
        onClose={() => setOpenDialog(null)}
        onSubmit={handleAddMeal}
      />
    </Container>
  );
}

export default MealTrackingPage; 