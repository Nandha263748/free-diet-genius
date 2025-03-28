
import React from 'react';
import { MealPlan, useMealPlan } from '@/contexts/MealPlanContext';
import MealCard from './MealCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, FileText, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
  showActions?: boolean;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ mealPlan, showActions = true }) => {
  const { saveMealPlan, replaceMeal, isLoading } = useMealPlan();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSavePlan = () => {
    setIsSaving(true);
    try {
      saveMealPlan(mealPlan);
      setTimeout(() => {
        navigate('/meal-plans');
      }, 1000);
    } catch (error) {
      toast.error("Failed to save meal plan");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReplaceMeal = async (mealId: string) => {
    await replaceMeal(mealPlan.id, mealId);
  };

  // Group meals by type
  const breakfastMeals = mealPlan.meals.filter(meal => meal.type === 'breakfast');
  const lunchMeals = mealPlan.meals.filter(meal => meal.type === 'lunch');
  const dinnerMeals = mealPlan.meals.filter(meal => meal.type === 'dinner');
  const snackMeals = mealPlan.meals.filter(meal => meal.type === 'snack');

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{mealPlan.name}</CardTitle>
          <CardDescription>
            Created on {new Date(mealPlan.date).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="text-sm text-muted-foreground">Total Calories</p>
              <p className="text-2xl font-semibold">{mealPlan.totalCalories}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="text-sm text-muted-foreground">Protein</p>
              <p className="text-2xl font-semibold">{mealPlan.totalProtein}g</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="text-sm text-muted-foreground">Carbs</p>
              <p className="text-2xl font-semibold">{mealPlan.totalCarbs}g</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <p className="text-sm text-muted-foreground">Fat</p>
              <p className="text-2xl font-semibold">{mealPlan.totalFat}g</p>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <p className="text-sm font-medium">Macronutrient Breakdown</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Protein</span>
                <span className="text-xs font-medium">{Math.round((mealPlan.totalProtein * 4 / mealPlan.totalCalories) * 100)}%</span>
              </div>
              <Progress value={(mealPlan.totalProtein * 4 / mealPlan.totalCalories) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-blue-500" />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Carbs</span>
                <span className="text-xs font-medium">{Math.round((mealPlan.totalCarbs * 4 / mealPlan.totalCalories) * 100)}%</span>
              </div>
              <Progress value={(mealPlan.totalCarbs * 4 / mealPlan.totalCalories) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Fat</span>
                <span className="text-xs font-medium">{Math.round((mealPlan.totalFat * 9 / mealPlan.totalCalories) * 100)}%</span>
              </div>
              <Progress value={(mealPlan.totalFat * 9 / mealPlan.totalCalories) * 100} className="h-2 bg-gray-200" indicatorClassName="bg-yellow-500" />
            </div>
          </div>
        </CardContent>
        {showActions && (
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => window.print()}>
              <FileText className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleSavePlan} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Plan
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      {isLoading && (
        <div className="flex justify-center my-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {!isLoading && (
        <>
          {breakfastMeals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Breakfast</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breakfastMeals.map(meal => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onReplace={() => handleReplaceMeal(meal.id)}
                    canEdit={showActions}
                  />
                ))}
              </div>
            </div>
          )}

          {lunchMeals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Lunch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lunchMeals.map(meal => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onReplace={() => handleReplaceMeal(meal.id)}
                    canEdit={showActions}
                  />
                ))}
              </div>
            </div>
          )}

          {dinnerMeals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Dinner</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dinnerMeals.map(meal => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onReplace={() => handleReplaceMeal(meal.id)}
                    canEdit={showActions}
                  />
                ))}
              </div>
            </div>
          )}

          {snackMeals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Snacks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {snackMeals.map(meal => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onReplace={() => handleReplaceMeal(meal.id)}
                    canEdit={showActions}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MealPlanDisplay;
