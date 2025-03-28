
import React from 'react';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SavedMealPlans = () => {
  const { savedPlans, deleteMealPlan } = useMealPlan();
  const navigate = useNavigate();

  if (savedPlans.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No saved meal plans yet</h3>
        <p className="text-muted-foreground mb-6">
          Generate your first meal plan to get started.
        </p>
        <Button onClick={() => navigate('/meal-planner')}>
          Create Meal Plan
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Saved Meal Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPlans.map((plan) => (
          <Card key={plan.id} className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <CardDescription>
                Created on {new Date(plan.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Calories:</span>
                  <span className="text-sm font-medium">{plan.totalCalories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Protein:</span>
                  <span className="text-sm font-medium">{plan.totalProtein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Carbs:</span>
                  <span className="text-sm font-medium">{plan.totalCarbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fat:</span>
                  <span className="text-sm font-medium">{plan.totalFat}g</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/meal-plans/${plan.id}`)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete this meal plan. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteMealPlan(plan.id)} className="bg-red-500 hover:bg-red-600">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedMealPlans;
