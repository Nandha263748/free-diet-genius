
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MealPlanGenerator from '@/components/meals/MealPlanGenerator';
import MealPlanDisplay from '@/components/meals/MealPlanDisplay';
import { useMealPlan } from '@/contexts/MealPlanContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MealPlanner = () => {
  const { currentPlan } = useMealPlan();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showGenerator, setShowGenerator] = useState(true);

  // If user has a current plan, show the plan display by default
  React.useEffect(() => {
    if (currentPlan) {
      setShowGenerator(false);
    }
  }, [currentPlan]);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Meal Planner</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create personalized meal plans based on your preferences and dietary needs.
            Our AI will generate a balanced plan that fits your goals.
          </p>
        </div>

        {!isAuthenticated ? (
          <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold mb-2">Create a free account to get started</h2>
            <p className="mb-4 text-muted-foreground">
              Sign up to generate personalized meal plans, save your preferences, 
              and track your nutrition goals - all completely free!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button variant="secondary" onClick={() => navigate('/register')}>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            {currentPlan && (
              <div className="flex justify-between items-center mb-6">
                <Button
                  variant={showGenerator ? "default" : "outline"}
                  onClick={() => setShowGenerator(true)}
                >
                  Plan Generator
                </Button>
                <Button
                  variant={!showGenerator ? "default" : "outline"}
                  onClick={() => setShowGenerator(false)}
                >
                  Current Plan
                </Button>
              </div>
            )}

            {showGenerator ? (
              <MealPlanGenerator />
            ) : currentPlan ? (
              <MealPlanDisplay mealPlan={currentPlan} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No meal plan generated yet. Create your first plan!
                </p>
                <Button onClick={() => setShowGenerator(true)}>
                  Generate Meal Plan
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default MealPlanner;
