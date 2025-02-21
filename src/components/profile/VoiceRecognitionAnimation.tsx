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
        return '我平时工作比较忙，早餐经常没时间，午餐一般在公司附近解决，晚餐喜欢点外卖。希望能有健康又便捷的饮食方案。';
      case 'health':
        return '我很注重饮食健康，喜欢吃全麦面包、蔬菜沙拉，平时会健身，需要高蛋白低脂的饮食建议。';
      case 'housewife':
        return '我负责全家的饮食，要照顾老人和孩子的营养需求，希望能做出美味又营养均衡的家常菜。';
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
    }, 100);

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
              正在聆听...
            </Typography>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography>AI 正在分析您的需求...</Typography>
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