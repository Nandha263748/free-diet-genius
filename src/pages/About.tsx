
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, Users, Utensils, Heart, BookOpen, Award } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">About DietGenius</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn more about our mission to make healthy eating accessible to everyone through AI-powered meal planning.
          </p>
        </div>

        <Tabs defaultValue="about" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">Our Story</TabsTrigger>
            <TabsTrigger value="how">How It Works</TabsTrigger>
            <TabsTrigger value="team">Our Team</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Making healthy eating accessible to everyone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  DietGenius was founded with a simple yet powerful mission: to make personalized nutrition accessible to everyone, regardless of their budget or nutrition expertise.
                </p>
                
                <p>
                  We believe that healthy eating shouldn't be complicated or expensive. By leveraging the power of artificial intelligence, we're able to create custom meal plans tailored to your specific needs, preferences, and goals - all for free.
                </p>
                
                <p>
                  Unlike other services that lock their best features behind expensive paywalls, DietGenius provides all its features completely free of charge. We're dedicated to democratizing nutrition knowledge and making it available to all.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Health For All</h3>
                    <p className="text-sm text-muted-foreground">
                      Our tools and plans are designed to support everyone's health journey.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Education First</h3>
                    <p className="text-sm text-muted-foreground">
                      We believe in teaching sustainable habits, not just providing meal plans.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Science-Backed</h3>
                    <p className="text-sm text-muted-foreground">
                      All our recommendations are based on nutritional science and research.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="how" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>How DietGenius Works</CardTitle>
                <CardDescription>
                  The science behind our AI-powered meal planning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  DietGenius uses advanced artificial intelligence to create personalized meal plans tailored to your specific needs and preferences. Here's how the process works:
                </p>
                
                <div className="space-y-6 mt-6">
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Personal Assessment</h3>
                      <p className="text-muted-foreground">
                        We start by collecting information about your height, weight, activity level, dietary preferences, allergies, and health goals.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Nutritional Analysis</h3>
                      <p className="text-muted-foreground">
                        Our AI calculates your optimal calorie intake and macronutrient distribution based on scientific formulas and nutritional guidelines.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Meal Planning</h3>
                      <p className="text-muted-foreground">
                        Using our extensive food database, the AI creates a balanced meal plan that meets your nutritional needs while accounting for your preferences.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Customization</h3>
                      <p className="text-muted-foreground">
                        You can customize your plan by swapping meals, adjusting portions, or excluding certain ingredients to make it perfect for you.
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Continuous Learning</h3>
                      <p className="text-muted-foreground">
                        Our system learns from your preferences and feedback to make future meal plans even better suited to your tastes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meet Our Team</CardTitle>
                <CardDescription>
                  The people behind DietGenius
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="rounded-full bg-primary/10 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Dr. Emily Chen</h3>
                    <p className="text-sm text-primary mb-2">Nutrition Scientist</p>
                    <p className="text-sm text-muted-foreground">
                      PhD in Nutritional Sciences with 10+ years of experience in personalized nutrition research.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-primary/10 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Michael Rodriguez</h3>
                    <p className="text-sm text-primary mb-2">AI Engineer</p>
                    <p className="text-sm text-muted-foreground">
                      Specializes in machine learning algorithms for nutritional recommendation systems.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-primary/10 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Chef Olivia Johnson</h3>
                    <p className="text-sm text-primary mb-2">Culinary Director</p>
                    <p className="text-sm text-muted-foreground">
                      Professional chef with expertise in creating delicious, nutritious recipes for diverse dietary needs.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-primary/10 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Dr. James Wilson</h3>
                    <p className="text-sm text-primary mb-2">Medical Advisor</p>
                    <p className="text-sm text-muted-foreground">
                      Board-certified physician specializing in preventive medicine and lifestyle interventions.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-primary/10 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">Sarah Patel</h3>
                    <p className="text-sm text-primary mb-2">User Experience Designer</p>
                    <p className="text-sm text-muted-foreground">
                      Creates intuitive interfaces that make nutrition planning accessible to everyone.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="rounded-full bg-primary/10 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                      <Utensils className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">David Kim</h3>
                    <p className="text-sm text-primary mb-2">Community Manager</p>
                    <p className="text-sm text-muted-foreground">
                      Fosters our supportive community and gathers user feedback to improve our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default About;
