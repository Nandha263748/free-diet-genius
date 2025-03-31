
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Apple, Carrot, Beef, Egg, Fish, Milk, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const foodCategories = [
  { icon: <Apple className="h-6 w-6" />, name: 'Fruits', count: 87 },
  { icon: <Carrot className="h-6 w-6" />, name: 'Vegetables', count: 104 },
  { icon: <Beef className="h-6 w-6" />, name: 'Meats', count: 65 },
  { icon: <Egg className="h-6 w-6" />, name: 'Proteins', count: 42 },
  { icon: <Fish className="h-6 w-6" />, name: 'Seafood', count: 53 },
  { icon: <Milk className="h-6 w-6" />, name: 'Dairy', count: 38 }
];

// Sample food data for demonstration
const sampleFoods = [
  { 
    name: 'Banana', 
    calories: 105, 
    protein: 1.3, 
    carbs: 27, 
    fats: 0.4,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800'
  },
  { 
    name: 'Spinach', 
    calories: 23, 
    protein: 2.9, 
    carbs: 3.6, 
    fats: 0.4,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800'
  },
  { 
    name: 'Salmon', 
    calories: 208, 
    protein: 20, 
    carbs: 0, 
    fats: 13,
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800'
  },
  { 
    name: 'Greek Yogurt', 
    calories: 100, 
    protein: 10, 
    carbs: 4, 
    fats: 3,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800'
  },
  { 
    name: 'Chicken Breast', 
    calories: 165, 
    protein: 31, 
    carbs: 0, 
    fats: 3.6,
    category: 'Meats',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800'
  }
];

const NutritionDatabase = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Toggle category selection
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };
  
  // Filter foods based on search and selected category
  const filteredFoods = sampleFoods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? food.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">Nutrition Database</h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Our comprehensive nutrition database provides detailed information about the nutritional content of thousands of foods. Use it to make informed dietary choices and support your health goals.
            </p>
          </div>
          <Badge variant="outline" className="px-4 py-2 text-base bg-primary/10">
            Beta Feature
          </Badge>
        </div>
        
        {/* Search & Filter Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search foods by name" 
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-gray-300 text-gray-500 w-full">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <button className="bg-primary text-white px-6 py-3 rounded-md w-full">
                Search
              </button>
            </div>
          </div>
        </div>
        
        {/* Food Categories */}
        <h2 className="text-2xl font-semibold mb-6">Food Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {foodCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`text-center cursor-pointer transition-colors ${selectedCategory === category.name ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'}`}
              onClick={() => handleCategorySelect(category.name)}
            >
              <CardContent className="p-6">
                <div className={`mx-auto mb-3 ${selectedCategory === category.name ? 'text-primary' : ''}`}>
                  {category.icon}
                </div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Food Items Display */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Food Database</h2>
            {selectedCategory && (
              <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                Clear Filter
              </Button>
            )}
          </div>
          
          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFoods.map((food, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={food.image} 
                      alt={food.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle>{food.name}</CardTitle>
                      <Badge variant="outline" className="bg-primary/10">
                        {food.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Calories</p>
                        <p className="font-semibold">{food.calories}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="font-semibold">{food.protein}g</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Carbs</p>
                        <p className="font-semibold">{food.carbs}g</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500">Fats</p>
                        <p className="font-semibold">{food.fats}g</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Details <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600 mb-2">No matching foods found</p>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
        
        {/* Nutrition Facts Example */}
        <h2 className="text-2xl font-semibold mb-6">Sample Nutrition Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Nutrition Labels</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src="https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=800" 
                alt="Nutrition Label"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p className="text-gray-600 mb-4">
                Nutrition labels provide essential information about the nutritional content of packaged foods. They help you make informed food choices and compare products.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-semibold mb-2">Key Components:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Serving size and servings per container</li>
                  <li>Calories per serving</li>
                  <li>Macronutrients (proteins, carbs, fats)</li>
                  <li>Micronutrients (vitamins, minerals)</li>
                  <li>% Daily Values based on 2,000 calorie diet</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Macronutrient Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="h-32 w-20 bg-blue-400 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full text-center text-white font-semibold">Protein</div>
                    </div>
                    <div className="bg-gray-200 p-1 rounded-b-lg text-xs font-medium">20-35%</div>
                  </div>
                  <div className="text-center">
                    <div className="h-48 w-20 bg-yellow-400 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full text-center text-white font-semibold">Carbs</div>
                    </div>
                    <div className="bg-gray-200 p-1 rounded-b-lg text-xs font-medium">45-65%</div>
                  </div>
                  <div className="text-center">
                    <div className="h-24 w-20 bg-green-400 rounded-t-lg relative">
                      <div className="absolute bottom-0 w-full text-center text-white font-semibold">Fats</div>
                    </div>
                    <div className="bg-gray-200 p-1 rounded-b-lg text-xs font-medium">20-35%</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                A balanced diet typically includes the right proportion of macronutrients: proteins, carbohydrates, and fats. The ideal balance varies based on individual needs and goals.
              </p>
              <Separator className="my-4" />
              <div className="flex justify-between text-sm">
                <span className="text-blue-500 font-medium">Proteins: Build and repair tissues</span>
                <span className="text-yellow-500 font-medium">Carbs: Primary energy source</span>
                <span className="text-green-500 font-medium">Fats: Energy and cell function</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Full Database Coming Soon!</h3>
          <p className="text-gray-600 mb-4">
            We're currently compiling a comprehensive nutrition database with thousands of foods and detailed nutritional profiles.
          </p>
          <p className="text-gray-600">
            Check back soon to search, filter, and find detailed nutrition information for all your favorite foods.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NutritionDatabase;
