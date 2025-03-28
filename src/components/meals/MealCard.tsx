
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Info } from 'lucide-react';
import { Meal } from '@/contexts/MealPlanContext';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MealCardProps {
  meal: Meal;
  onReplace?: () => Promise<void>;
  canEdit?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onReplace, canEdit = true }) => {
  const navigate = useNavigate();

  return (
    <Card className="card-hover border border-gray-200">
      <CardHeader className="p-0">
        <div className="h-48 relative">
          <img
            src={meal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
            alt={meal.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <Badge className="absolute top-3 left-3 bg-primary">
            {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{meal.name}</CardTitle>
        <CardDescription className="text-sm mb-3">
          {meal.ingredients.slice(0, 3).join(', ')}
          {meal.ingredients.length > 3 && '...'}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-100 rounded">
            <p className="text-xs text-gray-500">Calories</p>
            <p className="font-medium">{meal.calories}</p>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded">
            <p className="text-xs text-gray-500">Protein</p>
            <p className="font-medium">{meal.protein}g</p>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded">
            <p className="text-xs text-gray-500">Carbs</p>
            <p className="font-medium">{meal.carbs}g</p>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded">
            <p className="text-xs text-gray-500">Fat</p>
            <p className="font-medium">{meal.fat}g</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4 mr-1" /> Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{meal.name}</DialogTitle>
              <DialogDescription>
                {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)} • {meal.calories} calories
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Ingredients:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {meal.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm">{ingredient}</li>
                  ))}
                </ul>
              </div>
              
              {meal.instructions && (
                <div>
                  <h4 className="font-medium mb-1">Instructions:</h4>
                  <p className="text-sm">{meal.instructions}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium mb-1">Nutrition Information:</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <p className="text-xs text-gray-500">Protein</p>
                    <p className="font-medium">{meal.protein}g</p>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <p className="text-xs text-gray-500">Carbs</p>
                    <p className="font-medium">{meal.carbs}g</p>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <p className="text-xs text-gray-500">Fat</p>
                    <p className="font-medium">{meal.fat}g</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {canEdit && onReplace && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReplace}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Replace
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MealCard;
