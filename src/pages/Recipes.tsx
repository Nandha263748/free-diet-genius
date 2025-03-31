
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Flame } from 'lucide-react';

const recipeCategories = [
  {
    id: 1,
    title: 'High-Protein Meals',
    description: 'Perfect for building and maintaining muscle',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    count: '12 recipes'
  },
  {
    id: 2,
    title: 'Low-Carb Options',
    description: 'Great for weight management and glycemic control',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    count: '9 recipes'
  },
  {
    id: 3,
    title: 'Quick & Easy',
    description: 'Healthy meals ready in 30 minutes or less',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    count: '15 recipes'
  }
];

const featuredRecipes = [
  {
    id: 1,
    title: 'Mediterranean Bowl with Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    prepTime: '25 mins',
    servings: 2,
    calories: 450,
    tags: ['High-Protein', 'Mediterranean']
  },
  {
    id: 2,
    title: 'Avocado & Quinoa Protein Salad',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800',
    prepTime: '15 mins',
    servings: 1,
    calories: 380,
    tags: ['Vegetarian', 'Quick']
  },
  {
    id: 3,
    title: 'Baked Salmon with Roasted Vegetables',
    image: 'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=800',
    prepTime: '35 mins',
    servings: 4,
    calories: 520,
    tags: ['Seafood', 'Low-Carb']
  }
];

const Recipes = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Healthy Recipes</h1>
        <p className="text-lg mb-10 text-gray-600">
          Discover delicious and nutritious recipes that support your health goals.
        </p>
        
        {/* Recipe Categories */}
        <h2 className="text-2xl font-semibold mb-6">Recipe Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {recipeCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden group cursor-pointer">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                />
                <div className="absolute bottom-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1">
                  {category.count}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Recipes */}
        <h2 className="text-2xl font-semibold mb-6">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{recipe.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.prepTime}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings} servings
                  </div>
                  <div className="flex items-center">
                    <Flame className="h-4 w-4 mr-1" />
                    {recipe.calories} cal
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">More Recipes Coming Soon!</h3>
          <p className="text-gray-600">
            We're adding new healthy recipes every week. Check back soon for more delicious meal ideas!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Recipes;
