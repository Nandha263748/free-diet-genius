
import React from 'react';
import Layout from '@/components/layout/Layout';

const NutritionDatabase = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Nutrition Database</h1>
        <p className="text-lg mb-6">
          Our comprehensive nutrition database provides detailed information about the nutritional content of thousands of foods.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600">Coming soon! We're currently building our nutrition database with detailed information.</p>
        </div>
      </div>
    </Layout>
  );
};

export default NutritionDatabase;
