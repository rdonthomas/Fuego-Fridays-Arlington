/**
 * Mock meal data for the weekly meal prep generator.
 * All meals are quick (≤30 min), healthy, and easy to batch-prep.
 */

export type MealCategory = "breakfast" | "lunch" | "dinner" | "snack";
export type DietTag =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "high-protein"
  | "dairy-free"
  | "low-carb";

export interface Meal {
  id: string;
  name: string;
  category: MealCategory;
  prepMinutes: number;
  calories: number;
  protein: number; // grams
  carbs: number;   // grams
  fat: number;     // grams
  tags: DietTag[];
  ingredients: string[];
  tip: string; // quick prep tip or batch note
  emoji: string;
}

export const meals: Meal[] = [
  // ─── BREAKFAST ──────────────────────────────────────────────────────────────
  {
    id: "b-1",
    name: "Overnight Oats",
    category: "breakfast",
    prepMinutes: 5,
    calories: 350,
    protein: 12,
    carbs: 55,
    fat: 8,
    tags: ["vegetarian", "high-protein"],
    ingredients: ["rolled oats", "Greek yogurt", "chia seeds", "almond milk", "honey", "berries"],
    tip: "Make 5 jars Sunday night — grab one each morning.",
    emoji: "🥣",
  },
  {
    id: "b-2",
    name: "Egg & Veggie Muffins",
    category: "breakfast",
    prepMinutes: 25,
    calories: 280,
    protein: 18,
    carbs: 8,
    fat: 14,
    tags: ["vegetarian", "gluten-free", "high-protein", "low-carb"],
    ingredients: ["eggs", "spinach", "bell pepper", "onion", "feta cheese", "olive oil"],
    tip: "Bake a 12-muffin batch; keeps 4 days in the fridge.",
    emoji: "🧁",
  },
  {
    id: "b-3",
    name: "Greek Yogurt Parfait",
    category: "breakfast",
    prepMinutes: 5,
    calories: 310,
    protein: 20,
    carbs: 42,
    fat: 5,
    tags: ["vegetarian", "gluten-free", "high-protein"],
    ingredients: ["Greek yogurt", "granola", "mixed berries", "honey", "flaxseed"],
    tip: "Layer in mason jars; add granola morning-of to keep it crunchy.",
    emoji: "🫙",
  },
  {
    id: "b-4",
    name: "Avocado Toast with Egg",
    category: "breakfast",
    prepMinutes: 10,
    calories: 380,
    protein: 16,
    carbs: 32,
    fat: 22,
    tags: ["vegetarian", "high-protein"],
    ingredients: ["whole-grain bread", "avocado", "eggs", "cherry tomatoes", "red pepper flakes", "lemon"],
    tip: "Hard-boil a week's worth of eggs in one go.",
    emoji: "🥑",
  },
  {
    id: "b-5",
    name: "Banana Protein Smoothie",
    category: "breakfast",
    prepMinutes: 5,
    calories: 320,
    protein: 25,
    carbs: 40,
    fat: 6,
    tags: ["vegetarian", "gluten-free", "high-protein", "dairy-free"],
    ingredients: ["banana", "protein powder", "almond milk", "peanut butter", "spinach", "ice"],
    tip: "Pre-portion dry ingredients into zip bags for grab-and-blend mornings.",
    emoji: "🥤",
  },

  // ─── LUNCH ──────────────────────────────────────────────────────────────────
  {
    id: "l-1",
    name: "Chicken & Quinoa Bowl",
    category: "lunch",
    prepMinutes: 25,
    calories: 480,
    protein: 42,
    carbs: 45,
    fat: 12,
    tags: ["gluten-free", "high-protein", "dairy-free"],
    ingredients: ["chicken breast", "quinoa", "cucumber", "cherry tomatoes", "red onion", "lemon", "olive oil", "parsley"],
    tip: "Cook a big batch of quinoa — it reheats perfectly all week.",
    emoji: "🥗",
  },
  {
    id: "l-2",
    name: "Mason Jar Salad",
    category: "lunch",
    prepMinutes: 15,
    calories: 380,
    protein: 14,
    carbs: 28,
    fat: 22,
    tags: ["vegetarian", "gluten-free", "dairy-free"],
    ingredients: ["mixed greens", "chickpeas", "roasted red pepper", "cucumber", "olives", "tahini dressing"],
    tip: "Layer dressing at the bottom — greens on top. Shake when ready.",
    emoji: "🫙",
  },
  {
    id: "l-3",
    name: "Turkey & Hummus Wrap",
    category: "lunch",
    prepMinutes: 10,
    calories: 420,
    protein: 32,
    carbs: 38,
    fat: 14,
    tags: ["high-protein", "dairy-free"],
    ingredients: ["whole-wheat tortilla", "turkey slices", "hummus", "spinach", "cucumber", "sun-dried tomatoes"],
    tip: "Wrap tightly in foil — stays fresh in the fridge for 2 days.",
    emoji: "🌯",
  },
  {
    id: "l-4",
    name: "Lentil Soup",
    category: "lunch",
    prepMinutes: 30,
    calories: 340,
    protein: 18,
    carbs: 52,
    fat: 6,
    tags: ["vegan", "gluten-free", "high-protein", "dairy-free"],
    ingredients: ["red lentils", "tomatoes", "spinach", "cumin", "turmeric", "garlic", "vegetable broth"],
    tip: "Makes 4–5 portions. Freezes beautifully for future weeks.",
    emoji: "🍲",
  },
  {
    id: "l-5",
    name: "Tuna Stuffed Peppers",
    category: "lunch",
    prepMinutes: 15,
    calories: 310,
    protein: 34,
    carbs: 14,
    fat: 12,
    tags: ["gluten-free", "high-protein", "low-carb", "dairy-free"],
    ingredients: ["bell peppers", "canned tuna", "Greek yogurt", "celery", "capers", "lemon", "dill"],
    tip: "No heating required — great for desk lunches.",
    emoji: "🫑",
  },

  // ─── DINNER ─────────────────────────────────────────────────────────────────
  {
    id: "d-1",
    name: "Sheet Pan Salmon & Veggies",
    category: "dinner",
    prepMinutes: 25,
    calories: 520,
    protein: 44,
    carbs: 22,
    fat: 28,
    tags: ["gluten-free", "high-protein", "dairy-free", "low-carb"],
    ingredients: ["salmon fillet", "broccoli", "zucchini", "cherry tomatoes", "garlic", "lemon", "olive oil", "paprika"],
    tip: "One pan, 20 min at 425°F. Prep veggies the night before.",
    emoji: "🐟",
  },
  {
    id: "d-2",
    name: "Black Bean Tacos",
    category: "dinner",
    prepMinutes: 20,
    calories: 440,
    protein: 18,
    carbs: 62,
    fat: 14,
    tags: ["vegan", "gluten-free", "dairy-free"],
    ingredients: ["black beans", "corn tortillas", "avocado", "salsa", "cabbage", "lime", "cumin", "chili powder"],
    tip: "Season a big can of beans — works for tacos, bowls, or wraps.",
    emoji: "🌮",
  },
  {
    id: "d-3",
    name: "Stir-Fry Tofu & Brown Rice",
    category: "dinner",
    prepMinutes: 25,
    calories: 460,
    protein: 22,
    carbs: 58,
    fat: 16,
    tags: ["vegan", "dairy-free", "high-protein"],
    ingredients: ["firm tofu", "brown rice", "snap peas", "carrots", "edamame", "soy sauce", "sesame oil", "ginger", "garlic"],
    tip: "Press tofu the night before for a better sear.",
    emoji: "🥡",
  },
  {
    id: "d-4",
    name: "Chicken Tikka Masala (Light)",
    category: "dinner",
    prepMinutes: 30,
    calories: 490,
    protein: 40,
    carbs: 30,
    fat: 18,
    tags: ["gluten-free", "high-protein"],
    ingredients: ["chicken breast", "coconut milk", "crushed tomatoes", "onion", "garlic", "ginger", "garam masala", "cumin"],
    tip: "Batch-cook the sauce; keeps 5 days and tastes better each day.",
    emoji: "🍛",
  },
  {
    id: "d-5",
    name: "Zucchini Noodles with Pesto Shrimp",
    category: "dinner",
    prepMinutes: 20,
    calories: 390,
    protein: 36,
    carbs: 12,
    fat: 22,
    tags: ["gluten-free", "high-protein", "low-carb"],
    ingredients: ["zucchini", "shrimp", "basil pesto", "cherry tomatoes", "garlic", "parmesan", "pine nuts"],
    tip: "Spiralize zucchini up to 2 days ahead; pat dry before cooking.",
    emoji: "🍝",
  },
  {
    id: "d-6",
    name: "Turkey Meatball Bowl",
    category: "dinner",
    prepMinutes: 30,
    calories: 510,
    protein: 44,
    carbs: 40,
    fat: 16,
    tags: ["high-protein", "dairy-free"],
    ingredients: ["ground turkey", "cauliflower rice", "marinara", "spinach", "garlic", "Italian seasoning", "egg"],
    tip: "Bake 20 meatballs at once; freeze half for week 2.",
    emoji: "🍝",
  },

  // ─── SNACK ──────────────────────────────────────────────────────────────────
  {
    id: "s-1",
    name: "Apple & Almond Butter",
    category: "snack",
    prepMinutes: 2,
    calories: 200,
    protein: 5,
    carbs: 28,
    fat: 10,
    tags: ["vegan", "gluten-free", "dairy-free"],
    ingredients: ["apple", "almond butter"],
    tip: "Slice the apple at home and pack the nut butter in a small jar.",
    emoji: "🍎",
  },
  {
    id: "s-2",
    name: "Edamame with Sea Salt",
    category: "snack",
    prepMinutes: 5,
    calories: 150,
    protein: 12,
    carbs: 12,
    fat: 5,
    tags: ["vegan", "gluten-free", "dairy-free", "high-protein"],
    ingredients: ["frozen edamame", "sea salt"],
    tip: "Microwave from frozen in 3 minutes. Pack in snack bags for the week.",
    emoji: "🫘",
  },
  {
    id: "s-3",
    name: "Hummus & Veggie Sticks",
    category: "snack",
    prepMinutes: 5,
    calories: 180,
    protein: 7,
    carbs: 20,
    fat: 9,
    tags: ["vegan", "gluten-free", "dairy-free"],
    ingredients: ["hummus", "carrots", "celery", "cucumber", "bell pepper"],
    tip: "Prep 5 snack containers at once — fridge ready for the week.",
    emoji: "🥕",
  },
];

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
export type Weekday = (typeof DAYS)[number];

export type MealPlan = Record<Weekday, {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
}>;

/** Pick a random item from an array. */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Generate a full 5-day meal plan from the meal library. */
export function generateMealPlan(): MealPlan {
  const breakfasts = meals.filter((m) => m.category === "breakfast");
  const lunches = meals.filter((m) => m.category === "lunch");
  const dinners = meals.filter((m) => m.category === "dinner");
  const snacks = meals.filter((m) => m.category === "snack");

  return Object.fromEntries(
    DAYS.map((day) => [
      day,
      {
        breakfast: pick(breakfasts),
        lunch: pick(lunches),
        dinner: pick(dinners),
        snack: pick(snacks),
      },
    ])
  ) as MealPlan;
}

/** Swap one specific meal slot for a different random meal of the same category. */
export function swapMeal(
  plan: MealPlan,
  day: Weekday,
  slot: "breakfast" | "lunch" | "dinner" | "snack",
  currentId: string
): MealPlan {
  const pool = meals.filter((m) => m.category === slot && m.id !== currentId);
  const next = pick(pool);
  return {
    ...plan,
    [day]: { ...plan[day], [slot]: next },
  };
}
