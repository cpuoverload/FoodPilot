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
      {
        name: "Pork Belly",
        amount: "500g",
        nutrition: { calories: 1200, protein: "60g" },
        purchase: {
          locations: [
            {
              name: "Fresh Market",
              distance: "0.8km",
              price: 15.90,
              address: "123 Market Street, #01-45",
              openTime: "7:00 AM - 9:00 PM"
            },
            {
              name: "Supermarket Chain",
              distance: "1.2km",
              price: 18.90,
              address: "456 Shopping Mall, B1-12",
              openTime: "8:00 AM - 10:00 PM"
            }
          ],
          tips: "Choose pieces with balanced fat and meat ratio",
          bestTime: "Early morning for freshest cuts"
        }
      },
      {
        name: "Ginger",
        amount: "30g",
        nutrition: { calories: 25, protein: "0.8g" },
        purchase: {
          locations: [
            {
              name: "Vegetable Market",
              distance: "0.5km",
              price: 1.50,
              address: "789 Fresh Market, #01-23",
              openTime: "6:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose firm pieces with smooth skin",
          bestTime: "Morning for best selection"
        }
      },
      {
        name: "Green Onion",
        amount: "2 stalks",
        nutrition: { calories: 10, protein: "0.5g" },
        purchase: {
          locations: [
            {
              name: "Vegetable Market",
              distance: "0.5km",
              price: 1.00,
              address: "789 Fresh Market, #01-23",
              openTime: "6:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose fresh, crisp stalks with bright color",
          bestTime: "Early morning for freshest produce"
        }
      },
      {
        name: "Soy Sauce",
        amount: "3 tablespoons",
        nutrition: { calories: 45, protein: "3g" },
        purchase: {
          locations: [
            {
              name: "Supermarket Chain",
              distance: "1.2km",
              price: 4.90,
              address: "456 Shopping Mall, B1-12",
              openTime: "8:00 AM - 10:00 PM"
            }
          ],
          tips: "Choose naturally brewed soy sauce",
          bestTime: "Any time"
        }
      },
      {
        name: "Rock Sugar",
        amount: "20g",
        nutrition: { calories: 80, protein: "0g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 2.90,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose clear, crystalline pieces",
          bestTime: "Any time"
        }
      },
      {
        name: "Cooking Wine",
        amount: "2 tablespoons",
        nutrition: { calories: 30, protein: "0g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 5.90,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose authentic Shaoxing wine for best results",
          bestTime: "Any time"
        }
      }
    ],
    steps: [
      "Cut the pork belly into 2-inch (5cm) thick pieces",
      "Bring a pot of water to boil, add pork belly pieces and blanch for 5 minutes to remove impurities",
      "Remove pork and rinse under cold water, then pat dry",
      "In a clean wok, add 2 tablespoons of oil and heat until smoking",
      "Add rock sugar and stir until it melts and turns golden brown",
      "Add pork belly pieces and stir-fry until they're evenly coated with caramelized sugar",
      "Add sliced ginger and green onion, stir-fry for 1 minute until fragrant",
      "Pour in cooking wine and let it simmer for 30 seconds to remove the raw alcohol taste",
      "Add soy sauce and enough water to cover the meat",
      "Bring to a boil, then reduce heat to low and simmer for 60-75 minutes",
      "Check meat tenderness with chopsticks - it should be very tender but still hold its shape",
      "Turn heat to high and reduce sauce until it thickens and coats the meat",
      "Serve hot with steamed rice or noodles"
    ]
  },
  {
    id: 2,
    name: "Steamed Sea Bass",
    difficulty: "Easy",
    time: "30 minutes",
    imageUrl: steamedSeaBass,
    ingredients: [
      {
        name: "Sea Bass",
        amount: "1 whole (600g)",
        nutrition: { calories: 180, protein: "25g" },
        purchase: {
          locations: [
            {
              name: "Seafood Market",
              distance: "1.5km",
              price: 22.90,
              address: "789 Fish Market, #02-15",
              openTime: "6:00 AM - 2:00 PM"
            }
          ],
          tips: "Look for clear eyes and bright red gills",
          bestTime: "Early morning for freshest catch"
        }
      },
      {
        name: "Ginger",
        amount: "30g",
        nutrition: { calories: 25, protein: "0.8g" },
        purchase: {
          locations: [
            {
              name: "Vegetable Market",
              distance: "0.5km",
              price: 1.50,
              address: "789 Fresh Market, #01-23",
              openTime: "6:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose firm pieces with smooth skin",
          bestTime: "Morning for best selection"
        }
      },
      {
        name: "Green Onion",
        amount: "3 stalks",
        nutrition: { calories: 15, protein: "0.8g" },
        purchase: {
          locations: [
            {
              name: "Vegetable Market",
              distance: "0.5km",
              price: 1.00,
              address: "789 Fresh Market, #01-23",
              openTime: "6:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose fresh, crisp stalks with bright color",
          bestTime: "Early morning for freshest produce"
        }
      },
      {
        name: "Light Soy Sauce",
        amount: "2 tablespoons",
        nutrition: { calories: 30, protein: "2g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 4.50,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose premium light soy sauce for best flavor",
          bestTime: "Any time"
        }
      }
    ],
    steps: [
      "Clean the sea bass thoroughly, removing scales and guts",
      "Make 3-4 diagonal cuts on each side of the fish",
      "Place ginger slices inside the fish cavity and between cuts",
      "Arrange half of the green onions on a steaming plate",
      "Place fish on top of the green onions",
      "Bring water to boil in a steamer",
      "Steam fish for 8-10 minutes depending on size",
      "Heat 2 tablespoons of oil until smoking hot",
      "Remove fish from steamer and drain any excess liquid",
      "Top with remaining green onions and ginger",
      "Pour hot oil over the fish to create a sizzling effect",
      "Drizzle with light soy sauce and serve immediately"
    ]
  },
  {
    id: 3,
    name: "Kung Pao Chicken",
    difficulty: "Medium",
    time: "45 minutes",
    imageUrl: kungPaoChicken,
    ingredients: [
      {
        name: "Chicken Breast",
        amount: "300g",
        nutrition: { calories: 330, protein: "40g" },
        purchase: {
          locations: [
            {
              name: "Fresh Poultry Market",
              distance: "1.0km",
              price: 12.90,
              address: "234 Food Street, #01-56",
              openTime: "7:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose fresh chicken breast with pink color",
          bestTime: "Morning for best selection"
        }
      },
      {
        name: "Peanuts",
        amount: "50g",
        nutrition: { calories: 160, protein: "7g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 3.50,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose raw unsalted peanuts",
          bestTime: "Any time"
        }
      },
      {
        name: "Dried Chili",
        amount: "8-10 pieces",
        nutrition: { calories: 20, protein: "0.5g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 2.90,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose bright red chilies without dark spots",
          bestTime: "Any time"
        }
      },
      {
        name: "Sichuan Peppercorns",
        amount: "1 tablespoon",
        nutrition: { calories: 10, protein: "0.2g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 3.90,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose peppercorns with strong fragrance",
          bestTime: "Any time"
        }
      }
    ],
    steps: [
      "Cut chicken breast into 1-inch cubes",
      "Marinate chicken with soy sauce and cornstarch for 20 minutes",
      "Dry roast peanuts in wok until golden brown, set aside",
      "Heat oil in wok until smoking",
      "Add dried chilies and Sichuan peppercorns, stir-fry until fragrant",
      "Add marinated chicken, stir-fry until color changes",
      "Add sauce mixture and stir to combine",
      "Return peanuts to wok and toss everything together",
      "Serve hot with steamed rice"
    ]
  },
  {
    id: 4,
    name: "Tomato & Egg Stir-fry",
    difficulty: "Easy",
    time: "15 minutes",
    imageUrl: tomatoEgg,
    ingredients: [
      {
        name: "Tomatoes",
        amount: "2 large",
        nutrition: { calories: 60, protein: "3g" },
        purchase: {
          locations: [
            {
              name: "Vegetable Market",
              distance: "0.5km",
              price: 3.90,
              address: "567 Fresh Market, #02-34",
              openTime: "6:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose ripe tomatoes that are firm but slightly soft",
          bestTime: "Early morning for freshest produce"
        }
      },
      {
        name: "Eggs",
        amount: "3 pieces",
        nutrition: { calories: 210, protein: "18g" },
        purchase: {
          locations: [
            {
              name: "Fresh Market",
              distance: "0.8km",
              price: 2.90,
              address: "123 Market Street, #01-45",
              openTime: "7:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose fresh eggs with intact shells",
          bestTime: "Any time"
        }
      },
      {
        name: "Green Onion",
        amount: "1 stalk",
        nutrition: { calories: 5, protein: "0.3g" },
        purchase: {
          locations: [
            {
              name: "Vegetable Market",
              distance: "0.5km",
              price: 1.00,
              address: "567 Fresh Market, #02-34",
              openTime: "6:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose fresh, crisp stalks",
          bestTime: "Morning for best selection"
        }
      },
      {
        name: "Salt",
        amount: "1/2 teaspoon",
        nutrition: { calories: 0, protein: "0g" },
        purchase: {
          locations: [
            {
              name: "Supermarket Chain",
              distance: "1.2km",
              price: 1.50,
              address: "456 Shopping Mall, B1-12",
              openTime: "8:00 AM - 10:00 PM"
            }
          ],
          tips: "Any table salt will do",
          bestTime: "Any time"
        }
      }
    ],
    steps: [
      "Cut tomatoes into wedges",
      "Beat eggs with a pinch of salt",
      "Heat oil in wok, scramble eggs until 70% done, remove",
      "In same wok, stir-fry tomatoes until slightly softened",
      "Return eggs, add salt to taste",
      "Stir-fry briefly to combine",
      "Garnish with chopped green onion and serve"
    ]
  },
  {
    id: 5,
    name: "Sichuan Boiled Fish",
    difficulty: "Hard",
    time: "60 minutes",
    imageUrl: sichuanFish,
    ingredients: [
      {
        name: "Fish Fillets",
        amount: "400g",
        nutrition: { calories: 240, protein: "35g" },
        purchase: {
          locations: [
            {
              name: "Fresh Seafood Market",
              distance: "1.8km",
              price: 24.90,
              address: "890 Seafood Street, #01-78",
              openTime: "6:00 AM - 4:00 PM"
            }
          ],
          tips: "Choose fresh white fish fillets like cod or sea bass",
          bestTime: "Early morning for freshest catch"
        }
      },
      {
        name: "Sichuan Peppercorns",
        amount: "2 tablespoons",
        nutrition: { calories: 10, protein: "0g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 3.90,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose bright red peppercorns with strong aroma",
          bestTime: "Any time"
        }
      },
      {
        name: "Dried Chili Peppers",
        amount: "10-15 pieces",
        nutrition: { calories: 30, protein: "1g" },
        purchase: {
          locations: [
            {
              name: "Asian Grocery",
              distance: "1.5km",
              price: 2.90,
              address: "321 Food Street, #02-15",
              openTime: "9:00 AM - 9:00 PM"
            }
          ],
          tips: "Choose bright red chilies without dark spots",
          bestTime: "Any time"
        }
      },
      {
        name: "Bean Sprouts",
        amount: "200g",
        nutrition: { calories: 40, protein: "4g" },
        purchase: {
          locations: [
            {
              name: "Vegetable Market",
              distance: "0.5km",
              price: 1.90,
              address: "567 Fresh Market, #02-34",
              openTime: "6:00 AM - 8:00 PM"
            }
          ],
          tips: "Choose fresh, crisp sprouts with white stems",
          bestTime: "Morning for best freshness"
        }
      }
    ],
    steps: [
      "Slice fish fillets diagonally into thin pieces",
      "Marinate fish with salt and white pepper",
      "Prepare spicy broth with Sichuan peppercorns and chilies",
      "Blanch bean sprouts and arrange at bottom of serving bowl",
      "Bring broth to boil, add fish slices",
      "Cook until fish turns opaque",
      "Pour everything into serving bowl",
      "Top with hot oil and garnish"
    ]
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

export const menus = [
  {
    id: 1,
    name: "Traditional Chinese Feast",
    description: "Classic combination of meat and fish",
    dishes: [
      {
        id: 1,
        name: "Braised Pork Belly",
        imageUrl: braisedPorkBelly
      },
      {
        id: 2,
        name: "Steamed Sea Bass",
        imageUrl: steamedSeaBass
      }
    ]
  },
  {
    id: 2,
    name: "Home Style Comfort",
    description: "Simple and satisfying home cooking",
    dishes: [
      {
        id: 4,
        name: "Tomato & Egg Stir-fry",
        imageUrl: tomatoEgg
      },
      {
        id: 3,
        name: "Kung Pao Chicken",
        imageUrl: kungPaoChicken
      }
    ]
  },
  {
    id: 3,
    name: "Sichuan Special",
    description: "Bold and spicy flavors",
    dishes: [
      {
        id: 5,
        name: "Sichuan Boiled Fish",
        imageUrl: sichuanFish
      }
    ]
  }
]; 