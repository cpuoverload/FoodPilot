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

export interface UserPreferences {
  spicy: boolean;
  price: 'low' | 'medium' | 'high';
  healthy: boolean;
} 