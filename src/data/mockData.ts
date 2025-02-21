import { Restaurant, Recipe } from '../types';

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
        nutrition: { calories: 350, protein: "15g" }
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
        nutrition: { calories: 280, protein: "25g" }
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
        nutrition: { calories: 320, protein: "28g" }
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
        nutrition: { calories: 220, protein: "18g" }
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
        nutrition: { calories: 650, protein: "35g" }
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