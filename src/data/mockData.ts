import { Restaurant, Recipe, Dish } from '../types';

// 首先导入所有图片
import braisedPorkBelly from '@/assets/recipes/braised-pork-belly.png';
import steamedSeaBass from '@/assets/recipes/steamed-sea-bass.png';
import kungPaoChicken from '@/assets/recipes/kung-pao-chicken.png';
import tomatoEgg from '@/assets/recipes/tomato-egg-stirfry.png';
import sichuanFish from '@/assets/recipes/sichuan-boiled-fish.png';

import mapoTofu from '@/assets/dishes/mapo-tofu.png';
import whiteChicken from '@/assets/dishes/white-cut-chicken.png';
import salmonSalad from '@/assets/dishes/salmon-avocado-salad.png';
import bokChoy from '@/assets/dishes/garlic-bok-choy.png';
import wagyu from '@/assets/dishes/wagyu-sukiyaki.png';

export const recipes: Recipe[] = [
  {
    id: 1,
    name: "Braised Pork Belly",
    difficulty: "Medium",
    time: "90 minutes",
    imageUrl: braisedPorkBelly,
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
    imageUrl: steamedSeaBass,
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
    imageUrl: kungPaoChicken,
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
    imageUrl: tomatoEgg,
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
    imageUrl: sichuanFish,
    ingredients: [
      { name: "Fish Fillets", amount: "400g", nutrition: { calories: 240, protein: "35g" } }
    ],
    steps: ["Marinate fish", "Prepare seasonings", "Cook", "Pour hot oil"]
  }
];

export const dishes: Dish[] = [
  {
    id: 1,
    name: "Mapo Tofu",
    price: 7.90,
    spicyLevel: "Medium",
    nutrition: { calories: 350, protein: "15g" },
    description: "Classic Sichuan dish with silky tofu and minced meat in spicy sauce",
    imageUrl: mapoTofu,
    restaurant: {
      id: 1,
      name: "Sichuan House",
      cuisine: "Sichuan",
      priceRange: "$$"
    },
    tags: ["Sichuan", "Classic", "Popular"],
    rating: 4.5,
    reviews: 238
  },
  {
    id: 2,
    name: "White Cut Chicken",
    price: 13.90,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 280, protein: "25g" },
    description: "Cantonese specialty, tender and juicy poached chicken",
    imageUrl: whiteChicken,
    restaurant: {
      id: 2,
      name: "Canton Palace",
      cuisine: "Cantonese",
      priceRange: "$$$"
    },
    tags: ["Cantonese", "Light", "Protein"],
    rating: 4.3,
    reviews: 186
  },
  {
    id: 3,
    name: "Salmon Avocado Salad",
    price: 11.90,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 320, protein: "25g" },
    description: "Healthy low-fat dish rich in omega-3",
    imageUrl: salmonSalad,
    restaurant: {
      id: 3,
      name: "Health Kitchen",
      cuisine: "Healthy Food",
      priceRange: "$$"
    },
    tags: ["Healthy", "Fresh", "Salad"],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Garlic Baby Bok Choy",
    price: 5.90,
    spicyLevel: "Mild",
    nutrition: { calories: 180, protein: "8g" },
    description: "Light and refreshing appetizer",
    imageUrl: bokChoy,
    restaurant: {
      id: 2,
      name: "Canton House",
      cuisine: "Cantonese",
      priceRange: "$$"
    },
    tags: ["Vegetarian", "Light", "Quick"],
    rating: 4.5,
    reviews: 189
  },
  {
    id: 5,
    name: "Wagyu Sukiyaki",
    price: 32.90,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 450, protein: "35g" },
    description: "Premium wagyu beef, melt in your mouth",
    imageUrl: wagyu,
    restaurant: {
      id: 4,
      name: "Japanese Kitchen",
      cuisine: "Japanese",
      priceRange: "$$$"
    },
    tags: ["Japanese", "Premium", "Beef"],
    rating: 4.9,
    reviews: 245
  },
  // ... 添加更多适合不同身份的菜品 ...
];

export const restaurants: Restaurant[] = Array.from(
  new Set(dishes.map(dish => dish.restaurant.id))
).map(restaurantId => {
  const dish = dishes.find(d => d.restaurant.id === restaurantId)!;
  return {
    id: dish.restaurant.id,
    name: dish.restaurant.name,
    cuisine: dish.restaurant.cuisine,
    priceRange: dish.restaurant.priceRange,
    imageUrl: "", // 由于我们不再需要餐厅图片，可以留空
    dishes: dishes.filter(d => d.restaurant.id === restaurantId)
  };
});

export const identityPreferences = {
  professional: {
    tags: ["Quick", "Takeaway", "Convenient", "Nutritious", "Healthy", "Fast"],
    priceRange: ["$$", "$$$"],
    spicyLevel: ["Medium", "Mild"]
  },
  health: {
    tags: ["Healthy", "Salad", "Fresh", "Low-fat", "High-protein", "Vegetarian"],
    priceRange: ["$$", "$$$"],
    spicyLevel: ["Not Spicy", "Mild"]
  },
  housewife: {
    tags: ["Home-style", "Nutritious", "Light", "Classic", "Family"],
    priceRange: ["$", "$$"],
    spicyLevel: ["Mild", "Medium"]
  }
}; 