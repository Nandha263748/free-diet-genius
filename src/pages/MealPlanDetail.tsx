
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MealPlanDisplay from '@/components/meals/MealPlanDisplay';
import { useMealPlan, MealPlan } from '@/contexts/MealPlanContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';

const MealPlanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { savedPlans } = useMealPlan();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id && savedPlans.length > 0) {
      const plan = savedPlans.find(plan => plan.id === id);
      if (plan) {
        setMealPlan(plan);
      } else {
        navigate('/meal-plans');
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, savedPlans, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate('/meal-plans')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Meal Plans
        </Button>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : mealPlan ? (
          <MealPlanDisplay mealPlan={mealPlan} showActions={false} />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Meal plan not found.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MealPlanDetail;
