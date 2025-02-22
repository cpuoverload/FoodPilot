export interface Nutrition {
  calories: number;
  protein: string;
  fat?: string;
  carbs?: string;
  vitamins?: string[];
}

export interface Dish {
  id: number;
  name: string;
  price: number;
  spicyLevel: string;
  nutrition: Nutrition;
  description?: string;
  imageUrl: string;
  restaurant: {
    id: number;
    name: string;
    cuisine: string;
    priceRange: string;
  };
  tags: string[];
  rating: number;
  reviews: number;
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  priceRange: string;
  imageUrl: string;
  dishes: Dish[];
}

export interface Ingredient {
  name: string;
  amount: string;
  nutrition: Nutrition;
  purchase: {
    locations: {
      name: string;
      distance: string;
      price: number;
      address: string;
      openTime: string;
    }[];
    tips: string;
    bestTime?: string;
  };
}

export interface Recipe {
  id: number;
  name: string;
  difficulty: string;
  time: string;
  imageUrl: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface UserPreferences {
  spicy: boolean;
  price: 'low' | 'medium' | 'high';
  healthy: boolean;
} 