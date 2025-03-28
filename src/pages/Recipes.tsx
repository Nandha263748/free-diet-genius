
import React from 'react';
import Layout from '@/components/layout/Layout';

const Recipes = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Healthy Recipes</h1>
        <p className="text-lg mb-6">
          Discover delicious and nutritious recipes that support your health goals.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600">Our recipe collection is coming soon! We're working on gathering delicious, healthy recipes for you to enjoy.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Recipes;
