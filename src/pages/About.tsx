
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Coffee, Heart, Zap, Nutrition, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About DietGenius</h1>
          <p className="text-lg text-muted-foreground">
            We're on a mission to make personalized nutrition accessible to everyone,
            completely free of charge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              DietGenius was created with a simple but powerful vision: to make high-quality, 
              personalized nutrition guidance accessible to everyone, not just those who can afford premium subscriptions.
            </p>
            <p className="text-muted-foreground mb-4">
              Many diet planning services lock their best features behind expensive paywalls, 
              making it difficult for people to access the tools they need to improve their health.
              We believe that good nutrition shouldn't be a luxury.
            </p>
            <p className="text-muted-foreground">
              By combining cutting-edge AI technology with nutritional science, 
              we've created a platform that offers the same premium features as paid services, 
              but completely free for everyone.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden h-64 md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800" 
              alt="Fresh food" 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary-foreground p-3 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-4">
                  <Heart className="w-6 h-6" />
                </div>
                <CardTitle>Health For All</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  We believe everyone deserves access to tools that help them live healthier lives, 
                  regardless of their financial situation.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary-foreground p-3 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  We're constantly improving our AI algorithms and nutritional database to 
                  provide the most accurate and helpful meal plans possible.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary-foreground p-3 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-4">
                  <User className="w-6 h-6" />
                </div>
                <CardTitle>Personalization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  We understand that everyone's nutritional needs are different, so we create 
                  highly personalized meal plans tailored to your specific goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex">
              <div className="mr-4 bg-primary-foreground p-2 rounded-full h-10 w-10 flex items-center justify-center text-primary shrink-0">
                <Nutrition className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">AI-Generated Meal Plans</h3>
                <p className="text-muted-foreground">
                  Our advanced AI creates personalized meal plans based on your dietary preferences, 
                  restrictions, and nutritional goals.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-primary-foreground p-2 rounded-full h-10 w-10 flex items-center justify-center text-primary shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Nutrition Tracking</h3>
                <p className="text-muted-foreground">
                  Detailed breakdown of calories, macronutrients, and health benefits for every meal in your plan.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-primary-foreground p-2 rounded-full h-10 w-10 flex items-center justify-center text-primary shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Meal Customization</h3>
                <p className="text-muted-foreground">
                  Don't like a suggested meal? Easily swap it for alternatives that still meet your nutritional needs.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="mr-4 bg-primary-foreground p-2 rounded-full h-10 w-10 flex items-center justify-center text-primary shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">BMI & Health Tracking</h3>
                <p className="text-muted-foreground">
                  Calculate your Body Mass Index and track your health metrics to adjust your diet plans accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="gradient-bg rounded-lg p-8 md:p-12 mt-16 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Health Journey?</h2>
          <p className="text-lg mb-6">
            Experience the power of AI-driven meal planning, completely free.
          </p>
          <Button 
            className="bg-white text-primary hover:bg-gray-100"
            size="lg"
            onClick={() => navigate('/meal-planner')}
          >
            Start Planning Now
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default About;
