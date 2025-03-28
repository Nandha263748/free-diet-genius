
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/components/ui/sonner';

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions?: string;
  image?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  date: string;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface MealPlanContextType {
  currentPlan: MealPlan | null;
  savedPlans: MealPlan[];
  isLoading: boolean;
  generateMealPlan: (preferences: any) => Promise<void>;
  saveMealPlan: (plan: MealPlan) => void;
  deleteMealPlan: (planId: string) => void;
  updateMeal: (planId: string, mealId: string, updatedMeal: Partial<Meal>) => void;
  replaceMeal: (planId: string, mealId: string) => Promise<void>;
}

const MealPlanContext = createContext<MealPlanContextType | undefined>(undefined);

export const MealPlanProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<MealPlan | null>(null);
  const [savedPlans, setSavedPlans] = useState<MealPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved meal plans from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedPlansData = localStorage.getItem(`mealPlans_${user.id}`);
      if (savedPlansData) {
        setSavedPlans(JSON.parse(savedPlansData));
      }
    } else {
      setSavedPlans([]);
    }
  }, [user]);

  // Mock data for meals
  const breakfastOptions: Meal[] = [
    {
      id: 'b1',
      name: 'Avocado Toast with Poached Eggs',
      type: 'breakfast',
      calories: 350,
      protein: 15,
      carbs: 30,
      fat: 20,
      ingredients: ['2 slices whole grain bread', '1 avocado', '2 eggs', 'Salt', 'Pepper', 'Red chili flakes'],
      instructions: 'Toast bread, mash avocado and spread on toast, top with poached eggs',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
    },
    {
      id: 'b2',
      name: 'Greek Yogurt with Berries and Granola',
      type: 'breakfast',
      calories: 300,
      protein: 20,
      carbs: 40,
      fat: 5,
      ingredients: ['1 cup Greek yogurt', '1/2 cup mixed berries', '1/4 cup granola', '1 tbsp honey'],
      instructions: 'Mix all ingredients in a bowl',
      image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1547&q=80'
    },
    {
      id: 'b3',
      name: 'Spinach and Mushroom Omelette',
      type: 'breakfast',
      calories: 280,
      protein: 18,
      carbs: 5,
      fat: 22,
      ingredients: ['3 eggs', '1 cup spinach', '1/2 cup mushrooms', '1/4 cup cheese', 'Salt', 'Pepper'],
      instructions: 'Whisk eggs, cook with vegetables in a pan, fold and serve',
      image: 'https://images.unsplash.com/photo-1553886187-b3d3d9cb1f35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    }
  ];

  const lunchOptions: Meal[] = [
    {
      id: 'l1',
      name: 'Grilled Chicken Salad',
      type: 'lunch',
      calories: 400,
      protein: 35,
      carbs: 20,
      fat: 15,
      ingredients: ['6 oz grilled chicken breast', '2 cups mixed greens', '1/4 cup cherry tomatoes', '1/4 cucumber', '2 tbsp vinaigrette'],
      instructions: 'Combine all ingredients in a bowl, toss with dressing',
      image: 'https://images.unsplash.com/photo-1594834749675-9dc4a39b2a82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
    },
    {
      id: 'l2',
      name: 'Quinoa Buddha Bowl',
      type: 'lunch',
      calories: 450,
      protein: 15,
      carbs: 65,
      fat: 18,
      ingredients: ['1 cup cooked quinoa', '1/2 cup roasted chickpeas', '1/2 cup roasted sweet potato', '1/4 avocado', '2 tbsp tahini dressing'],
      instructions: 'Arrange all ingredients in a bowl, drizzle with dressing',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
    },
    {
      id: 'l3',
      name: 'Turkey and Avocado Wrap',
      type: 'lunch',
      calories: 420,
      protein: 30,
      carbs: 35,
      fat: 20,
      ingredients: ['1 whole wheat wrap', '4 oz turkey breast', '1/4 avocado', 'Lettuce', 'Tomato', '1 tbsp hummus'],
      instructions: 'Spread hummus on wrap, add all ingredients, roll up and serve',
      image: 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    }
  ];

  const dinnerOptions: Meal[] = [
    {
      id: 'd1',
      name: 'Baked Salmon with Asparagus',
      type: 'dinner',
      calories: 500,
      protein: 40,
      carbs: 15,
      fat: 30,
      ingredients: ['6 oz salmon fillet', '1 bunch asparagus', '1 tbsp olive oil', 'Lemon', 'Dill', 'Salt', 'Pepper'],
      instructions: 'Season salmon, bake at 400°F for 15 minutes with asparagus',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    },
    {
      id: 'd2',
      name: 'Vegetable Stir Fry with Tofu',
      type: 'dinner',
      calories: 380,
      protein: 20,
      carbs: 40,
      fat: 15,
      ingredients: ['6 oz firm tofu', '2 cups mixed vegetables', '1 tbsp soy sauce', '1 tbsp sesame oil', '1 tsp ginger', '1 clove garlic'],
      instructions: 'Stir fry tofu and vegetables with sauce ingredients',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80'
    },
    {
      id: 'd3',
      name: 'Turkey Meatballs with Zucchini Noodles',
      type: 'dinner',
      calories: 450,
      protein: 35,
      carbs: 20,
      fat: 25,
      ingredients: ['4 oz ground turkey', '1 egg', '1/4 cup breadcrumbs', '2 zucchinis spiralized', '1/2 cup marinara sauce'],
      instructions: 'Form meatballs, bake at 375°F for 20 minutes, serve with zucchini noodles and sauce',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1886&q=80'
    }
  ];

  const snackOptions: Meal[] = [
    {
      id: 's1',
      name: 'Apple with Almond Butter',
      type: 'snack',
      calories: 200,
      protein: 5,
      carbs: 25,
      fat: 10,
      ingredients: ['1 apple', '1 tbsp almond butter'],
      instructions: 'Slice apple and serve with almond butter',
      image: 'https://images.unsplash.com/photo-1535912259-d6b90158fdd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    },
    {
      id: 's2',
      name: 'Hummus with Vegetable Sticks',
      type: 'snack',
      calories: 150,
      protein: 5,
      carbs: 15,
      fat: 8,
      ingredients: ['1/4 cup hummus', 'Carrot sticks', 'Cucumber sticks', 'Bell pepper strips'],
      instructions: 'Serve hummus with vegetable sticks',
      image: 'https://images.unsplash.com/photo-1564149504298-00f45c77d3e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
    },
    {
      id: 's3',
      name: 'Greek Yogurt with Honey',
      type: 'snack',
      calories: 120,
      protein: 15,
      carbs: 10,
      fat: 0,
      ingredients: ['1 cup Greek yogurt', '1 tsp honey'],
      instructions: 'Mix yogurt with honey',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
    }
  ];

  // Function to generate a random meal plan (simulating AI recommendation)
  const generateMealPlan = async (preferences: any) => {
    if (!user) {
      toast.error("Please log in to generate a meal plan");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Randomly select meals based on preferences (in a real app, this would be AI-generated)
      const randomBreakfast = breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
      const randomLunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
      const randomDinner = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
      const randomSnack = snackOptions[Math.floor(Math.random() * snackOptions.length)];

      const meals = [randomBreakfast, randomLunch, randomDinner, randomSnack];
      
      // Calculate total nutrition values
      const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
      const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
      const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
      const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

      // Create new meal plan
      const newPlan: MealPlan = {
        id: Date.now().toString(),
        name: `Meal Plan for ${new Date().toLocaleDateString()}`,
        date: new Date().toISOString(),
        meals,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat
      };

      setCurrentPlan(newPlan);
      toast.success("Meal plan generated successfully!");
    } catch (error) {
      toast.error("Failed to generate meal plan");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMealPlan = (plan: MealPlan) => {
    if (!user) {
      toast.error("Please log in to save a meal plan");
      return;
    }

    // Check if plan already exists
    const existingPlanIndex = savedPlans.findIndex(p => p.id === plan.id);

    let updatedPlans: MealPlan[];
    if (existingPlanIndex >= 0) {
      // Update existing plan
      updatedPlans = [...savedPlans];
      updatedPlans[existingPlanIndex] = plan;
    } else {
      // Add new plan
      updatedPlans = [...savedPlans, plan];
    }

    setSavedPlans(updatedPlans);
    localStorage.setItem(`mealPlans_${user.id}`, JSON.stringify(updatedPlans));
    toast.success("Meal plan saved successfully!");
  };

  const deleteMealPlan = (planId: string) => {
    if (!user) {
      return;
    }

    const updatedPlans = savedPlans.filter(plan => plan.id !== planId);
    setSavedPlans(updatedPlans);
    localStorage.setItem(`mealPlans_${user.id}`, JSON.stringify(updatedPlans));
    toast.success("Meal plan deleted successfully!");
  };

  const updateMeal = (planId: string, mealId: string, updatedMeal: Partial<Meal>) => {
    // Update in current plan if it matches
    if (currentPlan && currentPlan.id === planId) {
      const updatedMeals = currentPlan.meals.map(meal => 
        meal.id === mealId ? { ...meal, ...updatedMeal } : meal
      );
      
      // Recalculate nutrition totals
      const totalCalories = updatedMeals.reduce((sum, meal) => sum + meal.calories, 0);
      const totalProtein = updatedMeals.reduce((sum, meal) => sum + meal.protein, 0);
      const totalCarbs = updatedMeals.reduce((sum, meal) => sum + meal.carbs, 0);
      const totalFat = updatedMeals.reduce((sum, meal) => sum + meal.fat, 0);
      
      const updatedPlan = {
        ...currentPlan,
        meals: updatedMeals,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat
      };
      
      setCurrentPlan(updatedPlan);
      
      // If this plan is also saved, update it in savedPlans
      const savedPlanIndex = savedPlans.findIndex(plan => plan.id === planId);
      if (savedPlanIndex >= 0) {
        const updatedSavedPlans = [...savedPlans];
        updatedSavedPlans[savedPlanIndex] = updatedPlan;
        setSavedPlans(updatedSavedPlans);
        localStorage.setItem(`mealPlans_${user?.id}`, JSON.stringify(updatedSavedPlans));
      }
    } else {
      // Update in saved plans
      const savedPlanIndex = savedPlans.findIndex(plan => plan.id === planId);
      if (savedPlanIndex >= 0) {
        const planToUpdate = savedPlans[savedPlanIndex];
        const updatedMeals = planToUpdate.meals.map(meal => 
          meal.id === mealId ? { ...meal, ...updatedMeal } : meal
        );
        
        // Recalculate nutrition totals
        const totalCalories = updatedMeals.reduce((sum, meal) => sum + meal.calories, 0);
        const totalProtein = updatedMeals.reduce((sum, meal) => sum + meal.protein, 0);
        const totalCarbs = updatedMeals.reduce((sum, meal) => sum + meal.carbs, 0);
        const totalFat = updatedMeals.reduce((sum, meal) => sum + meal.fat, 0);
        
        const updatedPlan = {
          ...planToUpdate,
          meals: updatedMeals,
          totalCalories,
          totalProtein,
          totalCarbs,
          totalFat
        };
        
        const updatedSavedPlans = [...savedPlans];
        updatedSavedPlans[savedPlanIndex] = updatedPlan;
        setSavedPlans(updatedSavedPlans);
        localStorage.setItem(`mealPlans_${user?.id}`, JSON.stringify(updatedSavedPlans));
      }
    }
    
    toast.success("Meal updated successfully!");
  };

  const replaceMeal = async (planId: string, mealId: string) => {
    setIsLoading(true);
    
    try {
      // Find the plan to update
      let planToUpdate: MealPlan | null = null;
      
      if (currentPlan && currentPlan.id === planId) {
        planToUpdate = currentPlan;
      } else {
        const savedPlanIndex = savedPlans.findIndex(plan => plan.id === planId);
        if (savedPlanIndex >= 0) {
          planToUpdate = savedPlans[savedPlanIndex];
        }
      }
      
      if (!planToUpdate) {
        throw new Error("Meal plan not found");
      }
      
      // Find the meal to replace
      const mealToReplace = planToUpdate.meals.find(meal => meal.id === mealId);
      if (!mealToReplace) {
        throw new Error("Meal not found");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get a random replacement of the same type
      let replacement: Meal;
      switch (mealToReplace.type) {
        case 'breakfast':
          replacement = breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
          break;
        case 'lunch':
          replacement = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
          break;
        case 'dinner':
          replacement = dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)];
          break;
        case 'snack':
          replacement = snackOptions[Math.floor(Math.random() * snackOptions.length)];
          break;
        default:
          throw new Error("Invalid meal type");
      }
      
      // Ensure we don't get the same meal again
      if (replacement.id === mealId) {
        const options = 
          mealToReplace.type === 'breakfast' ? breakfastOptions :
          mealToReplace.type === 'lunch' ? lunchOptions :
          mealToReplace.type === 'dinner' ? dinnerOptions : snackOptions;
          
        const filteredOptions = options.filter(option => option.id !== mealId);
        if (filteredOptions.length > 0) {
          replacement = filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
        }
      }
      
      // Update the meal
      updateMeal(planId, mealId, replacement);
      toast.success("Meal replaced successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to replace meal");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MealPlanContext.Provider value={{
      currentPlan,
      savedPlans,
      isLoading,
      generateMealPlan,
      saveMealPlan,
      deleteMealPlan,
      updateMeal,
      replaceMeal,
    }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlan = () => {
  const context = useContext(MealPlanContext);
  if (context === undefined) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
};
