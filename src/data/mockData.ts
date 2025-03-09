import { Restaurant, Dish } from '../types';

// Import dish images
import mapoTofu from '@/assets/dishes/mapo-tofu.png';
import whiteChicken from '@/assets/dishes/white-cut-chicken.png';
import salmonSalad from '@/assets/dishes/salmon-avocado-salad.png';
import bokChoy from '@/assets/dishes/garlic-bok-choy.png';
import wagyu from '@/assets/dishes/wagyu-sukiyaki.png';

// Remove menus data and keep only dishes and restaurants data
export const dishes: Dish[] = [
  {
    id: 1,
    name: "Mapo Tofu",
    price: 12.90,
    spicyLevel: "Medium",
    nutrition: { calories: 350, protein: "20g" },
    description: "Classic Sichuan dish with silken tofu",
    imageUrl: mapoTofu,
    restaurant: {
      id: 1,
      name: "Sichuan Kitchen",
      cuisine: "Sichuan",
      priceRange: "$$"
    },
    tags: ["Spicy", "Classic", "Popular"],
    rating: 4.6,
    reviews: 245
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
      name: "Cantonese Kitchen",
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
      name: "Cantonese Kitchen",
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
    imageUrl: "",
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