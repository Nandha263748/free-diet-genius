
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Check, Brain, Salad, Calculator } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: <Brain className="h-12 w-12 text-primary" />,
    title: 'AI-Generated Meal Plans',
    description: 'Get personalized meal plans created by our advanced AI based on your dietary preferences and goals.'
  },
  {
    icon: <Salad className="h-12 w-12 text-primary" />,
    title: 'Comprehensive Food Database',
    description: 'Access our extensive database of foods with detailed nutritional information.'
  },
  {
    icon: <Calculator className="h-12 w-12 text-primary" />,
    title: 'BMI & Health Tracking',
    description: 'Calculate your BMI, track your health metrics, and adjust your diet plan accordingly.'
  }
];

const benefits = [
  'AI-generated meal plans personalized to your needs',
  'Calorie and nutrition breakdown for each meal',
  'Ability to customize and swap meals',
  'BMI calculator and health tracking tools',
  'Save and manage multiple meal plans',
  'Mobile-friendly interface accessible anywhere',
  'No paid plans or premium restrictions - ALL features are FREE'
];

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-bg py-16 md:py-24">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Free AI-Powered<br />Diet Planner
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Create personalized meal plans, track your nutrition, and achieve your health goals with our 100% free AI diet assistant.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => navigate('/meal-planner')}
            >
              Start Planning Meals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/register')}
              >
                Create Free Account
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Share Your Preferences</h3>
              <p className="text-muted-foreground">Tell us about your dietary preferences, goals, and any restrictions.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Generate Your Plan</h3>
              <p className="text-muted-foreground">Our AI creates a personalized meal plan tailored to your needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Customize & Enjoy</h3>
              <p className="text-muted-foreground">Modify meals as needed, save your plan, and start enjoying healthier eating.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/meal-planner')}
            >
              Create Your Meal Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Everything You Need, 100% Free</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Unlike other meal planning services that restrict key features behind paywalls, 
                we provide all our premium features completely free of charge.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button 
                  onClick={() => isAuthenticated ? navigate('/meal-planner') : navigate('/register')}
                >
                  {isAuthenticated ? 'Start Planning' : 'Join For Free'}
                </Button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800" 
                alt="Healthy food" 
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-yellow-400 flex justify-center mb-4">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="italic mb-6">
                  "I've tried many diet planners, but this is the first one that's actually free AND useful. The AI recommendations are spot-on for my dietary needs."
                </p>
                <div>
                  <p className="font-semibold">Sarah K.</p>
                  <p className="text-sm text-muted-foreground">Lost 15 pounds in 3 months</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-yellow-400 flex justify-center mb-4">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="italic mb-6">
                  "The meal variety is amazing, and I love that I can swap out meals I don't like. Being able to see the nutrition breakdown helps me stay accountable."
                </p>
                <div>
                  <p className="font-semibold">Michael T.</p>
                  <p className="text-sm text-muted-foreground">Fitness enthusiast</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-yellow-400 flex justify-center mb-4">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <p className="italic mb-6">
                  "As someone with dietary restrictions, finding a planner that accommodates my needs without charging extra has been a game-changer for my health journey."
                </p>
                <div>
                  <p className="font-semibold">Jessica R.</p>
                  <p className="text-sm text-muted-foreground">Gluten-free diet</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Diet?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who are achieving their health goals with our free AI-powered diet planning tools.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => isAuthenticated ? navigate('/meal-planner') : navigate('/register')}
          >
            {isAuthenticated ? 'Create Your Meal Plan' : 'Get Started For Free'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
