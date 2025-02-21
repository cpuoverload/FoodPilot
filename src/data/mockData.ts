import { Restaurant, Recipe, Dish } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Sichuan House",
    cuisine: "Sichuan",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa",
    dishes: [
      {
        id: 1,
        name: "Mapo Tofu",
        price: 38,
        spicyLevel: "Medium",
        nutrition: { calories: 350, protein: "15g" },
        imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa",
        restaurant: {
          id: 1,
          name: "Sichuan House",
          cuisine: "Sichuan",
          priceRange: "$$"
        },
        tags: ["Sichuan", "Spicy", "Popular"],
        rating: 4.5,
        reviews: 128
      }
    ]
  },
  {
    id: 2,
    name: "Canton Palace",
    cuisine: "Cantonese",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    dishes: [
      {
        id: 2,
        name: "White Cut Chicken",
        price: 68,
        spicyLevel: "Not Spicy",
        nutrition: { calories: 280, protein: "25g" },
        imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
        restaurant: {
          id: 2,
          name: "Canton Palace",
          cuisine: "Cantonese",
          priceRange: "$$$"
        },
        tags: ["Cantonese", "Healthy", "Classic"],
        rating: 4.7,
        reviews: 156
      }
    ]
  },
  {
    id: 3,
    name: "Sushi Ichiban",
    cuisine: "Japanese",
    priceRange: "$$$",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    dishes: [
      {
        id: 3,
        name: "Premium Sashimi Platter",
        price: 188,
        spicyLevel: "Not Spicy",
        nutrition: { calories: 320, protein: "28g" },
        imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
        restaurant: {
          id: 3,
          name: "Sushi Ichiban",
          cuisine: "Japanese",
          priceRange: "$$$"
        },
        tags: ["Japanese", "Fresh", "Premium"],
        rating: 4.9,
        reviews: 132
      }
    ]
  },
  {
    id: 4,
    name: "Thai Flavor",
    cuisine: "Thai",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae",
    dishes: [
      {
        id: 4,
        name: "Tom Yum Soup",
        price: 58,
        spicyLevel: "Medium",
        nutrition: { calories: 220, protein: "18g" },
        imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae",
        restaurant: {
          id: 4,
          name: "Thai Flavor",
          cuisine: "Thai",
          priceRange: "$$"
        },
        tags: ["Thai", "Spicy", "Soup"],
        rating: 4.6,
        reviews: 145
      }
    ]
  },
  {
    id: 5,
    name: "Korean House",
    cuisine: "Korean",
    priceRange: "$$",
    imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
    dishes: [
      {
        id: 5,
        name: "Army Stew",
        price: 128,
        spicyLevel: "Mild",
        nutrition: { calories: 650, protein: "35g" },
        imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
        restaurant: {
          id: 5,
          name: "Korean House",
          cuisine: "Korean",
          priceRange: "$$"
        },
        tags: ["Korean", "Stew", "Sharing"],
        rating: 4.4,
        reviews: 167
      }
    ]
  }
];

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Braised Pork Belly",
    difficulty: "Medium",
    time: "90 minutes",
    imageUrl: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea",
    ingredients: [
      { name: "Pork Belly", amount: "500g", nutrition: { calories: 1200, protein: "60g" } }
    ],
    steps: ["Prepare ingredients", "Make caramel", "Add seasonings", "Simmer on low heat"]
  },
  {
    id: 2,
    name: "Steamed Sea Bass",
    difficulty: "Easy",
    time: "30 minutes",
    imageUrl: "https://images.unsplash.com/photo-1511176118063-23a73be6e2d3",
    ingredients: [
      { name: "Sea Bass", amount: "1 piece", nutrition: { calories: 180, protein: "25g" } }
    ],
    steps: ["Clean fish", "Arrange on plate", "Steam", "Add sauce"]
  },
  {
    id: 3,
    name: "Kung Pao Chicken",
    difficulty: "Medium",
    time: "45 minutes",
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
    ingredients: [
      { name: "Chicken Breast", amount: "300g", nutrition: { calories: 330, protein: "40g" } }
    ],
    steps: ["Dice chicken", "Marinate", "Stir-fry", "Season"]
  },
  {
    id: 4,
    name: "Tomato & Egg Stir-fry",
    difficulty: "Easy",
    time: "15 minutes",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172789a",
    ingredients: [
      { name: "Tomatoes", amount: "2 pieces", nutrition: { calories: 60, protein: "3g" } }
    ],
    steps: ["Cut tomatoes", "Beat eggs", "Stir-fry", "Serve"]
  },
  {
    id: 5,
    name: "Sichuan Boiled Fish",
    difficulty: "Hard",
    time: "60 minutes",
    imageUrl: "https://images.unsplash.com/photo-1544737593-0e686eaeb328",
    ingredients: [
      { name: "Fish Fillets", amount: "400g", nutrition: { calories: 240, protein: "35g" } }
    ],
    steps: ["Marinate fish", "Prepare seasonings", "Cook", "Pour hot oil"]
  }
];

export const dishes: Dish[] = [
  {
    id: 1,
    name: "麻婆豆腐",
    price: 38,
    spicyLevel: "Medium",
    nutrition: { calories: 350, protein: "15g" },
    description: "经典川菜,豆腐与肉末的完美搭配",
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa",
    restaurant: {
      id: 1,
      name: "川味轩",
      cuisine: "川菜",
      priceRange: "$$"
    },
    tags: ["川菜", "经典", "下饭"],
    rating: 4.5,
    reviews: 238
  },
  {
    id: 2,
    name: "白切鸡",
    price: 68,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 280, protein: "25g" },
    description: "广东名菜,鲜嫩多汁",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d",
    restaurant: {
      id: 2,
      name: "粤味轩",
      cuisine: "粤菜",
      priceRange: "$$$"
    },
    tags: ["粤菜", "清淡", "蛋白质"],
    rating: 4.3,
    reviews: 186
  },
  {
    id: 3,
    name: "三文鱼牛油果沙拉",
    price: 58,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 320, protein: "25g" },
    description: "健康低脂,富含omega-3",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    restaurant: {
      id: 3,
      name: "轻食主义",
      cuisine: "健康餐",
      priceRange: "$$"
    },
    tags: ["健康", "生鲜", "沙拉"],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "蒜蓉粉丝娃娃菜",
    price: 28,
    spicyLevel: "Mild",
    nutrition: { calories: 180, protein: "8g" },
    description: "清淡爽口,开胃佳品",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    restaurant: {
      id: 2,
      name: "粤味轩",
      cuisine: "粤菜",
      priceRange: "$$"
    },
    tags: ["素食", "清淡", "快手菜"],
    rating: 4.5,
    reviews: 189
  },
  {
    id: 5,
    name: "和牛寿喜烧",
    price: 168,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 450, protein: "35g" },
    description: "优质和牛,入口即化",
    imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975",
    restaurant: {
      id: 4,
      name: "和食物语",
      cuisine: "日料",
      priceRange: "$$$"
    },
    tags: ["日料", "高端", "牛肉"],
    rating: 4.9,
    reviews: 245
  },
  // ... 添加更多适合不同身份的菜品 ...
];

export const identityPreferences = {
  professional: {
    tags: ["快手菜", "外卖", "便当", "营养", "健康", "快捷"],
    priceRange: ["$$", "$$$"],
    spicyLevel: ["Medium", "Mild"]
  },
  health: {
    tags: ["健康", "沙拉", "生鲜", "低脂", "高蛋白", "素食"],
    priceRange: ["$$", "$$$"],
    spicyLevel: ["Not Spicy", "Mild"]
  },
  housewife: {
    tags: ["家常菜", "营养", "清淡", "经典", "下饭"],
    priceRange: ["$", "$$"],
    spicyLevel: ["Mild", "Medium"]
  }
}; 