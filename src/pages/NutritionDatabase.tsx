
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Apple, Carrot, Beef, Egg, Fish, Milk } from 'lucide-react';

const foodCategories = [
  { icon: <Apple className="h-6 w-6" />, name: 'Fruits', count: 87 },
  { icon: <Carrot className="h-6 w-6" />, name: 'Vegetables', count: 104 },
  { icon: <Beef className="h-6 w-6" />, name: 'Meats', count: 65 },
  { icon: <Egg className="h-6 w-6" />, name: 'Proteins', count: 42 },
  { icon: <Fish className="h-6 w-6" />, name: 'Seafood', count: 53 },
  { icon: <Milk className="h-6 w-6" />, name: 'Dairy', count: 38 }
];

const NutritionDatabase = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Nutrition Database</h1>
        <p className="text-lg mb-6 text-gray-600">
          Our comprehensive nutrition database provides detailed information about the nutritional content of thousands of foods.
        </p>
        
        {/* Search & Filter Section */}
        <div className="bg-gray-50 rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search foods (coming soon)" 
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-gray-300 text-gray-500 w-full" disabled>
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
              <button className="bg-primary text-white px-6 py-3 rounded-md w-full" disabled>
                Search
              </button>
            </div>
          </div>
        </div>
        
        {/* Food Categories */}
        <h2 className="text-2xl font-semibold mb-6">Food Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {foodCategories.map((category, index) => (
            <Card key={index} className="text-center cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6">
                <div className="mx-auto mb-3 text-primary">
                  {category.icon}
                </div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Nutrition Data Preview */}
        <h2 className="text-2xl font-semibold mb-6">Database Preview</h2>
        <div className="border rounded-lg overflow-hidden mb-10">
          <div className="grid grid-cols-12 bg-gray-100 p-4 border-b">
            <div className="col-span-4 font-semibold">Food Item</div>
            <div className="col-span-2 font-semibold text-center">Calories</div>
            <div className="col-span-2 font-semibold text-center">Protein</div>
            <div className="col-span-2 font-semibold text-center">Carbs</div>
            <div className="col-span-2 font-semibold text-center">Fats</div>
          </div>
          
          {/* Skeleton loading placeholders */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="grid grid-cols-12 p-4 border-b">
              <div className="col-span-4 flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Database Coming Soon!</h3>
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
