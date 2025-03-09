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
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface MealRecord {
  id: string;
  timestamp: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  content: string;
  inputMethod: 'text' | 'voice' | 'photo';
  photoUrl?: string;
  location?: string;
  duration?: number; // Add duration in minutes
  cost?: number;    // Add cost in dollars
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
    const defaultAnalysis = DEFAULT_MEALS[mealType as keyof typeof DEFAULT_MEALS]?.aiAnalysis || {
      items: ['Mixed food'],
      calories: 400,
      nutrition: ['Protein', 'Carbs', 'Fiber'],
      suggestions: 'A balanced meal with good nutritional value'
    };

    return {
      ...defaultAnalysis,
      items: content.split(' with ').map(item => item.trim()),
      suggestions: `This ${mealType} contains ${defaultAnalysis.calories} calories. ${defaultAnalysis.suggestions}`
    };
  };

  const handleAddMeal = (meal: MealRecord) => {
    const aiAnalysis = generateAIAnalysis(meal.content, meal.mealType);
    const currentDate = new Date();
    const newMealId = Date.now().toString();
    
    // 使用 DEFAULT_MEALS 中的图片
    const photoUrl = meal.inputMethod === 'text' 
      ? DEFAULT_MEALS[meal.mealType as keyof typeof DEFAULT_MEALS]?.photoUrl
      : meal.photoUrl;

    const newMeal = {
      ...meal,
      id: newMealId,
      timestamp: currentDate,
      photoUrl,  // 使用默认图片
      aiAnalysis // 添加 AI 分析
    };
    
    const newRecords = [...mealRecords, newMeal].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setMealRecords(newRecords);
    localStorage.setItem('meal_records', JSON.stringify(newRecords));
    
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

      {/* Food Insights Card */}
      <Paper sx={{ 
        p: 3, 
        mb: 3,
        borderRadius: 3,
        bgcolor: 'background.paper',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)'
      }}>
        <Typography variant="h6" sx={{ 
          mb: 3,  // 增加底部间距
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'primary.main',
          fontSize: '1.25rem'  // 略微增大标题字号
        }}>
          <RestaurantIcon /> Meal Insights
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>  {/* 增加卡片间距 */}
          {/* Dining Duration Analysis */}
          <Box>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>  {/* 改用 subtitle1 并调整颜色 */}
              Dining Habits
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '1rem' }}>
              {(() => {
                const recentMeals = mealRecords.slice(0, 7);
                const avgDuration = recentMeals.reduce((sum, meal) => 
                  sum + (meal.duration || 20), 0) / (recentMeals.length || 1);  // 默认值改为 20
                
                if (avgDuration < 15) {
                  return "You've been eating rather quickly. Try to spend more time enjoying your meals 🕒";
                } else if (avgDuration > 30) {
                  return "Great job taking time to enjoy your meals! Keep maintaining this healthy habit 👍";
                }
                return "You're maintaining a balanced dining pace. Aim for 20-30 minutes per meal 🍽️";
              })()}
            </Typography>
          </Box>

          {/* Spending Analysis */}
          <Box>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Spending Overview
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '1rem' }}>
              {(() => {
                const recentMeals = mealRecords.slice(0, 7);
                const totalSpent = recentMeals.reduce((sum, meal) => 
                  sum + (meal.cost || 15), 0);  // 默认值改为 15
                const avgCost = totalSpent / (recentMeals.length || 1);
                
                return `Average meal cost: $${avgCost.toFixed(2)} • Weekly total: $${totalSpent.toFixed(2)}`;
              })()}
            </Typography>
          </Box>

          {/* Health Analysis */}
          <Box>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Health Overview
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '1rem' }}>
              {(() => {
                const recentMeals = mealRecords.slice(0, 7);
                const avgCalories = recentMeals.reduce((sum, meal) => 
                  sum + (meal.aiAnalysis?.calories || 500), 0) / (recentMeals.length || 1);  // 默认值改为 500
                
                let healthStatus = "";
                if (avgCalories > 800) {
                  healthStatus = "Consider lighter meals to maintain a balanced diet 🥗";
                } else if (avgCalories < 400) {
                  healthStatus = "Your meals might be too light. Ensure adequate nutrition 🍳";
                } else {
                  healthStatus = "You're maintaining a good caloric balance 👍";
                }
                
                return `${healthStatus} • Avg. calories: ${Math.round(avgCalories)} kcal`;
              })()}
            </Typography>
          </Box>
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

                {/* 根据输入方式显示不同的内容 */}
                {record.inputMethod === 'text' ? (
                  // 文本输入时只显示用户输入的内容
                  <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                    {record.content}
                  </Typography>
                ) : (
                  // 语音和图片输入时显示 AI 分析结果
                  record.aiAnalysis?.suggestions && (
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                      {record.aiAnalysis.suggestions}
                    </Typography>
                  )
                )}

                {/* 时间和花费信息改为纵向排列 */}
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                  color: 'text.secondary'
                }}>
                  <Typography variant="body2">
                    Duration: {record.duration || 20} minutes
                  </Typography>
                  <Typography variant="body2">
                    Cost: ${(record.cost || 15).toFixed(2)}
                  </Typography>
                </Box>

                {/* AI 分析数据 - 只在非文本输入时显示 */}
                {record.inputMethod !== 'text' && record.aiAnalysis && (
                  <Box sx={{ mt: 2, color: 'text.secondary' }}>
                    <Typography variant="body2">
                      Calories: {record.aiAnalysis.calories} kcal
                    </Typography>
                    {record.aiAnalysis.nutrition && (
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        {record.aiAnalysis.nutrition.join(' • ')}
                      </Typography>
                    )}
                  </Box>
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