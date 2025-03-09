export const DEFAULT_MEALS = {
  breakfast: {
    content: "Tomato and Egg Stir-fry",
    items: ['Fresh eggs', 'Tomatoes', 'Green onions', 'Rice'],
    calories: 320,
    nutrition: ['Protein: 16g', 'Carbs: 30g', 'Fat: 15g'],
    suggestions: 'Classic breakfast dish. Rich in protein and vitamin C.',
    photoUrl: '/src/assets/meal_logs/tomato-egg-stirfry.png'
  },
  lunch: {
    content: "Kung Pao Chicken",
    items: ['Diced chicken', 'Peanuts', 'Dried chilies', 'Bell peppers'],
    calories: 450,
    nutrition: ['Protein: 28g', 'Carbs: 35g', 'Fat: 22g'],
    suggestions: 'Good balance of protein and vegetables. Watch the spice level.',
    photoUrl: '/src/assets/meal_logs/kung-pao-chicken.png'
  },
  dinner: {
    content: "Steamed Sea Bass",
    items: ['Fresh sea bass', 'Ginger', 'Green onions', 'Soy sauce'],
    calories: 380,
    nutrition: ['Protein: 42g', 'Carbs: 8g', 'Fat: 16g'],
    suggestions: 'Excellent lean protein source. Rich in omega-3 fatty acids.',
    photoUrl: '/src/assets/meal_logs/steamed-sea-bass.png'
  },
  snack: {
    content: "Braised Pork Belly",
    items: ['Pork belly', 'Soy sauce', 'Rock sugar', 'Star anise'],
    calories: 520,
    nutrition: ['Protein: 22g', 'Carbs: 15g', 'Fat: 38g'],
    suggestions: 'Rich in flavor. Best enjoyed in moderation.',
    photoUrl: '/src/assets/meal_logs/braised-pork-belly.png'
  }
};

export type MealType = keyof typeof DEFAULT_MEALS; 