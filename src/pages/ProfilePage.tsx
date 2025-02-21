import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import IdentitySelection from '../components/profile/IdentitySelection';
import VoiceRecognitionAnimation from '../components/profile/VoiceRecognitionAnimation';

interface UserProfile {
  name: string;
  avatar: string;
  preferences: {
    spicyLevel: string;
    priceRange: string;
    dietaryRestrictions: string[];
    favoritesCuisines: string[];
    mealPlans: string[];
    healthGoals: string[];
  };
}

const profileData: Record<string, UserProfile> = {
  professional: {
    name: "张先生",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    preferences: {
      spicyLevel: "中等",
      priceRange: "¥30-50/餐",
      dietaryRestrictions: ["低油", "低盐"],
      favoritesCuisines: ["粤式", "日式", "意式"],
      mealPlans: ["快捷早餐", "午餐外卖", "便利晚餐"],
      healthGoals: ["控制卡路里", "补充蛋白质", "均衡营养"]
    }
  },
  health: {
    name: "李女士",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    preferences: {
      spicyLevel: "轻微",
      priceRange: "¥40-80/餐",
      dietaryRestrictions: ["低碳水", "高蛋白"],
      favoritesCuisines: ["地中海", "日式", "沙拉"],
      mealPlans: ["蛋白质早餐", "健身餐", "轻食晚餐"],
      healthGoals: ["增肌", "保持体重", "提高免疫力"]
    }
  },
  housewife: {
    name: "王女士",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    preferences: {
      spicyLevel: "适中",
      priceRange: "¥20-40/人",
      dietaryRestrictions: ["无添加", "新鲜食材"],
      favoritesCuisines: ["川菜", "粤菜", "家常菜"],
      mealPlans: ["营养早餐", "家庭午餐", "温馨晚餐"],
      healthGoals: ["家人健康", "均衡营养", "食材新鲜"]
    }
  }
};

const STORAGE_KEY = 'user_identity';

function ProfilePage(): JSX.Element {
  const [loginStep, setLoginStep] = useState<'selection' | 'animation' | 'profile'>('selection');
  const [selectedIdentity, setSelectedIdentity] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const savedIdentity = localStorage.getItem(STORAGE_KEY);
      if (savedIdentity && profileData[savedIdentity]) {
        setSelectedIdentity(savedIdentity);
        setProfile(profileData[savedIdentity]);
        setLoginStep('profile');
      }
    } catch (err) {
      setError('加载用户信息失败');
    }
  }, []);

  const handleIdentitySelect = (identity: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, identity);
      setSelectedIdentity(identity);
      setLoginStep('animation');
    } catch (err) {
      setError('保存用户信息失败');
    }
  };

  const handleAnimationComplete = () => {
    try {
      setProfile(profileData[selectedIdentity]);
      setLoginStep('profile');
    } catch (err) {
      setError('加载用户档案失败');
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSelectedIdentity('');
      setProfile(null);
      setLoginStep('selection');
    } catch (err) {
      setError('退出登录失败');
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  if (loginStep === 'selection') {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <IdentitySelection onSelect={handleIdentitySelect} />
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  if (loginStep === 'animation') {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <VoiceRecognitionAnimation 
          onComplete={handleAnimationComplete}
          identity={selectedIdentity}
        />
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={profile.avatar}
            sx={{ width: 100, height: 100, mr: 3 }}
            alt="用户头像"
          />
          <Box flex={1}>
            <Typography variant="h5" gutterBottom>
              {profile.name}的个人档案
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              size="small"
            >
              退出登录
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>饮食偏好</Typography>
        <List>
          <ListItem>
            <ListItemText primary="口味偏好" secondary={profile.preferences.spicyLevel} />
          </ListItem>
          <ListItem>
            <ListItemText primary="价格范围" secondary={profile.preferences.priceRange} />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="饮食限制" 
              secondary={profile.preferences.dietaryRestrictions.join('、')} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="喜好菜系" 
              secondary={profile.preferences.favoritesCuisines.join('、')} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="用餐计划" 
              secondary={profile.preferences.mealPlans.join('、')} 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="健康目标" 
              secondary={profile.preferences.healthGoals.join('、')} 
            />
          </ListItem>
        </List>
      </Paper>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProfilePage; 