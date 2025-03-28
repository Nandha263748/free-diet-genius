
import React from 'react';
import Layout from '@/components/layout/Layout';
import SavedMealPlans from '@/components/meals/SavedMealPlans';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MealPlans = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Meal Plans</h1>
          <Button onClick={() => navigate('/meal-planner')}>
            Create New Plan
          </Button>
        </div>

        <SavedMealPlans />
      </div>
    </Layout>
  );
};

export default MealPlans;
