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
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  dishes: Dish[];
}

export interface Ingredient {
  name: string;
  amount: string;
  nutrition: Nutrition;
}

export interface Recipe {
  id: number;
  name: string;
  difficulty: string;
  time: string;
  ingredients: Ingredient[];
  steps: string[];
}

export interface UserPreferences {
  spicy: boolean;
  price: 'low' | 'medium' | 'high';
  healthy: boolean;
} 