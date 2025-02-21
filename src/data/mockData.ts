import { Restaurant, Recipe, Dish } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Sichuan House",
    cuisine: "Sichuan",
    priceRange: "$$",
    imageUrl: "https://source.unsplash.com/random/800x600/?chinese,food",
    dishes: [
      {
        id: 1,
        name: "Mapo Tofu",
        price: 38,
        spicyLevel: "Medium",
        nutrition: { calories: 350, protein: "15g" },
        imageUrl: "https://source.unsplash.com/random/800x600/?tofu,food",
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
    imageUrl: "https://source.unsplash.com/random/800x600/?cantonese,food",
    dishes: [
      {
        id: 2,
        name: "White Cut Chicken",
        price: 68,
        spicyLevel: "Not Spicy",
        nutrition: { calories: 280, protein: "25g" },
        imageUrl: "https://source.unsplash.com/random/800x600/?chicken,food",
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
    imageUrl: "https://source.unsplash.com/featured/?pork,food",
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
    imageUrl: "https://source.unsplash.com/featured/?fish,seafood",
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
    imageUrl: "https://source.unsplash.com/featured/?chicken,food",
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
    imageUrl: "https://source.unsplash.com/featured/?tomato,egg",
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
    imageUrl: "https://source.unsplash.com/featured/?fish,food",
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
    price: 38,
    spicyLevel: "Medium",
    nutrition: { calories: 350, protein: "15g" },
    description: "Classic Sichuan dish, perfect combination of tofu and minced meat",
    imageUrl: "https://source.unsplash.com/random/800x600/?tofu,food",
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
    price: 68,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 280, protein: "25g" },
    description: "Cantonese specialty, tender and juicy",
    imageUrl: "https://source.unsplash.com/random/800x600/?chicken,food",
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
    price: 58,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 320, protein: "25g" },
    description: "Healthy low-fat dish rich in omega-3",
    imageUrl: "https://source.unsplash.com/random/800x600/?salmon,salad",
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
    price: 28,
    spicyLevel: "Mild",
    nutrition: { calories: 180, protein: "8g" },
    description: "Light and refreshing appetizer",
    imageUrl: "https://source.unsplash.com/random/800x600/?vegetables",
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
    price: 168,
    spicyLevel: "Not Spicy",
    nutrition: { calories: 450, protein: "35g" },
    description: "Premium wagyu beef, melt in your mouth",
    imageUrl: "https://source.unsplash.com/random/800x600/?wagyu,beef",
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